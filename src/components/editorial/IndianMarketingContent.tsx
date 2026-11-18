'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Languages,
  Award,
  Zap,
  ShoppingBag,
  TrendingUp,
  MapPin,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

const pillars = [
  {
    icon: Languages,
    title: 'The Vernacular Revolution',
    tag: 'Regional Marketing',
    desc: 'India communicates across 22 official languages and 720+ dialects. Over 90% of new internet users consume content purely in vernacular Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi). Brands relying solely on English operate with an artificial ceiling.',
    caseStudy: 'Swiggy & ShareChat regional voice-first interfaces unlocking Tier 2 & 3 hyper-local food discovery.',
  },
  {
    icon: Sparkles,
    title: 'Festival Marketing & Auspicious Consumption',
    tag: 'Cultural Rhythm',
    desc: 'Diwali, Dhanteras, Eid, Durga Puja, Pongal, and Onam are not mere promotional events; they represent deeply ingrained cultural windows where household savings are earmarked for gold, electronics, apparel, and vehicles.',
    caseStudy: 'Tanishq "Ekatvam" & Cadbury "Iss Diwali Aap Kisse Khush Karenge" emotional storytelling linking gifting to human benevolence.',
  },
  {
    icon: Zap,
    title: 'Cricket as the National Synapse',
    tag: 'Mass Attention Monopoly',
    desc: 'The IPL (Indian Premier League) is India’s Super Bowl repeated for 60 consecutive nights. It represents the single most potent live cultural aggregator capable of creating household brand salience overnight.',
    caseStudy: 'CRED’s 2021 Rahul Dravid "Indiranagar ka gunda" campaign generating 3.2B impressions by subverting national cricketer archetypes.',
  },
  {
    icon: ShoppingBag,
    title: 'The D2C Revolution & Tier 2/3 Aspirations',
    tag: 'Commerce Transformation',
    desc: 'With ubiquitous 4G/5G, UPI digital payments processing 14B+ monthly transactions, and pan-India logistics, homegrown digital-native brands bypassed legacy distribution channels to build ₹500Cr+ empires.',
    caseStudy: 'boAt, Mamaearth, Lenskart, and Sugar Cosmetics engineering price-performance parity and hyper-aspirational lifestyle branding.',
  },
  {
    icon: HeartHandshake,
    title: 'Pricing Power & Value Perception (Paisa Vasool)',
    tag: 'Consumer Psychology',
    desc: 'Indian consumers are not cheap; they are intensely value-conscious. Sachet marketing (invented by CavinKare with Chik shampoo in the 1980s) proves that reducing unit friction unlocks mass adoption across rural Bharat.',
    caseStudy: 'Parle-G maintaining the ₹5 price point for decades through precision package grammage engineering to protect working-class affordability.',
  },
  {
    icon: MapPin,
    title: 'Bharat vs India: The Dual Consumer Economy',
    tag: 'Demographic Reality',
    desc: 'India A (top 30M affluent metropolitan households with Western spending parity) vs Bharat (the 800M+ aspirational semi-urban and rural populace demanding durability, respect, and accessible credit).',
    caseStudy: 'Fevicol’s decades-long rustic, slapstick Hindi hoardings capturing unshakeable Indian emotional bonding without uttering a word of corporate jargon.',
  },
];

const featuredBrands = [
  {
    name: 'Amul',
    slug: 'amul-girl-topical-advertising',
    established: '1946 (Anand, Gujarat)',
    model: 'Cooperative Farmer Economy',
    positioning: '"The Taste of India" — Topical socio-cultural commentary rooted in national pride.',
  },
  {
    name: 'Paper Boat',
    slug: 'paper-boat-nostalgia-marketing',
    established: '2013 (Bengaluru)',
    model: 'D2C & Omnichannel Beverage',
    positioning: 'Sensory nostalgia: liquid childhood memories packaged in modern tactile art.',
  },
  {
    name: 'boAt Lifestyle',
    slug: 'boat-youth-lifestyle-audio',
    established: '2016 (New Delhi)',
    model: 'Consumer Tech / Wearables',
    positioning: 'Democratising Gen-Z audio aspiration through Bollywood & cricket youth ambassadors.',
  },
  {
    name: 'Zomato',
    slug: 'zomato-social-media-humour',
    established: '2008 (Gurugram)',
    model: 'Quick Commerce & Food Tech',
    positioning: 'Irreverent, witty pop-culture companion speaking the authentic language of foodies.',
  },
];

export default function IndianMarketingContent() {
  return (
    <div className="space-y-20">
      {/* SECTION 1: Strategic Foundations of Indian Marketing */}
      <div>
        <div className="mb-12">
          <span className="editorial-label">Bharat Lens</span>
          <h2 className="text-display-md text-navy mt-1">
            Understanding India’s Cultural &amp; Economic DNA
          </h2>
          <p className="text-muted text-sm max-w-3xl mt-2 leading-relaxed">
            Marketing in India cannot be translated from Western textbooks. It demands an appreciation of multi-generational joint households, linguistic pride, festive seasonal windfalls, and the relentless quest for genuine value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-8 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-orange">
                      {p.tag}
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-navy/5 text-orange flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-navy mb-3">
                    {p.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="p-4 bg-orange/[0.04] border border-orange/20 rounded-sm">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-orange block mb-1">
                    Canonical Example:
                  </span>
                  <p className="text-xs text-navy/90 leading-relaxed font-medium">
                    {p.caseStudy}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Iconic Indian Brand Case Studies */}
      <div className="bg-navy text-ivory p-8 md:p-12 rounded-sm border border-white/10">
        <div className="mb-10">
          <span className="editorial-label">Masterclasses in Brand Salience</span>
          <h2 className="text-display-md text-ivory mt-1">
            Iconic Indian Case Studies
          </h2>
          <p className="text-muted text-sm max-w-2xl mt-2 leading-relaxed">
            How quintessential Indian brands navigated shifting economic reforms, digital disruption, and multi-generational loyalty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.name}
              href={`/campaigns/${brand.slug}`}
              className="group bg-navy-light/40 border border-white/10 hover:border-orange/60 p-6 rounded-sm transition-all duration-300 block"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-heading font-bold text-ivory group-hover:text-orange transition-colors flex items-center gap-2">
                  <span>{brand.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-orange" />
                </h3>
                <span className="text-[11px] font-mono text-orange">
                  {brand.established}
                </span>
              </div>
              <p className="text-xs text-muted mb-4 font-body">
                <strong className="text-ivory">Business Model:</strong> {brand.model}
              </p>
              <p className="text-xs text-ivory/80 leading-relaxed border-t border-white/5 pt-4">
                <strong className="text-orange block mb-1">Positioning Insight:</strong>
                {brand.positioning}
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-heading font-semibold text-orange">
                <span>Read Full 13-Point Teardown</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            Explore deep-dive 13-point breakdowns of individual Indian campaigns.
          </p>
          <Link href="/campaigns?category=indian" className="btn-primary text-xs py-3 px-6 whitespace-nowrap">
            View Indian Case Studies in Archive →
          </Link>
        </div>
      </div>
    </div>
  );
}
