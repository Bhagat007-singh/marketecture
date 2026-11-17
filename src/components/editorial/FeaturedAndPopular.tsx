'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass, Sparkles } from 'lucide-react';

export default function FeaturedAndPopular() {
  return (
    <section className="bg-[#0A101C] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-white/5 relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F28C38]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Titles with Trending Editorial Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 items-end">
          <div className="lg:col-span-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F28C38] animate-pulse" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-[2px] text-[#F28C38]">
                  Spotlight Story
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl lg:text-3xl text-white tracking-tight">
                Featured Campaign
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-[2px] text-ivory/60">
                  Curated Knowledge Hubs
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl lg:text-3xl text-white tracking-tight">
                Popular Sections
              </h2>
            </div>
            <Link
              href="/knowledge-library"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#F28C38] hover:text-white transition-colors"
            >
              <span>View All Libraries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento Grid: 1 Wide Hero Card + 3 High-Definition Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Featured Zomato Campaign Card - 5 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex"
          >
            <Link
              href="/campaigns/zomato-social-media-humour"
              className="group block w-full relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/80 transition-all duration-300 shadow-2xl bg-[#0E1624] flex flex-col justify-between"
              aria-label="Featured Campaign: How Zomato Built a Brand People Relate To"
            >
              {/* Card Image Banner with Dark Vignette */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden">
                <Image
                  src="/images/zomato-rider-hd.jpg"
                  alt="Zomato delivery rider on motorcycle in vibrant city night"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1624] via-[#0E1624]/60 to-transparent" />
                
                {/* Brand Pill & Category Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white font-heading font-black text-xs tracking-wider shadow-lg">
                    zomato
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-heading font-bold uppercase tracking-wider text-white/90 border border-white/10">
                    Indian Case Study
                  </span>
                </div>
              </div>

              {/* Crisp Native Typography & Meta */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 -mt-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-[1.8px] text-[#F28C38]">
                      CAMPAIGN ANALYSIS
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-[11px] text-ivory/60">CRM & Cultural Tone</span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-[#F28C38] transition-colors leading-snug tracking-tight mb-3">
                    How Zomato Built a Brand People Relate To
                  </h3>

                  <p className="text-sm text-ivory/70 leading-relaxed font-body">
                    A deep strategic look at Zomato’s irreverent conversational tone, notification CRM virality, and cultural positioning in urban India.
                  </p>
                </div>

                {/* Bottom Bar: Read Time & Animated Arrow Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-ivory/50 font-medium">8 min deep-dive breakdown</span>
                  <div className="w-10 h-10 rounded-full bg-[#F28C38] text-white flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-all duration-300 shadow-lg group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right: 3 Popular Section Cards (Knowledge, Strategy, AI Desk) - 7 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {/* Card 1: Knowledge Library */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex"
            >
              <Link
                href="/knowledge-library"
                className="group w-full relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/80 transition-all duration-300 shadow-xl bg-[#0E1624] flex flex-col justify-between"
                aria-label="Knowledge Library: From fundamentals to advanced marketing concepts"
              >
                {/* Image Top Half */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden">
                  <Image
                    src="/images/knowledge-books-hd.jpg"
                    alt="Stack of classic editorial marketing books"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    sizes="(max-width: 640px) 100vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1624] via-[#0E1624]/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[#F28C38] border border-white/10">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-wider text-[#F28C38] mb-1.5">
                      12 CORE MODELS
                    </span>
                    <h4 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-[#F28C38] transition-colors leading-snug tracking-tight mb-2">
                      Knowledge Library
                    </h4>
                    <p className="text-xs text-ivory/65 leading-relaxed line-clamp-3">
                      From Kotlerian 4Ps and STP to DAGMAR, Porter’s Five Forces, and unit economics.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-ivory/50 font-semibold">Explore</span>
                    <div className="w-7 h-7 rounded-full bg-[#F28C38] text-white flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-all duration-300 shadow-md">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 2: Strategy Hub */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex"
            >
              <Link
                href="/strategy-hub"
                className="group w-full relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/80 transition-all duration-300 shadow-xl bg-[#0E1624] flex flex-col justify-between"
                aria-label="Strategy Hub: Frameworks, templates and actionable plans"
              >
                {/* Image Top Half */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden">
                  <Image
                    src="/images/strategy-chess-hd.jpg"
                    alt="Sleek black chess king with dramatic amber studio lighting"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    sizes="(max-width: 640px) 100vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1624] via-[#0E1624]/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[#F28C38] border border-white/10">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-wider text-[#F28C38] mb-1.5">
                      GTM &amp; BRIEFS
                    </span>
                    <h4 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-[#F28C38] transition-colors leading-snug tracking-tight mb-2">
                      Strategy Hub
                    </h4>
                    <p className="text-xs text-ivory/65 leading-relaxed line-clamp-3">
                      Actionable marketing frameworks, campaign brief planners, and growth playbooks.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-ivory/50 font-semibold">Generate</span>
                    <div className="w-7 h-7 rounded-full bg-[#F28C38] text-white flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-all duration-300 shadow-md">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: AI Marketing Desk */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="flex"
            >
              <Link
                href="/ai-marketing-desk"
                className="group w-full relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/80 transition-all duration-300 shadow-xl bg-[#0E1624] flex flex-col justify-between"
                aria-label="AI Marketing Desk: Generate ideas, build strategies and create content with AI"
              >
                {/* Image Top Half */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden">
                  <Image
                    src="/images/ai-chip-hd.jpg"
                    alt="Futuristic glowing AI neural circuit processor"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    sizes="(max-width: 640px) 100vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1624] via-[#0E1624]/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[#F28C38] border border-white/10">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-wider text-[#F28C38] mb-1.5">
                      6 AI WORKSPACES
                    </span>
                    <h4 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-[#F28C38] transition-colors leading-snug tracking-tight mb-2">
                      AI Marketing Desk
                    </h4>
                    <p className="text-xs text-ivory/65 leading-relaxed line-clamp-3">
                      Generate campaign ideas, strategic roadmaps, brand audits, and social hooks.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-ivory/50 font-semibold">Launch AI</span>
                    <div className="w-7 h-7 rounded-full bg-[#F28C38] text-white flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-all duration-300 shadow-md">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
