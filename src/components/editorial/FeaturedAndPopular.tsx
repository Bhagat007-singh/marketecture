'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FeaturedAndPopular() {
  return (
    <section className="bg-[#0D1520] text-white pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-5">
          <div className="lg:col-span-5">
            <h2 className="font-heading font-black text-xl lg:text-2xl text-white inline-block relative pb-2 tracking-tight">
              Featured Campaign
              <span className="absolute bottom-0 left-0 w-14 h-[2.5px] bg-[#F28C38]" />
            </h2>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-heading font-black text-xl lg:text-2xl text-white tracking-tight">
              Popular Sections
            </h2>
          </div>
        </div>

        {/* Cards Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Featured Campaign Card (Zomato) - 5 Cols */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex"
          >
            <Link
              href="/campaigns/zomato-social-media-humour"
              className="group block w-full relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/70 transition-all duration-300 shadow-2xl bg-[#09111C]"
              aria-label="Featured Campaign: How Zomato Built a Brand People Relate To"
            >
              <div className="relative w-full aspect-[426/122] overflow-hidden">
                <Image
                  src="/images/zomato-card-full.png"
                  alt="How Zomato Built a Brand People Relate To - Campaign Analysis"
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </Link>
          </motion.div>

          {/* Right: 3 Popular Section Cards (Knowledge, Strategy, AI Desk) - 7 Cols */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {/* Card 1: Knowledge Library */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <Link
                href="/knowledge-library"
                className="group block w-full relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/70 transition-all duration-300 shadow-xl bg-[#0A121E]"
                aria-label="Knowledge Library: From fundamentals to advanced marketing concepts"
              >
                <div className="relative w-full aspect-[156/122] overflow-hidden">
                  <Image
                    src="/images/card-knowledge-full.png"
                    alt="Knowledge Library - From fundamentals to advanced marketing concepts"
                    fill
                    className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Card 2: Strategy Hub */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <Link
                href="/strategy-hub"
                className="group block w-full relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/70 transition-all duration-300 shadow-xl bg-[#0A121E]"
                aria-label="Strategy Hub: Frameworks, templates and actionable plans"
              >
                <div className="relative w-full aspect-[156/122] overflow-hidden">
                  <Image
                    src="/images/card-strategy-full.png"
                    alt="Strategy Hub - Frameworks, templates and actionable plans"
                    fill
                    className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Card 3: AI Marketing Desk */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <Link
                href="/ai-marketing-desk"
                className="group block w-full relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 hover:border-[#F28C38]/70 transition-all duration-300 shadow-xl bg-[#0A121E]"
                aria-label="AI Marketing Desk: Generate ideas, build strategies and create content with AI"
              >
                <div className="relative w-full aspect-[156/122] overflow-hidden">
                  <Image
                    src="/images/card-ai-full.png"
                    alt="AI Marketing Desk - Generate ideas, build strategies and create content with AI"
                    fill
                    className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
