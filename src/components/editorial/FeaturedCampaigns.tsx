'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignCard {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

const campaigns: CampaignCard[] = [
  {
    title: 'Blinkit: 10-Minute Delivery Revolution & Viral Billboard Banter',
    slug: 'blinkit-quick-commerce-topical-marketing',
    category: 'Indian Campaigns',
    excerpt:
      'From Grofers pivot to instant grocery dominance and the viral "Doodh mangoge / Kheer mangoge" billboard masterstroke with Zomato.',
  },
  {
    title: 'The Amul Girl: Topical Advertising That Became a Cultural Icon',
    slug: 'amul-girl-topical-advertising',
    category: 'Indian Campaigns',
    excerpt:
      'How a butter brand built a 50-year legacy of wit, social commentary, and topical brilliance through a simple cartoon girl.',
  },
  {
    title: 'Share a Coke: The Power of Personalisation at Scale',
    slug: 'share-a-coke-personalisation',
    category: 'Global Campaigns',
    excerpt:
      'Coca-Cola replaced its iconic logo with names — and rewrote the rules of consumer engagement.',
  },
  {
    title: 'Zomato: Conversational Humour & Push Notification Dominance',
    slug: 'zomato-social-media-humour',
    category: 'Indian Campaigns',
    excerpt:
      'Notification marketing, meme culture, and brand voice — how Zomato turned food delivery into entertainment.',
  },
  {
    title: 'Nike: Just Do It — Evolution of a Tagline',
    slug: 'nike-just-do-it-evolution',
    category: 'Global Campaigns',
    excerpt:
      'From a simple motivational line to the world\'s most powerful brand platform spanning four decades.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function FeaturedCampaigns() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="editorial-container">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-label mb-4 block">Campaign Archive</span>
          <h2 className="text-display-lg text-ivory mb-4">
            The Thinking Behind{' '}
            <span className="text-orange">the Work</span>
          </h2>
          <div className="accent-line" />
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {campaigns.map((campaign, i) => (
            <motion.div
              key={campaign.slug}
              variants={cardVariants}
              className={cn(
                i === 0 && 'md:col-span-2'
              )}
            >
              <Link
                href={`/campaigns/${campaign.slug}`}
                className="group block"
              >
                <div
                  className={cn(
                    'relative p-8 lg:p-10 rounded-sm border border-white/[0.08] bg-white/[0.02]',
                    'transition-all duration-500',
                    'hover:border-orange/40 hover:bg-white/[0.04] hover:-translate-y-1',
                    'hover:shadow-lg hover:shadow-orange/5',
                    i === 0 ? 'min-h-[280px] flex flex-col justify-end' : 'min-h-[220px] flex flex-col justify-end'
                  )}
                >
                  {/* Category badge */}
                  <span
                    className={cn(
                      'absolute top-6 left-8 lg:left-10 text-[10px] font-bold uppercase tracking-[2px]',
                      campaign.category === 'Indian Campaigns'
                        ? 'text-orange'
                        : 'text-muted'
                    )}
                  >
                    {campaign.category}
                  </span>

                  {/* Decorative number */}
                  <span className="absolute top-6 right-8 lg:right-10 text-[80px] lg:text-[100px] font-heading font-bold text-white/[0.03] leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    <h3
                      className={cn(
                        'font-heading font-bold text-ivory mb-3 group-hover:text-orange transition-colors duration-300',
                        i === 0
                          ? 'text-display-sm lg:text-display-md max-w-3xl'
                          : 'text-xl lg:text-2xl'
                      )}
                    >
                      {campaign.title}
                    </h3>
                    <p className="text-muted text-sm lg:text-base max-w-xl mb-4 leading-relaxed">
                      {campaign.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-orange text-sm font-heading font-semibold uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                      Read Analysis
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm uppercase tracking-wide hover:gap-4 transition-all duration-300"
          >
            View All Campaigns
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
