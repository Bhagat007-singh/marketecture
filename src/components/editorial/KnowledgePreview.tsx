'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Megaphone,
  Monitor,
  BarChart3,
  Target,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface KnowledgeItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const knowledgeAreas: KnowledgeItem[] = [
  {
    title: 'Marketing Fundamentals',
    description: '4Ps, STP, SWOT, Porter\'s Five Forces',
    icon: BookOpen,
  },
  {
    title: 'Consumer Behaviour',
    description: 'Psychology, decision journeys, personas',
    icon: Users,
  },
  {
    title: 'Advertising & Communication',
    description: 'AIDA, DAGMAR, brand storytelling',
    icon: Megaphone,
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, social media, performance marketing',
    icon: Monitor,
  },
  {
    title: 'Measurement & Analytics',
    description: 'ROI, ROAS, CTR, engagement metrics',
    icon: BarChart3,
  },
  {
    title: 'Brand Strategy',
    description: 'Positioning, identity, value proposition',
    icon: Target,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function KnowledgePreview() {
  return (
    <section className="section-light py-24 md:py-32">
      <div className="editorial-container">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="editorial-label mb-4 block">Knowledge Library</span>
          <h2 className="text-display-lg text-navy mb-4">
            Frameworks That Shape{' '}
            <span className="text-orange">Marketing Thinking</span>
          </h2>
          <div className="accent-line" />
        </motion.div>

        {/* 3x2 grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {knowledgeAreas.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Link href="/knowledge-library" className="group block">
                  <div className="relative p-8 rounded-sm bg-white border border-navy/[0.08] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-orange/30 overflow-hidden">
                    {/* Orange left border on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />

                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-orange" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-orange transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            href="/knowledge-library"
            className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm uppercase tracking-wide hover:gap-4 transition-all duration-300"
          >
            Explore Knowledge Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
