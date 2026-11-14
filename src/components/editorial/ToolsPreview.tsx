'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Percent, DollarSign, Activity, TrendingUp, BarChart2, PieChart } from 'lucide-react';

const calculators = [
  {
    icon: Percent,
    title: 'CTR Calculator',
    formula: '(Clicks ÷ Impressions) × 100',
    desc: 'Benchmark your ad relevance and creative clickability.',
  },
  {
    icon: DollarSign,
    title: 'CPM Calculator',
    formula: '(Cost ÷ Impressions) × 1,000',
    desc: 'Evaluate top-of-funnel reach and media efficiency.',
  },
  {
    icon: Activity,
    title: 'CPC Calculator',
    formula: 'Cost ÷ Clicks',
    desc: 'Measure acquisition traffic cost across channels.',
  },
  {
    icon: BarChart2,
    title: 'Engagement Rate',
    formula: '(Engagements ÷ Audience) × 100',
    desc: 'Selectable denominator: Reach, Impressions, or Followers.',
  },
  {
    icon: TrendingUp,
    title: 'ROI Calculator',
    formula: '((Return − Investment) ÷ Investment) × 100',
    desc: 'Quantify true net gain on overall marketing initiatives.',
  },
  {
    icon: PieChart,
    title: 'ROAS Calculator',
    formula: 'Ad Revenue ÷ Ad Spend',
    desc: 'Track direct revenue multiples generated per ad dollar.',
  },
];

export default function ToolsPreview() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-navy relative border-t border-navy/10">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-orange" />
              <span className="editorial-label">Interactive Utilities</span>
            </div>
            <h2 className="text-display-lg text-navy">
              Calculate. Plan. <span className="text-orange">Execute.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <Link
            href="/tools-resources"
            className="inline-flex items-center gap-2 text-navy hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
          >
            Open All Working Calculators
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, idx) => {
            const Icon = calc.icon;
            return (
              <motion.div
                key={calc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-sm bg-navy/5 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono bg-navy/5 text-navy/70 px-2 py-0.5 rounded">
                      {calc.formula}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-navy mb-2 group-hover:text-orange transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <Link
                  href="/tools-resources"
                  className="mt-6 pt-4 border-t border-navy/5 text-xs font-heading font-semibold text-orange hover:text-navy flex items-center justify-between"
                >
                  <span>Launch Interactive Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
