'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Layers } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative bg-[#0A101C] text-white overflow-hidden pt-8 pb-8 lg:pt-12 lg:pb-10">
      {/* Ambient Radial Glowing Meshes */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#F28C38]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Editorial Display Typography & CTAs (6 Cols) */}
          <div className="lg:col-span-6 z-10">
            {/* Tagline Badge with Orange Accent Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] sm:text-xs font-heading font-black uppercase tracking-[2.5px] text-[#F28C38] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28C38] animate-ping" />
                THE MARKETING KNOWLEDGE PLATFORM
              </span>
              <span className="w-10 sm:w-14 h-[2px] bg-[#F28C38] inline-block" />
            </motion.div>

            {/* Giant Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] leading-[1.05] tracking-tight mb-6 text-white"
            >
              Understand Marketing.<br />
              Decode Ideas.<br />
              Build <span className="text-[#F28C38] relative inline-block">
                Strategies.
                <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#F28C38]/40 rounded-full" />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-heading font-semibold text-white/95 mb-4 leading-snug tracking-tight"
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

            {/* Dual CTAs & Live Stat Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F28C38] text-white font-heading font-bold text-sm tracking-wide rounded-lg transition-all duration-300 hover:bg-[#d96716] hover:shadow-xl hover:shadow-[#F28C38]/30 group"
              >
                <span>Explore Campaigns</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/knowledge-library"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 border border-white/20 text-white font-heading font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm"
              >
                Discover Marketing
              </Link>
            </motion.div>

            {/* Micro Editorial Stat Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-ivory/60"
            >
              <div className="flex items-center gap-1.5 font-heading font-bold text-white">
                <span className="text-[#F28C38]">50%</span> Indian
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5 font-heading font-bold text-white">
                <span className="text-[#F28C38]">50%</span> Global
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5 font-heading font-bold text-white">
                <span className="text-[#F28C38]">100%</span> Marketing Thinking
              </div>
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

              {/* Floating Glassmorphic Editorial Badges */}
              <div className="absolute top-4 left-4 bg-[#0A101C]/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-white">
                  Live Marketing Intelligence
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
