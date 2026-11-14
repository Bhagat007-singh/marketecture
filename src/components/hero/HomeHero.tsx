'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative bg-[#0A101C] text-white overflow-hidden pt-6 pb-6 lg:pt-10 lg:pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & CTAs (6 Cols) */}
          <div className="lg:col-span-6 z-10">
            {/* Tagline Badge with Orange Accent Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-[2px] text-ivory/80">
                THE MARKETING KNOWLEDGE PLATFORM
              </span>
              <span className="w-12 h-[2.5px] bg-[#F28C38] inline-block" />
            </motion.div>

            {/* Giant Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-[60px] xl:text-[64px] leading-[1.08] tracking-tight mb-6 text-white"
            >
              Understand Marketing.<br />
              Decode Ideas.<br />
              Build <span className="text-[#F28C38]">Strategies.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-heading font-medium text-white/95 mb-4 leading-snug"
            >
              Marketing is everywhere. The thinking behind it starts here.
            </motion.p>

            {/* Body Explanation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-base text-ivory/70 leading-relaxed max-w-xl mb-8 font-body font-normal"
            >
              Marketecture is a marketing knowledge and discovery platform exploring the ideas,
              campaigns, brands and consumer behaviour shaping modern marketing. From the
              streets and screens of India to global creative movements, we decode the strategy
              behind the story.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F28C38] text-white font-heading font-bold text-sm tracking-wide rounded-md transition-all duration-300 hover:bg-[#d96716] hover:shadow-xl hover:shadow-[#F28C38]/25"
              >
                <span>Explore Campaigns</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/knowledge-library"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent border border-white/70 text-white font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Discover Marketing
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Artwork Composition (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 relative flex items-end justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[620px] aspect-[609/280] overflow-hidden group">
              <Image
                src="/images/hero-composite.png"
                alt="Marketecture - Classical statue with megaphone, orange halo, and iconic brand billboards"
                fill
                priority
                className="object-contain object-right-bottom drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
