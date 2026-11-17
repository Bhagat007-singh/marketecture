'use client';

import Link from 'next/link';
import { Megaphone, BookOpen, Target, BarChart3, Cpu, Sparkles } from 'lucide-react';

const featureItems = [
  {
    icon: Megaphone,
    title: 'Campaign Analysis',
    desc: 'Decode iconic (and failed) marketing campaigns & mechanics',
    href: '/campaigns',
    tag: 'Case Studies',
  },
  {
    icon: BookOpen,
    title: 'Marketing Knowledge',
    desc: 'Learn 12 core models, 4Ps, STP & behavioral frameworks',
    href: '/knowledge-library',
    tag: 'Theory & Models',
  },
  {
    icon: Target,
    title: 'Strategy & Planning',
    desc: 'Turn strategic thinking into actionable GTM brief playbooks',
    href: '/strategy-hub',
    tag: 'Playbooks',
  },
  {
    icon: BarChart3,
    title: 'India & Global View',
    desc: 'Cultural positioning, regional nuances & global movements',
    href: '/india-vs-global',
    tag: '50/50 Lens',
  },
  {
    icon: Cpu,
    title: 'AI & Calculators',
    desc: 'Practical AI generators, CTR, CPM, ROI & ROAS math engines',
    href: '/ai-marketing-desk',
    tag: 'Interactive Tools',
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* Top Vector Deckle / Torn Paper Edge (Pure SVG - Razor Sharp at any resolution) */}
      <div className="w-full overflow-hidden leading-none select-none bg-[#0A101C] -mb-[1px]">
        <svg
          viewBox="0 0 1440 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-3 sm:h-4 lg:h-5 text-[#F6F2E9] fill-current preserve-3d"
          preserveAspectRatio="none"
        >
          <path d="M0,24 L0,12 Q30,6 60,14 T120,8 T180,16 T240,10 T300,18 T360,7 T420,15 T480,9 T540,17 T600,8 T660,16 T720,10 T780,18 T840,6 T900,15 T960,9 T1020,17 T1080,7 T1140,16 T1200,9 T1260,17 T1320,8 T1380,16 T1440,10 L1440,24 Z" />
        </svg>
      </div>

      {/* Main Strip Body (Warm Ivory `#F6F2E9`) */}
      <div className="bg-[#F6F2E9] py-4 sm:py-5 lg:py-6 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 justify-between">
            {/* Left Title with Vibrant Orange Accent Bar */}
            <div className="border-l-[4px] border-[#F28C38] pl-3.5 pr-4 shrink-0 flex flex-col justify-center">
              <span className="text-[10px] font-heading font-black tracking-widest text-[#F28C38] uppercase mb-0.5">
                DISCOVERY DECK
              </span>
              <h3 className="font-heading font-black text-sm lg:text-[15px] leading-tight text-[#0B1220] tracking-tight">
                Explore Marketing<br />
                <span className="font-bold text-[#F28C38]">from Every Angle</span>
              </h3>
            </div>

            {/* 5 Feature Items with Subtle Vertical Dividers & Hover States */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4 flex-1">
              {featureItems.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === featureItems.length - 1;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex items-start gap-3 p-1.5 rounded-lg group hover:bg-black/[0.03] transition-all ${
                      !isLast ? 'lg:border-r lg:border-[#0B1220]/15 lg:pr-3' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-white text-[#0B1220] shadow-sm group-hover:bg-[#F28C38] group-hover:text-white transition-all duration-300 group-hover:scale-105 border border-black/5">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading font-bold text-xs text-[#0B1220] group-hover:text-[#F28C38] transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#4A5568] leading-tight mt-0.5 line-clamp-2 font-normal">
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

      {/* Bottom Vector Deckle / Torn Paper Edge (Pure SVG - Razor Sharp) */}
      <div className="w-full overflow-hidden leading-none select-none bg-[#0A101C] -mt-[1px]">
        <svg
          viewBox="0 0 1440 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-3 sm:h-4 lg:h-5 text-[#F6F2E9] fill-current preserve-3d rotate-180"
          preserveAspectRatio="none"
        >
          <path d="M0,24 L0,12 Q30,6 60,14 T120,8 T180,16 T240,10 T300,18 T360,7 T420,15 T480,9 T540,17 T600,8 T660,16 T720,10 T780,18 T840,6 T900,15 T960,9 T1020,17 T1080,7 T1140,16 T1200,9 T1260,17 T1320,8 T1380,16 T1440,10 L1440,24 Z" />
        </svg>
      </div>
    </section>
  );
}
