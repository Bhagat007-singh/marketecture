'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Lightbulb, Compass, Share2, Search, ArrowRight, Sparkles } from 'lucide-react';

const aiTools = [
  {
    icon: Lightbulb,
    title: 'Campaign Idea Generator',
    desc: 'Transforms audience insights, budget parameters, and channels into distinctive creative concepts and execution hooks.',
  },
  {
    icon: Compass,
    title: 'Marketing Strategy Builder',
    desc: 'Structures end-to-end positioning frameworks, GTM timelines, and quantifiable measurement milestones.',
  },
  {
    icon: Share2,
    title: 'Social & Content Copilot',
    desc: 'Generates platform-calibrated Instagram captions, high-retention Reel narratives, and carousel outlines.',
  },
  {
    icon: Search,
    title: 'SEO & Intent Architect',
    desc: 'Dissects query intent clusters, semantic content architectures, and authoritative on-page blueprints.',
  },
];

export default function AIMarketingPreview() {
  return (
    <section className="py-24 md:py-32 bg-surface text-ivory relative overflow-hidden border-t border-white/10">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="editorial-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-orange" />
              <span className="editorial-label">Interactive AI Workbench</span>
            </div>
            <h2 className="text-display-lg text-ivory">
              Your AI-Powered <span className="text-orange">Marketing Partner.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-orange/10 border border-orange/30 text-orange">
              <Sparkles className="w-3.5 h-3.5" /> Instant Demo Mode Available
            </span>
            <Link
              href="/ai-marketing-desk"
              className="inline-flex items-center gap-2 text-ivory hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
            >
              Launch AI Desk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-navy-light/40 border border-white/10 p-6 rounded-sm hover:border-orange/60 hover:bg-navy-light/70 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-ivory mb-2 group-hover:text-orange transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <Link
                  href="/ai-marketing-desk"
                  className="mt-6 pt-4 border-t border-white/5 text-xs font-heading font-semibold text-orange hover:text-white flex items-center justify-between"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="p-6 bg-white/[0.03] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            <strong className="text-ivory">Editorial Standard:</strong> All AI outputs are generated as rapid structural drafts and ideation catalysts. Human critical judgement remains indispensable.
          </p>
          <Link
            href="/ai-marketing-desk"
            className="btn-primary whitespace-nowrap text-xs py-2.5 px-6"
          >
            Open Full Workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
