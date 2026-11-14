'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Award, HelpCircle, ArrowRight } from 'lucide-react';

const channels = [
  {
    icon: Award,
    title: 'Campaign Critiques',
    desc: 'Deep-dive member reviews of current Indian & global brand stunts, TVCs, and digital activations.',
  },
  {
    icon: HelpCircle,
    title: 'Strategy & Career Q&A',
    desc: 'Structured peer feedback for marketing students, agency planners, and brand managers.',
  },
  {
    icon: Users,
    title: 'Student & Creator Corner',
    desc: 'Submissions from emerging talent dissecting vernacular growth hacks and creative campaigns.',
  },
];

export default function CommunityPreview() {
  return (
    <section className="py-24 md:py-32 bg-navy text-ivory relative border-t border-white/10">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-orange" />
              <span className="editorial-label">Community Hub</span>
            </div>
            <h2 className="text-display-lg text-ivory">
              The Marketing <span className="text-orange">Circle.</span>
            </h2>
            <div className="accent-line mt-4" />
          </div>
          <Link
            href="/marketing-circle"
            className="inline-flex items-center gap-2 text-ivory hover:text-orange font-heading font-semibold text-sm uppercase tracking-wide group transition-colors"
          >
            Join the Live Discussion
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-navy-light/40 border border-white/10 p-8 rounded-sm hover:border-orange/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-orange/10 border border-orange/20 text-orange flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-ivory mb-3 group-hover:text-orange transition-colors">
                    {ch.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {ch.desc}
                  </p>
                </div>
                <Link
                  href="/marketing-circle"
                  className="text-xs font-heading font-semibold text-orange hover:text-white flex items-center gap-2 pt-6 border-t border-white/5"
                >
                  Enter Thread <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="border border-white/10 bg-white/[0.02] p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-heading font-bold text-lg text-ivory mb-1">
              Active Topic: &ldquo;Marketecture Marketing Circle: Introductions &amp; Ideas&rdquo;
            </h4>
            <p className="text-xs text-muted">
              Read community submissions and contribute your perspectives via our native WordPress discussion node.
            </p>
          </div>
          <Link href="/marketing-circle" className="btn-outline whitespace-nowrap text-xs py-3 px-6">
            Participate in Discourse
          </Link>
        </div>
      </div>
    </section>
  );
}
