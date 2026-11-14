'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StatItem {
  value: string;
  numericPart: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '1.4B+', numericPart: 1.4, suffix: 'B+', label: 'Consumers' },
  { value: '22+', numericPart: 22, suffix: '+', label: 'Official Languages' },
  { value: '700M+', numericPart: 700, suffix: 'M+', label: 'Internet Users' },
  { value: '500M+', numericPart: 500, suffix: 'M+', label: 'Social Media Users' },
];

const topics = [
  'Festival Marketing',
  'Cricket & Brands',
  'D2C Revolution',
  'Regional Marketing',
  'Celebrity Endorsements',
  'Bollywood & Advertising',
  'Tier 2 & 3 Cities',
  'Vernacular Content',
  'UPI & Digital Payments',
  'Jugaad Innovation',
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const isDecimal = end < 10;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = count < 10 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span className="text-display-md lg:text-display-lg font-heading font-bold text-orange tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function IndianSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#111827' }}
    >
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="editorial-label mb-4 block">Indian Marketing</span>
            <h2 className="text-display-lg text-ivory mb-6">
              The World&apos;s Most{' '}
              <span className="text-orange">Complex</span> Consumer Market
            </h2>
            <div className="accent-line mb-8" />
            <p className="text-muted text-lg leading-relaxed mb-6">
              India isn&apos;t just a market — it&apos;s a mosaic of cultures, languages,
              and consumer behaviours. From festival-driven purchasing to mobile-first
              digital journeys, understanding Indian marketing requires a fundamentally
              different playbook.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Explore how brands navigate India&apos;s unique landscape — from luxury
              positioning in metros to vernacular campaigns in Tier 3 cities.
            </p>
            <Link
              href="/indian-marketing"
              className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm uppercase tracking-wide hover:gap-4 transition-all duration-300"
            >
              Explore Indian Marketing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative p-6 lg:p-8 rounded-sm border border-white/[0.08] bg-white/[0.02] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <AnimatedCounter
                    target={stat.numericPart}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                  <p className="text-muted text-sm mt-2 font-heading uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scrolling topics ticker */}
        <motion.div
          className="mt-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />

            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' },
              }}
            >
              {[...topics, ...topics].map((topic, i) => (
                <span
                  key={`${topic}-${i}`}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-orange/20 text-sm text-ivory/70 font-heading tracking-wide hover:border-orange/50 hover:text-orange transition-colors duration-300 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange/40" />
                  {topic}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
