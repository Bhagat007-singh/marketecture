'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Megaphone, BookOpen, Target, BarChart3, Cpu } from 'lucide-react';

const featureItems = [
  {
    icon: Megaphone,
    title: 'Campaign Analysis',
    desc: 'Decode great (and not-so-great) marketing campaigns',
    href: '/campaigns',
  },
  {
    icon: BookOpen,
    title: 'Marketing Knowledge',
    desc: 'Learn core concepts, theories and real-world applications',
    href: '/knowledge-library',
  },
  {
    icon: Target,
    title: 'Strategy & Planning',
    desc: 'Turn marketing ideas into actionable strategies',
    href: '/strategy-hub',
  },
  {
    icon: BarChart3,
    title: 'India & Global View',
    desc: 'Explore marketing in India and around the world',
    href: '/india-vs-global',
  },
  {
    icon: Cpu,
    title: 'AI & Tools',
    desc: 'Use AI and practical tools to plan, create and measure',
    href: '/ai-marketing-desk',
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* Top Torn Paper Edge */}
      <div className="w-full overflow-hidden leading-none select-none bg-[#0A101C]">
        <div className="relative w-full h-3 sm:h-4 lg:h-5">
          <Image
            src="/images/torn-edge-top.png"
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Main Strip Body (Warm Ivory) */}
      <div className="bg-[#F6F2E9] py-3.5 sm:py-4 lg:py-5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 justify-between">
            {/* Left Title with Orange Bar Accent */}
            <div className="border-l-[3.5px] border-[#F28C38] pl-3.5 pr-2 shrink-0">
              <h3 className="font-heading font-black text-sm lg:text-[15px] leading-tight text-navy">
                Explore Marketing<br />
                <span className="font-bold">from Every Angle</span>
              </h3>
            </div>

            {/* 5 Feature Items with Subtle Vertical Dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4 flex-1">
              {featureItems.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === featureItems.length - 1;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex items-start gap-2.5 p-1 rounded group hover:opacity-90 transition-opacity ${
                      !isLast ? 'lg:border-r lg:border-navy/15 lg:pr-3' : ''
                    }`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded shrink-0 flex items-center justify-center text-navy/80 group-hover:text-[#F28C38] transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-navy group-hover:text-[#F28C38] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted leading-tight mt-0.5 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Torn Paper Edge */}
      <div className="w-full overflow-hidden leading-none select-none bg-[#0D1520]">
        <div className="relative w-full h-3 sm:h-4 lg:h-5">
          <Image
            src="/images/torn-edge-bottom.png"
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
