'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe,
  Compass,
  Sparkles,
  ShieldAlert,
  Shuffle,
  Layers,
  ArrowRight,
} from 'lucide-react';

const globalTopics = [
  {
    icon: Compass,
    title: 'The Standardization vs Adaptation Paradox',
    category: 'Global Architecture',
    desc: 'The defining strategic dilemma of multinational CMOs: should a brand impose a uniform global identity to harvest economies of scale, or fragment creative execution to reflect local cultural idiosyncrasies?',
    breakdown: [
      'Glocal Principle: Think Global, Act Local.',
      'Core Brand Code: Preserve the sacred brand essence (colours, logo, sonic branding, moral posture).',
      'Flexible Execution: Adapt flavour profiles, casting, cultural idioms, and local media platforms.',
    ],
    brandExample: 'McDonald’s: The Golden Arches & service standards remain uniform worldwide, but the menu adapts: McSpicy Paneer in India, Teriyaki Burger in Japan, Wine in France.',
  },
  {
    icon: Globe,
    title: 'Cross-Cultural Semiotics & Taboo Management',
    category: 'Cultural Intelligence',
    desc: 'Visual symbols, gestures, and linguistic idioms carry radically opposing connotations across borders. What signifies victory or purity in the West can represent death or mourning in the East.',
    breakdown: [
      'High-Context vs Low-Context Cultures (Hall): Direct explicit copy vs subtle ambient storytelling.',
      'Individualism vs Collectivism (Hofstede): Hero individual vs harmonious community belonging.',
      'Naming Linguistic Audits: Preventing fatal phonetic translation errors in foreign alphabets.',
    ],
    brandExample: 'KFC’s famous blunder translating "Finger-lickin\' good" into Chinese as "Eat your fingers off," later resolved into a hyper-localized Chinese breakfast and delivery empire.',
  },
  {
    icon: Sparkles,
    title: 'The Architecture of Global Mega-Brands',
    category: 'Brand Equity',
    desc: 'How icons like Apple, Nike, Coca-Cola, and IKEA command worldwide pricing power and cognitive monopoly by transcending functional product specifications.',
    breakdown: [
      'Universal Human Archetypes: Tapping into universal myths of triumph, connection, and self-expression.',
      'Design Language as Global Esperanto: Intuitive, minimalist industrial aesthetics requiring zero translation.',
      'Global Tentpole Moments: Leveraging Olympics, FIFA World Cup, and Super Bowl for worldwide synchronized reach.',
    ],
    brandExample: 'IKEA: Flat-pack functional democracy. Democratic design principles that solve compact urban living constraints identically in Stockholm, Tokyo, London, and Mumbai.',
  },
  {
    icon: Shuffle,
    title: 'Cross-Border Digital Ecosystems & Super-Apps',
    category: 'Digital Landscape',
    desc: 'The global digital landscape is fractured. Western marketers accustomed to Google/Meta/Amazon face entirely disparate walled gardens in Asia, Latin America, and Africa.',
    breakdown: [
      'China: WeChat & Douyin ecosystem blending messaging, social commerce, and payments into one super-app.',
      'Latin America: Mercado Libre leading e-commerce and fintech.',
      'Southeast Asia: Grab & GoTo dominating mobility, logistics, and food delivery.',
    ],
    brandExample: 'Nike collaborating directly inside WeChat Mini-Programs to orchestrate localized drop culture and member-only sneaker raffles in mainland China.',
  },
];

const globalCaseSnapshots = [
  {
    brand: 'Coca-Cola',
    campaign: '"Open Happiness" & "Share a Coke"',
    reach: '200+ Countries',
    insight: 'Positioning carbonated sugar water as the universal currency of optimism and human reconciliation.',
  },
  {
    brand: 'Nike',
    campaign: '"Find Your Greatness" (London 2012)',
    reach: 'Global Non-Sponsor Ambush',
    insight: 'By celebrating everyday athletes in everyday towns named London (London, Ohio; London, Nigeria), Nike outperformed the official multi-million dollar Olympic sponsor.',
  },
  {
    brand: 'Dove (Unilever)',
    campaign: '"Real Beauty" Evolution',
    reach: 'Worldwide Platform',
    insight: 'Overturning toxic cosmetic industry ideals to champion authentic body diversity, building a $5B+ purpose-led brand.',
  },
];

export default function GlobalMarketingContent() {
  return (
    <div className="space-y-20">
      {/* SECTION 1: Strategic Perspectives */}
      <div>
        <div className="mb-12">
          <span className="editorial-label">International Frameworks</span>
          <h2 className="text-display-md text-navy mt-1">
            Navigating Transnational Brand Strategy
          </h2>
          <p className="text-muted text-sm max-w-3xl mt-2 leading-relaxed">
            True global marketing is not about exporting a domestic campaign with subtitles. It is the mastery of cultural anthropology, global media ecosystems, and universal human desires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {globalTopics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-orange">
                      {item.category}
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-navy/5 text-orange flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5 p-4 bg-navy/[0.02] border border-navy/5 rounded-sm mb-6">
                    {item.breakdown.map((b) => (
                      <p key={b} className="text-xs text-navy/80">
                        • {b}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-orange/[0.04] border border-orange/20 rounded-sm">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-orange block mb-1">
                    Canonical Benchmark:
                  </span>
                  <p className="text-xs text-navy/90 leading-relaxed font-medium">
                    {item.brandExample}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Global Case Snapshots */}
      <div className="bg-navy text-ivory p-8 md:p-12 rounded-sm border border-white/10">
        <div className="mb-10">
          <span className="editorial-label">Global Benchmarks</span>
          <h2 className="text-display-md text-ivory mt-1">
            Global Campaigns That Transcended Borders
          </h2>
          <p className="text-muted text-sm max-w-2xl mt-2 leading-relaxed">
            Deconstructing how these creative platforms traveled across continents without losing strategic velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {globalCaseSnapshots.map((cs) => (
            <div
              key={cs.brand}
              className="bg-navy-light/40 border border-white/10 p-6 rounded-sm hover:border-orange/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-orange block mb-1">
                  {cs.reach}
                </span>
                <h3 className="text-xl font-heading font-bold text-ivory mb-1">
                  {cs.brand}
                </h3>
                <h4 className="text-xs font-heading font-medium text-ivory/80 mb-4">
                  {cs.campaign}
                </h4>
                <p className="text-xs text-muted leading-relaxed border-t border-white/5 pt-4">
                  {cs.insight}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            Explore complete 13-point global case studies with creative executions.
          </p>
          <Link href="/campaigns" className="btn-primary text-xs py-3 px-6 whitespace-nowrap">
            View Global Campaigns in Archive →
          </Link>
        </div>
      </div>
    </div>
  );
}
