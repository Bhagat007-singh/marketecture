'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Calendar, Tag, Sparkles } from 'lucide-react';
import { Campaign } from '@/lib/types';
import { formatDate } from '@/lib/wordpress';

interface CampaignGridProps {
  initialCampaigns: Campaign[];
}

const fallbackCampaigns: Campaign[] = [
  {
    id: 100,
    slug: 'blinkit-quick-commerce-topical-marketing',
    title: 'Blinkit: The 10-Minute Quick Commerce Revolution & Viral Billboard Banter',
    excerpt:
      'How Blinkit pivoted from Grofers into India’s dominant 10-minute delivery titan, turning urgent household cravings into compounding habit loops and nationwide billboard banter.',
    content: '',
    date: '2024-03-18T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 101,
    slug: 'amul-girl-topical-advertising',
    title: 'The Amul Girl: Topical Advertising and Cultural Relevance',
    excerpt:
      'How Amul created India’s longest-running advertising icon, turning dairy hoardings into a national voice for sociopolitical satire and cultural commentary since 1966.',
    content: '',
    date: '2024-03-15T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 102,
    slug: 'share-a-coke-personalisation',
    title: 'Share a Coke: Personalisation as a Global Brand Experience',
    excerpt:
      'By swapping its world-famous logo with popular first names, Coca-Cola reversed a decade of declining teen soda consumption and generated over 500,000 photos shared online.',
    content: '',
    date: '2024-03-10T00:00:00',
    category: 'Global Campaigns',
  },
  {
    id: 103,
    slug: 'zomato-social-media-humour',
    title: 'Zomato: Conversational Humour & Push Notification Dominance',
    excerpt:
      'Decoding how Zomato redefined CRM and social media engagement from promotional discounts into culturally attuned, self-deprecating meme entertainment.',
    content: '',
    date: '2024-03-05T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 104,
    slug: 'nike-just-do-it-evolution',
    title: 'Nike: The 35-Year Evolution of "Just Do It"',
    excerpt:
      'From Walt Stack jogging across the Golden Gate Bridge in 1988 to the Colin Kaepernick stand, how Nike transformed a slogan into a heroic cultural ethos.',
    content: '',
    date: '2024-02-28T00:00:00',
    category: 'Global Campaigns',
  },
  {
    id: 105,
    slug: 'paper-boat-nostalgia-marketing',
    title: 'Paper Boat: Sensory Memory and Emotional Branding',
    excerpt:
      'Hector Beverages bypassed the fizzy soda giants by reviving childhood memory drinks (Aam Panna, Jaljeera) packaged in tactile pouches with evocative poetic copy.',
    content: '',
    date: '2024-02-20T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 106,
    slug: 'apple-think-different-comeback',
    title: 'Apple: "Think Different" and the Alchemy of Brand Salvation',
    excerpt:
      'In 1997, 90 days from bankruptcy, Steve Jobs and TBWA\\Chiat\\Day launched an ad campaign without showing a single computer product, resurrecting Apple’s identity.',
    content: '',
    date: '2024-02-14T00:00:00',
    category: 'Global Campaigns',
  },
  {
    id: 107,
    slug: 'boat-youth-lifestyle-audio',
    title: 'boAt: Building a Youth-Centred Lifestyle Audio Brand',
    excerpt:
      'How boAt transformed functional audio accessories into a youth lifestyle symbol, combining accessible pricing, celebrity associations, and 360M+ campaign impressions.',
    content: '',
    date: '2024-04-10T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 108,
    slug: 'zepto-quick-commerce-speed',
    title: 'Zepto: Marketing Speed in India’s Quick-Commerce Market',
    excerpt:
      'How Zepto carved an undisputed 10-minute delivery proposition in India’s crowded online grocery market through dark-store density, viral street hoardings, and cultural agility.',
    content: '',
    date: '2024-04-12T00:00:00',
    category: 'Indian Campaigns',
  },
  {
    id: 109,
    slug: 'inshorts-news-brevity-product',
    title: 'Inshorts: Turning News Brevity into a Digital Product',
    excerpt:
      'How three college students built India’s most distinctive news app by constraining every story to 60 words, creating an addictive swipeable habit loop and native ad engine.',
    content: '',
    date: '2024-04-15T00:00:00',
    category: 'Indian Campaigns',
  },
];

const categories = [
  'All Campaigns',
  'Indian Campaigns',
  'Global Campaigns',
  'Digital & Social',
  'Brand Storytelling',
];

export default function CampaignGrid({ initialCampaigns }: CampaignGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat === 'indian') setSelectedCategory('Indian Campaigns');
    else if (cat === 'global') setSelectedCategory('Global Campaigns');
    else if (cat === 'digital') setSelectedCategory('Digital & Social');
    else if (cat === 'storytelling') setSelectedCategory('Brand Storytelling');
  }, [searchParams]);

  // Combine fetched campaigns with rich fallback items to guarantee a full archive
  const allCampaigns = useMemo(() => {
    const list = [...initialCampaigns];
    for (const fb of fallbackCampaigns) {
      if (!list.some((c) => c.slug === fb.slug)) {
        list.push(fb);
      }
    }
    return list;
  }, [initialCampaigns]);

  const filteredCampaigns = useMemo(() => {
    return allCampaigns.filter((campaign) => {
      const matchesCat =
        selectedCategory === 'All Campaigns' ||
        campaign.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Digital & Social' &&
          (campaign.title.toLowerCase().includes('social') || campaign.excerpt.toLowerCase().includes('social'))) ||
        (selectedCategory === 'Brand Storytelling' &&
          (campaign.title.toLowerCase().includes('story') || campaign.excerpt.toLowerCase().includes('brand') || campaign.excerpt.toLowerCase().includes('nostalgia')));

      const matchesSearch =
        searchQuery.trim() === '' ||
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [allCampaigns, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Controls: Search and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-navy/10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-orange text-white shadow-md shadow-orange/20'
                  : 'bg-white text-navy/70 border border-navy/10 hover:border-orange/50 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, brands..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-navy/15 rounded-sm text-xs text-navy placeholder:text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-navy"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Campaign Count Meta */}
      <div className="flex items-center justify-between text-xs text-muted font-heading uppercase tracking-wider mb-8">
        <span>Showing {filteredCampaigns.length} Analyzed Campaigns</span>
        <span>Verified Case Studies &amp; Interpretations</span>
      </div>

      {/* Asymmetric Editorial Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 bg-white border border-navy/10 rounded-sm">
          <p className="font-heading text-lg text-navy mb-2">No campaigns found</p>
          <p className="text-xs text-muted">Try adjusting your search query or selected category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((camp, idx) => {
              const isLead = idx === 0 && selectedCategory === 'All Campaigns' && searchQuery === '';
              return (
                <motion.article
                  key={camp.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`card-editorial flex flex-col justify-between group ${
                    isLead ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-orange/[0.03]' : ''
                  }`}
                >
                  <div className="p-8">
                    {/* Badge and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="editorial-label flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {camp.category}
                      </span>
                      {camp.date && (
                        <span className="text-[11px] text-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(camp.date)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-heading font-bold text-navy group-hover:text-orange transition-colors mb-4 ${
                        isLead ? 'text-2xl md:text-3xl leading-snug' : 'text-xl leading-snug'
                      }`}
                    >
                      <Link href={`/campaigns/${camp.slug}`}>{camp.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-muted leading-relaxed ${isLead ? 'text-base' : 'text-sm'}`}>
                      {camp.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-8 py-5 border-t border-navy/5 bg-navy/[0.01] flex items-center justify-between">
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-orange" />
                      13-Point Matrix Breakdown
                    </span>
                    <Link
                      href={`/campaigns/${camp.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-orange uppercase tracking-wider group-hover:translate-x-1 transition-all"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
