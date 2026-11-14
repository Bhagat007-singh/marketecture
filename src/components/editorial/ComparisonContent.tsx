'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitSquareVertical, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface ComparisonData {
  id: string;
  category: string;
  brandA: {
    name: string;
    origin: string;
    tagline: string;
    positioning: string;
    audience: string;
    communication: string;
    pricing: string;
    distribution: string;
    digitalPresence: string;
  };
  brandB: {
    name: string;
    origin: string;
    tagline: string;
    positioning: string;
    audience: string;
    communication: string;
    pricing: string;
    distribution: string;
    digitalPresence: string;
  };
  strategicTakeaway: string;
}

const matchupsData: ComparisonData[] = [
  {
    id: 'amul-vs-ben-jerrys',
    category: 'Dairy & Confectionery',
    brandA: {
      name: 'Amul',
      origin: 'India (Gujarat Cooperative)',
      tagline: 'The Taste of India',
      positioning: 'Nation-building cooperative staple delivering accessible, pure dairy to every socioeconomic strata.',
      audience: 'Mass Indian households across Metros, Tier 2/3/4 towns and rural families.',
      communication: 'Topical outdoor hoardings and social cartoons reacting to real-time national news with puns.',
      pricing: 'Hyper-competitive value pricing protected by cooperative supply chain efficiencies.',
      distribution: 'Ubiquitous cold-chain network of 10,000+ exclusive Amul Parlours and millions of kirana stores.',
      digitalPresence: 'High-engagement topical cartoon posts on Instagram/X and direct-to-consumer dairy portal.',
    },
    brandB: {
      name: "Ben & Jerry's",
      origin: 'USA (Unilever Subsidiary)',
      tagline: 'Peace, Love & Ice Cream',
      positioning: 'Chunky super-premium activist indulgence committed to progressive social justice and sustainability.',
      audience: 'Affluent urban millennials and Gen-Z consumers prioritizing ethical ingredient sourcing.',
      communication: 'Overt social and political advocacy campaigns (climate justice, racial equity, voting rights).',
      pricing: 'High-margin premium pricing ($6–$8 per pint) reflecting Fairtrade ingredients and brand halo.',
      distribution: 'Supermarket freezer aisle dominance, branded scoop shops, and quick-commerce dark stores.',
      digitalPresence: 'Thought-leadership essays, activist petition landing pages, and values-driven storytelling.',
    },
    strategicTakeaway:
      'While Ben & Jerry\'s monetizes ideological alignment and premium indulgence in the West, Amul anchors itself in unpretentious national pride, affordability, and wit. Both prove that brand longevity requires deep cultural alignment rather than mere functional product claims.',
  },
  {
    id: 'boat-vs-beats',
    category: 'Consumer Lifestyle Audio',
    brandA: {
      name: 'boAt',
      origin: 'India (D2C / Hardware)',
      tagline: 'Do What Floats Your boAt',
      positioning: 'Democratised bass-heavy lifestyle tech engineered for young, aspirational Indian digital natives.',
      audience: 'College students, first-time salary earners, and Tier 2/3 youth wanting stylish wearables.',
      communication: 'Fast-paced Bollywood & IPL cricketer brand ambassadors, aggressive festive discounting.',
      pricing: 'Accessible sweet-spot pricing (₹999 – ₹2,999) delivering 80% of premium aesthetic at 20% of the price.',
      distribution: 'Aggressive dominance on Amazon India/Flipkart complemented by widespread offline electronics retail.',
      digitalPresence: 'Meme-heavy social media, influencer gifting loops, and performance remarketing ads.',
    },
    brandB: {
      name: 'Beats by Dre',
      origin: 'USA (Apple Subsidiary)',
      tagline: 'Hear What You Want',
      positioning: 'High-status cultural badge bridging hip-hop street cred, NBA athlete swagger, and fashion athleisure.',
      audience: 'Global youth, trendsetters, music purists, and high-income style-conscious urbanites.',
      communication: 'Cinematic mini-films directed by Hollywood auteurs featuring world-class athletes (LeBron, Neymar).',
      pricing: 'Luxury high-margin price band ($199 – $349) positioned right beneath Apple AirPods Max.',
      distribution: 'Apple Store ecosystem, high-end electronics boutiques, and luxury fashion retailers.',
      digitalPresence: 'High-production YouTube video anthems, celebrity music video product placements.',
    },
    strategicTakeaway:
      'Beats captured global cultural imagination by transforming commodity plastic headphones into a $300 status symbol through celebrity aura. boAt reverse-engineered this playbook for India: taking the lifestyle aesthetic and democratising it for price-sensitive young Indians through rapid D2C execution.',
  },
  {
    id: 'flipkart-vs-amazon',
    category: 'E-Commerce Ecosystems',
    brandA: {
      name: 'Flipkart',
      origin: 'India (Walmart-backed)',
      tagline: 'Ab Har Wish Hogi Poori',
      positioning: 'Homegrown e-commerce powerhouse built to solve Indian retail friction: Cash on Delivery and vernacular ease.',
      audience: 'Broad Indian populace, with deep, defensible penetration in Tier 2 and Tier 3 heartlands.',
      communication: 'Relatable slice-of-life humor, the iconic "Flipkart Kids as Adults" commercials, Big Billion Days frenzy.',
      pricing: 'Aggressive value pricing, exchange bonuses, festive bank tie-ups, and No-Cost EMI financing.',
      distribution: 'Ekart in-house logistics reaching deep pincodes with local hub-and-spoke delivery personnel.',
      digitalPresence: 'Gamified mobile app with daily quizzes, vernacular language toggle, and video commerce.',
    },
    brandB: {
      name: 'Amazon',
      origin: 'USA / Global',
      tagline: 'Work Hard. Have Fun. Make History.',
      positioning: 'The "Everything Store" built on the customer-obsession flywheel: selection, convenience, and low prices.',
      audience: 'Global suburban and urban households seeking frictionless fulfillment and bundled services.',
      communication: 'Customer testimonial realism ("Apni Dukan"), Prime ecosystem benefits, and holiday deal events.',
      pricing: 'Algorithmic dynamic pricing matching or beating competitor prices automatically across catalog.',
      distribution: 'World-class robotics-enabled fulfillment centers, air cargo fleet, and lock-box pickup stations.',
      digitalPresence: 'Clean high-utility desktop and mobile interface integrated with Prime Video and AWS infrastructure.',
    },
    strategicTakeaway:
      'Amazon wins through systematic institutional reliability and ecosystem lock-in (Prime). Flipkart won Indian loyalty by inventing Cash-on-Delivery, speaking regional colloquial dialects, and turning annual festive shopping into a national carnival.',
  },
  {
    id: 'swiggy-vs-doordash',
    category: 'Hyper-Local Logistics',
    brandA: {
      name: 'Swiggy',
      origin: 'India (Bengaluru)',
      tagline: 'Swiggy Karo, Phir Jo Chahe Karo',
      positioning: 'Comprehensive urban convenience concierge: from restaurant food and Instamart groceries to Genie courier.',
      audience: 'Time-poor urban professionals, dual-income households, and impulse late-night snackers.',
      communication: 'Quirky relatable slice-of-life TVCs (Gulab Jamun uncle, office lunch dilemmas) and meme CRM.',
      pricing: 'Dynamic delivery fee tiers with Swiggy One subscription bundling food and quick commerce.',
      distribution: 'Dense 2-wheeler rider fleet navigating crowded Indian city traffic within 10–30 minutes.',
      digitalPresence: 'Highly gamified app with live GPS tracking, AI food recommendations, and chat support.',
    },
    brandB: {
      name: 'DoorDash',
      origin: 'USA (San Francisco)',
      tagline: 'Your Door to More',
      positioning: 'Logistics engine powering local commerce, connecting suburban American families to favorite neighborhood eateries.',
      audience: 'Suburban American families, remote tech workers, and busy commuters seeking dinner delivery.',
      communication: 'High-production Super Bowl advertisements ("All the Ads") celebrating neighborhood restaurants.',
      pricing: 'Premium delivery & service fee structure cushioned by DashPass subscription discount program.',
      distribution: 'Automobile delivery driver ("Dasher") network optimized for sprawling American suburbia.',
      digitalPresence: 'Streamlined mobile app integrating grocery pickups, retail orders, and store-facing SaaS tools.',
    },
    strategicTakeaway:
      'DoorDash conquered American suburbia where automobile transit costs are high and restaurant margins are thin. Swiggy mastered high-density Indian urban centers with two-wheelers, rapidly evolving into a full-scale quick commerce powerhouse (Instamart).',
  },
  {
    id: 'zomato-vs-ubereats',
    category: 'Food Tech & Discovery',
    brandA: {
      name: 'Zomato',
      origin: 'India (Gurugram)',
      tagline: 'Never Have a Bad Meal',
      positioning: 'Pop-culture foodie companion combining restaurant discovery, food delivery, and dining out entertainment.',
      audience: 'Urban youth, food enthusiasts, and young professionals who treat eating as lifestyle and culture.',
      communication: 'Witty push notifications, billboard wordplay wars, and authentic social media interactions.',
      pricing: 'Zomato Gold membership offering dining out discounts and free delivery perks.',
      distribution: 'Hyper-local fleet of delivery partners across 500+ Indian cities and towns.',
      digitalPresence: 'Viral Instagram page, self-deprecating memes, and founder-led public communication.',
    },
    brandB: {
      name: 'Uber Eats',
      origin: 'USA (Uber Technologies)',
      tagline: 'Get Almost, Almost Anything',
      positioning: 'Seamless transactional food delivery riding on the existing global ride-hailing driver and payment network.',
      audience: 'Existing Uber rideshare passengers seeking frictionless meal delivery in global metropolitan hubs.',
      communication: 'Celebrity ensemble spots ("Tonight I’ll be eating...") blending pop-culture humor with easy ordering.',
      pricing: 'Integrated Uber One membership sharing perks across mobility and food delivery.',
      distribution: 'Dual-purpose driver network switching between passenger transport and meal drop-offs.',
      digitalPresence: 'Clean, frictionless single-app experience deeply integrated with Apple Pay and Google Pay.',
    },
    strategicTakeaway:
      'Uber Eats treated food delivery as an efficient algorithmic extension of rideshare logistics. Zomato treated food as an emotional cultural passion. In India, Zomato\'s deep emotional connection led them to ultimately acquire Uber Eats\' Indian business outright in 2020.',
  },
];

export default function ComparisonContent() {
  const [selectedMatchup, setSelectedMatchup] = useState<ComparisonData>(matchupsData[0]);

  return (
    <div className="space-y-16">
      {/* Matchup Selection Pills */}
      <div>
        <span className="editorial-label block mb-4">Select Strategic Matchup</span>
        <div className="flex flex-wrap gap-3">
          {matchupsData.map((m) => {
            const isSelected = selectedMatchup.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMatchup(m)}
                className={`px-5 py-3 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-orange text-white shadow-lg shadow-orange/20 border-orange'
                    : 'bg-white text-navy/80 border border-navy/10 hover:border-orange/50 hover:text-navy'
                }`}
              >
                <span>{m.brandA.name}</span>
                <span className="text-[10px] opacity-75 font-mono">vs</span>
                <span>{m.brandB.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparative Battlecard */}
      <div className="bg-white rounded-sm border border-navy/15 overflow-hidden shadow-xl">
        {/* Battlecard Header */}
        <div className="bg-navy text-ivory p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-orange block mb-2">
              Category: {selectedMatchup.category}
            </span>
            <h2 className="text-display-md text-ivory font-bold">
              {selectedMatchup.brandA.name} <span className="text-orange">vs</span> {selectedMatchup.brandB.name}
            </h2>
          </div>
          <div className="px-4 py-2 rounded bg-white/10 border border-white/15 text-xs text-muted font-heading uppercase tracking-wider">
            Comparative Matrix Breakdown
          </div>
        </div>

        {/* Side-by-Side Brand Column Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-navy/10 border-b border-navy/10 bg-ivory/50">
          <div className="p-6 md:p-8">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block mb-1">
              Indian Benchmark
            </span>
            <h3 className="text-2xl font-heading font-bold text-navy mb-1">
              {selectedMatchup.brandA.name}
            </h3>
            <p className="text-xs text-muted font-mono mb-2">
              Origin: {selectedMatchup.brandA.origin}
            </p>
            <p className="text-xs font-heading italic text-navy/80">
              &ldquo;{selectedMatchup.brandA.tagline}&rdquo;
            </p>
          </div>

          <div className="p-6 md:p-8">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-navy/60 block mb-1">
              Global Counterpart
            </span>
            <h3 className="text-2xl font-heading font-bold text-navy mb-1">
              {selectedMatchup.brandB.name}
            </h3>
            <p className="text-xs text-muted font-mono mb-2">
              Origin: {selectedMatchup.brandB.origin}
            </p>
            <p className="text-xs font-heading italic text-navy/80">
              &ldquo;{selectedMatchup.brandB.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Dimensions Comparison Rows */}
        <div className="divide-y divide-navy/10 text-xs">
          {/* 1. Brand Positioning */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Brand Positioning
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.positioning}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.positioning}
            </div>
          </div>

          {/* 2. Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Target Audience
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.audience}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.audience}
            </div>
          </div>

          {/* 3. Marketing Communication */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Marketing Communication
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.communication}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.communication}
            </div>
          </div>

          {/* 4. Pricing Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Pricing Strategy
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.pricing}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.pricing}
            </div>
          </div>

          {/* 5. Distribution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Distribution Architecture
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.distribution}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.distribution}
            </div>
          </div>

          {/* 6. Digital & CRM Presence */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 hover:bg-navy/[0.01] transition-colors">
            <div className="md:col-span-3 font-heading font-bold uppercase text-navy/80 mb-2 md:mb-0">
              Digital &amp; Social Posture
            </div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed pr-4 mb-4 md:mb-0">
              {selectedMatchup.brandA.digitalPresence}
            </div>
            <div className="hidden md:block md:col-span-1 text-center text-muted">•</div>
            <div className="md:col-span-4 text-navy/90 leading-relaxed">
              {selectedMatchup.brandB.digitalPresence}
            </div>
          </div>
        </div>

        {/* Editorial Takeaway Panel */}
        <div className="p-8 bg-orange/[0.05] border-t border-orange/20">
          <div className="flex items-center gap-2 mb-2 text-orange font-heading font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Editorial Synthesis &amp; Strategic Verdict
          </div>
          <p className="text-sm text-navy/85 leading-relaxed font-medium">
            {selectedMatchup.strategicTakeaway}
          </p>
        </div>
      </div>

      {/* Editorial Disclaimer */}
      <div className="p-6 bg-white border border-navy/10 rounded-sm text-xs text-muted flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-orange shrink-0 mt-0.5" />
        <p>
          <strong className="text-navy">Editorial Rigor Notice:</strong> All comparative matrices are synthesized from audited financial disclosures, published case studies, and publicly observable advertising campaigns. Marketecture does not present qualitative strategic assessments as verified institutional truths.
        </p>
      </div>
    </div>
  );
}
