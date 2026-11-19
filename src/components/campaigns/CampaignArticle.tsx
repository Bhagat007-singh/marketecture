'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Share2, Check, BookOpen, ExternalLink, ShieldCheck, Heart, Bookmark } from 'lucide-react';
import { formatDate } from '@/lib/wordpress';
import { getLikesCount, isItemLiked, toggleItemLike, isItemBookmarked, toggleItemBookmark } from '@/lib/likes';
import parse, { domToReact, DOMNode, Element } from 'html-react-parser';

interface CampaignArticleProps {
  title: string;
  category: string;
  date: string;
  content: string;
  slug: string;
  featuredImage?: string;
}

export default function CampaignArticle({
  title,
  category,
  date,
  content,
  slug,
  featuredImage,
}: CampaignArticleProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setLikesCount(getLikesCount(slug));
    setIsLiked(isItemLiked(slug));
    setIsBookmarked(isItemBookmarked(slug));

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.id === slug) {
        setLikesCount(custom.detail.count);
        setIsLiked(custom.detail.liked);
      }
    };
    window.addEventListener('marketecture_like_updated', handleSync);
    return () => window.removeEventListener('marketecture_like_updated', handleSync);
  }, [slug]);

  const handleToggleLike = () => {
    const res = toggleItemLike(slug);
    setIsLiked(res.liked);
    setLikesCount(res.count);
  };

  const handleToggleBookmark = () => {
    const res = toggleItemBookmark(slug);
    setIsBookmarked(res);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-orange z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="py-16 md:py-24">
        <div className="editorial-narrow">
          {/* Back Link */}
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-muted hover:text-orange transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Campaign Archive
          </Link>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="editorial-label flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {category}
            </span>
            <span className="text-navy/20">•</span>
            <span className="text-xs text-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
            <span className="text-navy/20">•</span>
            <span className="text-xs font-heading font-medium text-orange/90 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              13-Point Analytical Review
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-display-md lg:text-display-lg text-navy mb-8 font-heading font-bold leading-tight">
            {title}
          </h1>

          <div className="accent-line mb-10" />

          {/* Featured Hero Banner */}
          {featuredImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-md border border-navy/10 mb-10 shadow-sm bg-navy/5">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-navy/10 text-xs text-muted">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange" />
              <span>Standardised Case Study Architecture</span>
            </div>
            <div className="flex items-center gap-2.5">
              {/* Like / Endorse Button */}
              <button
                type="button"
                onClick={handleToggleLike}
                aria-label={isLiked ? "Unlike this case study" : "Like this case study"}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                    : 'bg-white text-navy/70 border border-navy/15 hover:border-red-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 transition-transform ${isLiked ? 'fill-red-600 text-red-600 scale-110' : ''}`} />
                <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={handleToggleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this case study"}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-orange/10 text-orange border border-orange/30 shadow-sm'
                    : 'bg-white text-navy/70 border border-navy/15 hover:border-orange hover:text-orange'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-orange text-orange' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-navy/70 border border-navy/15 hover:border-orange hover:text-orange text-xs font-heading font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" /> Copied Link
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Share Study
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WordPress / Dynamic Case Study Content */}
          <div className="wp-content mb-16">
            {content ? parse(content, {
              replace: (domNode) => {
                if (domNode instanceof Element && domNode.name === 'a') {
                  const href = domNode.attribs?.href;
                  if (href && (href.startsWith('/') || href.startsWith('#'))) {
                    return (
                      <Link
                        href={href}
                        className={domNode.attribs.class || domNode.attribs.className}
                      >
                        {domToReact(domNode.children as DOMNode[])}
                      </Link>
                    );
                  }
                }
              },
            }) : (
              <div className="space-y-8 text-navy/80 leading-relaxed">
                <p>
                  This case study is being synchronised from the Marketecture editorial CMS. Below is the structured analysis framework applied to this campaign:
                </p>
                <div className="grid grid-cols-1 gap-4 bg-white p-8 rounded-sm border border-navy/10">
                  <h3 className="font-heading font-bold text-lg text-navy">13-Point Case Study Architecture</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-navy/70">
                    <li><strong>Brand Introduction:</strong> Heritage, category positioning, and market share.</li>
                    <li><strong>Business Background:</strong> Commercial challenge and inflection point.</li>
                    <li><strong>Marketing Objectives:</strong> Specific awareness, perception, and commercial targets.</li>
                    <li><strong>Target Audience:</strong> Demographics, psychographics, and cultural cohorts.</li>
                    <li><strong>Consumer Insight:</strong> The underlying human tension or unarticulated truth.</li>
                    <li><strong>Campaign Idea:</strong> The singular creative proposition and core concept.</li>
                    <li><strong>Creative Execution:</strong> Art direction, copy tone, and storytelling mechanisms.</li>
                    <li><strong>Advertising Message:</strong> Hierarchy of communications across touchpoints.</li>
                    <li><strong>Media &amp; Distribution Strategy:</strong> Omnichannel mix and flighting plan.</li>
                    <li><strong>Influencer &amp; Advocate Involvement:</strong> Tiered engagement and cultural seeding.</li>
                    <li><strong>Campaign Results:</strong> Publicly reported, audited metrics (strictly separated from estimates).</li>
                    <li><strong>Key Marketing Lessons:</strong> Enduring strategic principles applicable across categories.</li>
                    <li><strong>Source References:</strong> Verified citations and public archives.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Endorsement & Like Banner */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/10 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-heading font-bold text-base text-navy mb-1 flex items-center gap-2">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600 text-red-600' : 'text-red-500'}`} />
                Found this campaign breakdown valuable?
              </h4>
              <p className="text-xs text-muted">
                Join {likesCount} marketers and strategists who endorsed this strategic teardown.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleLike}
              className={`px-5 py-2.5 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isLiked
                  ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                  : 'bg-navy text-white hover:bg-orange shadow-md'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
              <span>{isLiked ? 'Liked & Endorsed' : 'Like This Case Study'}</span>
            </button>
          </div>

          {/* Editorial Disclaimer Banner */}
          <div className="p-6 bg-white border-l-4 border-orange rounded-sm border-t border-r border-b border-navy/10 mb-12 text-xs text-muted leading-relaxed">
            <strong className="text-navy font-heading block mb-1">
              Editorial Rigor &amp; Attribution Policy
            </strong>
            Marketecture maintains a strict editorial distinction between verified, officially reported campaign metrics (such as audited quarterly filings, Effie case entries, or verified Nielsen data) and editorial strategic interpretation. Performance numbers are never simulated or fabricated.
          </div>

          {/* Related Case Studies Cross-Links Grid */}
          <div className="mb-16 pt-8 border-t border-navy/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-navy">
                Related Case Studies &amp; Playbooks
              </h3>
              <Link href="/campaigns" className="text-xs font-heading font-semibold text-orange hover:underline">
                View all 10 teardowns →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { slug: 'blinkit-quick-commerce-topical-marketing', title: 'Blinkit: 10-Minute Delivery & Viral Billboards', tag: 'Quick Commerce' },
                { slug: 'zepto-quick-commerce-speed', title: 'Zepto: Marketing Speed in Quick Commerce', tag: 'Hyperlocal Logistics' },
                { slug: 'zomato-social-media-humour', title: 'Zomato: Conversational Humour & Push CRM', tag: 'Food Tech' },
                { slug: 'boat-youth-lifestyle-audio', title: 'boAt: Youth-Centred Lifestyle Audio', tag: 'D2C Hardware' },
                { slug: 'inshorts-news-brevity-product', title: 'Inshorts: 60-Word News Brevity as Product', tag: 'Product UX' },
                { slug: 'amul-girl-topical-advertising', title: 'Amul Girl: 58+ Years of Topical Hoardings', tag: 'Topical FMCG' },
                { slug: 'share-a-coke-personalisation', title: 'Share a Coke: Packaging as Media Channel', tag: 'Global Personalisation' },
                { slug: 'apple-think-different-comeback', title: 'Apple: "Think Different" 1997 Comeback', tag: 'Brand Positioning' },
                { slug: 'nike-just-do-it-evolution', title: 'Nike: 35-Year Evolution of Just Do It', tag: 'Global Ethos' },
                { slug: 'paper-boat-nostalgia-marketing', title: 'Paper Boat: Childhood Nostalgia Branding', tag: 'Sensory Storytelling' },
              ]
                .filter((item) => item.slug !== slug)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/campaigns/${item.slug}`}
                    className="group flex flex-col justify-between p-4 bg-white rounded-lg border border-navy/10 hover:border-orange/40 hover:shadow-md transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange font-semibold block mb-1">
                        {item.tag}
                      </span>
                      <h4 className="text-sm font-heading font-bold text-navy group-hover:text-orange transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-muted group-hover:text-navy flex items-center gap-1 transition-colors">
                      Read Teardown <ArrowLeft className="w-3 h-3 rotate-180" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-navy/10 flex items-center justify-between">
            <Link
              href="/campaigns"
              className="btn-outline text-xs py-3 px-6"
            >
              ← Back to Campaign Archive
            </Link>
            <Link
              href="/strategy-hub"
              className="btn-primary text-xs py-3 px-6"
            >
              Explore Strategy Hub →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
