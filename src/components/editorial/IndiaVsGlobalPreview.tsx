'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, SplitSquareVertical } from 'lucide-react';

const matchups = [
  {
    brandA: 'Amul',
    originA: 'India',
    brandB: "Ben & Jerry's",
    originB: 'United States',
    category: 'Dairy & Confectionery',
    dimension: 'Cultural Salience & Mascot-Led Topicals vs Cause-Led Activism',
    tagA: 'Cooperative Economy & National Identity',
    tagB: 'Progressive Values & Social Advocacy',
  },
  {
    brandA: 'boAt',
    originA: 'India',
    brandB: 'Beats by Dre',
    originB: 'United States',
    category: 'Consumer Lifestyle Audio',
    dimension: 'Value-First Bass-Heavy Aspiration vs High-Margin Hip-Hop Cultural Iconography',
    tagA: 'Accessible Gen-Z Lifestyle',
    tagB: 'Celebrity Halo & Premium Athleisure',
  },
  {
    brandA: 'Flipkart',
    originA: 'India',
    brandB: 'Amazon',
    originB: 'Global',
    category: 'Digital E-Commerce Ecosystems',
    dimension: 'Festival Gamification & Regional Assortment vs Prime Ecosystem & Logistics Dominance',
    tagA: 'Big Billion Days Festive Surge',
    tagB: 'Everyday Low Prices & Infinite Shelf',
  },
];

export default function IndiaVsGlobalPreview() {
  return (
    <section className="py-24 md:py-32 bg-navy text-ivory relative overflow-hidden border-t border-white/10">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SplitSquareVertical className="w-4 h-4 text-orange" />
              <span className="editorial-label">Comparative Marketing Analysis</span>
            </div>
            <h2 className="text-display-lg text-ivory">
              Same Category. <span className="text-orange">Different Playbook.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <Link
            href="/india-vs-global"
            className="inline-flex items-center gap-2 text-ivory hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
          >
            Explore All 5 Category Matchups
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {matchups.map((matchup, idx) => (
            <motion.div
              key={matchup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-navy-light/40 border border-white/10 p-8 rounded-sm hover:border-orange/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-orange mb-6 block">
                  {matchup.category}
                </span>

                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-ivory group-hover:text-orange transition-colors">
                      {matchup.brandA}
                    </h3>
                    <span className="text-xs text-muted font-body">
                      {matchup.originA}
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded bg-orange/10 border border-orange/30 text-orange font-heading font-bold text-xs uppercase">
                    VS
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-heading font-bold text-ivory group-hover:text-orange transition-colors">
                      {matchup.brandB}
                    </h3>
                    <span className="text-xs text-muted font-body">
                      {matchup.originB}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="text-xs text-muted leading-relaxed">
                    <strong className="text-ivory block mb-1">Analytical Dimension:</strong>
                    {matchup.dimension}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-white/5">
                    <div className="bg-white/5 p-2 rounded text-ivory/80">
                      {matchup.tagA}
                    </div>
                    <div className="bg-white/5 p-2 rounded text-ivory/80 text-right">
                      {matchup.tagB}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/india-vs-global"
                className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-heading font-semibold uppercase tracking-wider text-orange hover:text-white transition-colors"
              >
                <span>Read Strategic Matrix</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
