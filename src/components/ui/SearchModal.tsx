'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { debounce } from '@/lib/utils';

interface SearchResult {
  id: number | string;
  title: string;
  excerpt: string;
  slug: string;
  type: 'post' | 'page';
  link: string;
}

const localIndex: SearchResult[] = [
  {
    id: 'local-1',
    title: 'How Zomato Built a Brand People Relate To',
    excerpt: 'A deep look at Zomato’s irreverent conversational tone, notification CRM virality, and cultural positioning.',
    slug: 'zomato-social-media-humour',
    type: 'post',
    link: '/campaigns/zomato-social-media-humour',
  },
  {
    id: 'local-2',
    title: 'The Amul Girl: Topical Advertising & Cultural Relevance',
    excerpt: 'India’s longest-running brand icon commenting on culture, cricket, and politics since 1966.',
    slug: 'amul-girl-topical-advertising',
    type: 'post',
    link: '/campaigns/amul-girl-topical-advertising',
  },
  {
    id: 'local-3',
    title: 'Share a Coke: Personalisation as a Global Brand Experience',
    excerpt: 'Swapping the Coca-Cola logo with 150 popular names to turn retail packaging into organic user-generated content.',
    slug: 'share-a-coke-personalisation',
    type: 'post',
    link: '/campaigns/share-a-coke-personalisation',
  },
  {
    id: 'local-4',
    title: 'Nike: The 35-Year Evolution of "Just Do It"',
    excerpt: 'From Walt Stack on the Golden Gate Bridge to Colin Kaepernick: turning a shoe slogan into a heroic cultural ethos.',
    slug: 'nike-just-do-it-evolution',
    type: 'post',
    link: '/campaigns/nike-just-do-it-evolution',
  },
  {
    id: 'local-5',
    title: 'Paper Boat: Sensory Memory & Emotional Branding',
    excerpt: 'Reviving nostalgic Indian childhood beverages with tactile packaging pouches and poetic storytelling.',
    slug: 'paper-boat-nostalgia-marketing',
    type: 'post',
    link: '/campaigns/paper-boat-nostalgia-marketing',
  },
  {
    id: 'local-6',
    title: 'Apple: "Think Different" and the Alchemy of Brand Salvation',
    excerpt: 'Steve Jobs and TBWA\\Chiat\\Day rescuing Apple from bankruptcy without showing a single computer.',
    slug: 'apple-think-different-comeback',
    type: 'post',
    link: '/campaigns/apple-think-different-comeback',
  },
  {
    id: 'local-7',
    title: 'Marketing Fundamentals: The 4Ps and 7Ps Framework',
    excerpt: 'Core product, price, place, promotion, people, process, and physical evidence breakdowns.',
    slug: 'knowledge-library',
    type: 'page',
    link: '/knowledge-library?cat=fundamentals',
  },
  {
    id: 'local-8',
    title: 'Segmentation, Targeting & Positioning (STP)',
    excerpt: 'How to define addressable markets, select profitable segments, and own distinctive mental shelf space.',
    slug: 'knowledge-library',
    type: 'page',
    link: '/knowledge-library?cat=fundamentals',
  },
  {
    id: 'local-9',
    title: 'Porter’s Five Forces Competitive Analysis',
    excerpt: 'Threat of new entrants, supplier power, buyer power, substitutes, and industry rivalry.',
    slug: 'knowledge-library',
    type: 'page',
    link: '/knowledge-library?cat=fundamentals',
  },
  {
    id: 'local-10',
    title: 'The AIDA Model & Hierarchy of Effects',
    excerpt: 'Attention, Interest, Desire, Action — mapping cognitive and emotional consumer journeys.',
    slug: 'knowledge-library',
    type: 'page',
    link: '/knowledge-library?cat=advertising',
  },
  {
    id: 'local-11',
    title: 'Campaign Brief & Planner Tool',
    excerpt: 'Interactive campaign brief generator with objectives, target audience, budget, and channel flighting.',
    slug: 'strategy-hub',
    type: 'page',
    link: '/strategy-hub#planner',
  },
  {
    id: 'local-12',
    title: 'Marketing Calculators (CTR, CPM, CPC, ROI, ROAS)',
    excerpt: 'Interactive mathematical calculators with formula explanations, input validation, and reset capabilities.',
    slug: 'tools-resources',
    type: 'page',
    link: '/tools-resources',
  },
  {
    id: 'local-13',
    title: 'AI Marketing Desk: Multi-Tool Workspace',
    excerpt: 'Generate creative campaign concepts, comprehensive strategies, brand audits, and social captions.',
    slug: 'ai-marketing-desk',
    type: 'page',
    link: '/ai-marketing-desk',
  },
  {
    id: 'local-14',
    title: 'India vs Global Brand Comparisons',
    excerpt: 'Amul vs Ben & Jerry’s, boAt vs Beats, Swiggy vs DoorDash strategic matchup scorecards.',
    slug: 'india-vs-global',
    type: 'page',
    link: '/india-vs-global',
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const performSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        setHasSearched(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      const q = searchQuery.toLowerCase().trim();
      const localMatches = localIndex.filter(
        (item) => item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)
      );

      try {
        const WP_API = 'https://public-api.wordpress.com/wp/v2/sites/marketecture5.wordpress.com';
        const [postsRes, pagesRes] = await Promise.all([
          fetch(`${WP_API}/posts?search=${encodeURIComponent(searchQuery)}&per_page=5`).catch(() => null),
          fetch(`${WP_API}/pages?search=${encodeURIComponent(searchQuery)}&per_page=5`).catch(() => null),
        ]);

        const posts = postsRes && postsRes.ok ? await postsRes.json() : [];
        const pages = pagesRes && pagesRes.ok ? await pagesRes.json() : [];

        const formattedResults: SearchResult[] = [
          ...localMatches,
          ...posts.map((p: { id: number; title: { rendered: string }; excerpt: { rendered: string }; slug: string; link: string }) => ({
            id: p.id,
            title: p.title.rendered.replace(/<[^>]*>/g, ''),
            excerpt: p.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 120),
            slug: p.slug,
            type: 'post' as const,
            link: `/campaigns/${p.slug}`,
          })),
          ...pages.map((p: { id: number; title: { rendered: string }; excerpt: { rendered: string }; slug: string; link: string }) => ({
            id: p.id,
            title: p.title.rendered.replace(/<[^>]*>/g, ''),
            excerpt: p.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 120),
            slug: p.slug,
            type: 'page' as const,
            link: p.slug === 'home' ? '/' : `/${p.slug}`,
          })),
        ];

        // Deduplicate results by link
        const seen = new Set<string>();
        const uniqueResults = formattedResults.filter((item) => {
          if (seen.has(item.link)) return false;
          seen.add(item.link);
          return true;
        });

        setResults(uniqueResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults(localMatches);
      } finally {
        setIsLoading(false);
      }
    }, 400),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    performSearch(val);
  };

  const postResults = results.filter((r) => r.type === 'post');
  const pageResults = results.filter((r) => r.type === 'page');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-surface/95 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="mt-[15vh] w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search articles, campaigns, strategies..."
                className="w-full rounded-sm border border-white/10 bg-navy-light px-14 py-5 font-heading text-lg text-ivory placeholder-muted/60 outline-none transition-colors focus:border-orange/50"
                aria-label="Search MARKETECTURE"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-ivory"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            {(isLoading || hasSearched) && (
              <motion.div
                className="mt-3 max-h-[50vh] overflow-y-auto rounded-sm border border-white/10 bg-navy-light"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3 px-6 py-12 text-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-orange" />
                    <span className="text-sm">Searching...</span>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-6 py-12 text-center text-muted">
                    <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {/* Posts */}
                    {postResults.length > 0 && (
                      <div className="p-4">
                        <h3 className="editorial-label mb-3 px-2">Posts</h3>
                        <div className="space-y-1">
                          {postResults.map((result) => (
                            <Link
                              key={result.id}
                              href={result.link}
                              onClick={onClose}
                              className="group flex items-center justify-between rounded-sm px-3 py-3 transition-colors hover:bg-white/5"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-heading text-sm font-medium text-ivory">
                                  {result.title}
                                </p>
                                {result.excerpt && (
                                  <p className="mt-0.5 truncate text-xs text-muted">
                                    {result.excerpt}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="ml-3 h-4 w-4 flex-shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-orange" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pages */}
                    {pageResults.length > 0 && (
                      <div className="p-4">
                        <h3 className="editorial-label mb-3 px-2">Pages</h3>
                        <div className="space-y-1">
                          {pageResults.map((result) => (
                            <Link
                              key={result.id}
                              href={result.link}
                              onClick={onClose}
                              className="group flex items-center justify-between rounded-sm px-3 py-3 transition-colors hover:bg-white/5"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-heading text-sm font-medium text-ivory">
                                  {result.title}
                                </p>
                                {result.excerpt && (
                                  <p className="mt-0.5 truncate text-xs text-muted">
                                    {result.excerpt}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="ml-3 h-4 w-4 flex-shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-orange" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Keyboard hint */}
            <div className="mt-3 flex justify-center">
              <span className="text-xs text-muted/40">
                Press <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
