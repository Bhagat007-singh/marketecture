'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Target, Rocket, ArrowRight, Layers, FileText } from 'lucide-react';

const strategyPillars = [
  {
    icon: Compass,
    title: 'Brand Positioning & Architecture',
    desc: 'Translating nuanced consumer insights into distinct value propositions and defensible perceptual moats.',
    topics: ['Brand Pyramids', 'Perceptual Mapping', 'Value Propositions'],
  },
  {
    icon: Target,
    title: 'Audience Segmentation & Personas',
    desc: 'Moving past superficial demographics into psychological drivers, jobs-to-be-done, and behavioural triggers.',
    topics: ['Jobs-To-Be-Done', 'Persona Cards', 'Lifecycle Stages'],
  },
  {
    icon: Rocket,
    title: 'Campaign & GTM Strategy',
    desc: 'End-to-end launch choreography integrating creative platforms with hyper-targeted multichannel media distribution.',
    topics: ['GTM Phasing', 'Creative Briefs', 'Channel Orchestration'],
  },
  {
    icon: Layers,
    title: 'Measurement & Unit Economics',
    desc: 'Aligning performance ad spend with long-term brand equity, customer lifetime value, and incremental lift.',
    topics: ['Attribution Models', 'CAC:LTV Balancing', 'Brand Equity Lift'],
  },
];

export default function StrategyHubPreview() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-navy relative border-t border-navy/10">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-orange" />
              <span className="editorial-label">Strategic Playbooks</span>
            </div>
            <h2 className="text-display-lg text-navy">
              From Insight to <span className="text-orange">Action.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <Link
            href="/strategy-hub"
            className="inline-flex items-center gap-2 text-navy hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
          >
            Access Strategy Worksheets &amp; Planners
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-7 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-navy/5 flex items-center justify-center text-orange mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div>
                  <div className="space-y-1.5 pt-4 border-t border-navy/5 mb-6">
                    {pillar.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2 text-[11px] text-navy/70">
                        <FileText className="w-3 h-3 text-orange/80" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/strategy-hub"
                    className="text-xs font-heading font-semibold uppercase text-orange hover:text-navy transition-colors flex items-center gap-1.5"
                  >
                    Open Framework <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
