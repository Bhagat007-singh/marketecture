'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react';

const globalPillars = [
  {
    icon: Compass,
    title: 'Cross-Cultural Strategy',
    description:
      'How transnational brands preserve brand equity while tuning messages to nuanced regional cultural cues, rituals, and semiotics.',
    tag: 'Cultural Semiotics',
  },
  {
    icon: Sparkles,
    title: 'Global Brand Building',
    description:
      'The architecture of iconic mega-brands (Apple, Nike, Coca-Cola) establishing emotional monopolies across disparate continents.',
    tag: 'Brand Architecture',
  },
  {
    icon: ShieldAlert,
    title: 'Localisation vs Standardisation',
    description:
      'Navigating the eternal tension between global cost efficiencies and high-resonance hyper-localised execution playbooks.',
    tag: 'Strategic Dialectic',
  },
];

export default function GlobalSpotlight() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-navy border-t border-navy/10 relative overflow-hidden">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-orange" />
              <span className="editorial-label">Global Perspectives</span>
            </div>
            <h2 className="text-display-lg text-navy">
              Ideas That Cross <span className="text-orange">Borders.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <Link
            href="/global-marketing"
            className="inline-flex items-center gap-2 text-navy hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
          >
            Explore Global Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {globalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white p-8 rounded-sm border border-navy/10 hover:border-orange/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange/80 mb-2 block">
                    {pillar.tag}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-navy mb-4 group-hover:text-orange transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-8 border-t border-navy/5 mt-8 flex items-center justify-between text-xs font-heading font-semibold uppercase tracking-wider text-navy/70 group-hover:text-orange">
                  <span>Deep Dive Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
