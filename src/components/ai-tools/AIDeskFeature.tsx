'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Compass,
  Lightbulb,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Zap,
  Flame,
  Award,
} from 'lucide-react';

interface CaseStudyItem {
  brand: string;
  logo: string;
  title: string;
  slug: string;
  tag: string;
  metric: string;
  snippet: string;
  keywords: string[];
}

const getAssetPath = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const base = (typeof process !== 'undefined' && process?.env?.NEXT_PUBLIC_BASE_PATH) || '';
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
};

const CASE_STUDIES: CaseStudyItem[] = [
  {
    brand: 'Blinkit',
    logo: '/images/brand-logos/blinkit.png',
    title: '10-Minute Delivery & Viral Billboard Banter',
    slug: '/campaigns/blinkit-quick-commerce-topical-marketing',
    tag: 'Quick Commerce • Indian',
    metric: '10-Min SLA • $13B+ Valuation',
    snippet:
      'How Blinkit shifted urban Indian grocery habits from weekly planning to on-demand instant gratification, sparking nationwide viral billboard parodies with parent Zomato.',
    keywords: ['blinkit', 'quick commerce', 'grocery', 'delivery', 'billboard', 'zomato', 'dark store', 'impulse', 'speed', 'convenience', 'indian'],
  },
  {
    brand: 'Zomato',
    logo: '/images/brand-logos/zomato.png',
    title: 'Conversational Humour & Push Notification Dominance',
    slug: '/campaigns/zomato-social-media-humour',
    tag: 'Food Tech • Indian Viral Growth',
    metric: '+142% Organic SOV',
    snippet:
      'Deconstructing how Zomato transformed mundane app notifications and social feeds into culturally attuned, self-deprecating meme entertainment.',
    keywords: ['zomato', 'food', 'delivery', 'notifications', 'crm', 'memes', 'humour', 'social media', 'billboards', 'viral', 'indian'],
  },
  {
    brand: 'Amul',
    logo: '/images/brand-logos/amul.jpg',
    title: 'The Amul Girl: 58+ Years of Topical Hoardings',
    slug: '/campaigns/amul-girl-topical-advertising',
    tag: 'Dairy FMCG • Cultural Icon',
    metric: '58+ Years Daily Relevance',
    snippet:
      'The longest-running advertising campaign in history: how a blue-haired girl in polka dots became the witty sociopolitical conscience of a nation.',
    keywords: ['amul', 'butter', 'dairy', 'topical', 'ooh', 'hoardings', 'satire', 'puns', 'fmcg', 'heritage', 'indian'],
  },
  {
    brand: 'Apple',
    logo: '/images/brand-logos/apple.png',
    title: '"Think Different" & The Alchemy of Brand Salvation',
    slug: '/campaigns/apple-think-different-comeback',
    tag: 'Consumer Tech • Global Comeback',
    metric: '$3T Cultural Equity',
    snippet:
      '90 days from bankruptcy in 1997, Steve Jobs launched an ad campaign without featuring a single computer, reminding the world what Apple stands for.',
    keywords: ['apple', 'think different', 'steve jobs', 'branding', 'positioning', 'comeback', 'rebellion', 'tech', 'global'],
  },
  {
    brand: 'Nike',
    logo: '/images/brand-logos/apple.png', // Fallback or logo
    title: 'The 35-Year Evolution of "Just Do It"',
    slug: '/campaigns/nike-just-do-it-evolution',
    tag: 'Athletics • Global Ethos',
    metric: '18x Revenue Growth',
    snippet:
      'How Dan Wieden and Nike transformed athletic footwear into an emotional, moral imperative celebrating human willpower and overcoming self-doubt.',
    keywords: ['nike', 'just do it', 'sports', 'athletic', 'heroism', 'emotional branding', 'willpower', 'global'],
  },
  {
    brand: 'Paper Boat',
    logo: '/images/brand-logos/zomato.png',
    title: 'Sensory Memory & Childhood Nostalgia Branding',
    slug: '/campaigns/paper-boat-nostalgia-marketing',
    tag: 'Beverage FMCG • Indian D2C',
    metric: '3x Premium vs Colas',
    snippet:
      'Hector Beverages bypassed the multinational soda giants by bottling traditional Indian summer memories in tactile, poetic pouches.',
    keywords: ['paper boat', 'nostalgia', 'childhood', 'drinks', 'packaging', 'pouch', 'beverages', 'storytelling', 'indian'],
  },
  {
    brand: 'boAt',
    logo: '/images/brand-logos/uploaded-logo.png',
    title: 'Building a Youth-Centred Lifestyle Audio Brand',
    slug: '/campaigns/boat-youth-lifestyle-audio',
    tag: 'Consumer Tech • D2C Audio',
    metric: '360M+ Impressions • India #1 Audio',
    snippet:
      'How Aman Gupta and boAt turned sterile audio gear into a badge of streetwear and youth identity, building a community of millions of boAtheads.',
    keywords: ['boat', 'audio', 'headphones', 'earphones', 'lifestyle', 'd2c', 'cricket', 'rcb', 'lost in nirvana', 'indian', 'youth'],
  },
  {
    brand: 'Zepto',
    logo: '/images/brand-logos/blinkit.png',
    title: 'Marketing Speed in India’s Quick-Commerce Market',
    slug: '/campaigns/zepto-quick-commerce-speed',
    tag: 'Quick Commerce • Urban Logistics',
    metric: '10-Min Delivery • 2.4x Conversion Growth',
    snippet:
      'How Zepto turned grocery speed into an uncompromising consumer habit through dark-store proximity and viral social-to-billboard cultural stunts.',
    keywords: ['zepto', 'speed', 'quick commerce', 'delivery', 'dark store', 'manyavar', 'wedding', 'grocery', 'indian'],
  },
  {
    brand: 'Inshorts',
    logo: '/images/brand-logos/apple.png',
    title: 'Turning News Brevity into a Digital Product',
    slug: '/campaigns/inshorts-news-brevity-product',
    tag: 'Digital Media • Product-Led UX',
    metric: '60 Words • 10M+ Public App Users',
    snippet:
      'How three IIT students transformed mobile news consumption by constraining every story to 60 words, creating an addictive swipeable habit loop and native ad engine.',
    keywords: ['inshorts', 'news', 'brevity', '60 words', 'native ads', 'media', 'swipe', 'public app', 'indian'],
  },
];

const PRESET_QUERIES = [
  'Quick commerce & food delivery (Blinkit & Zomato)',
  'Topical ads & viral street billboards (Amul & Zomato)',
  'Brand salvation & bold positioning (Apple & Nike)',
  'Nostalgia marketing & packaging storytelling (Paper Boat)',
];

export default function AIDeskFeature() {
  const [activeTab, setActiveTab] = useState<'finder' | 'analyzer' | 'tips'>('finder');

  // Finder State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CaseStudyItem[]>(CASE_STUDIES.slice(0, 4));

  // Analyzer State
  const [analyzedBrand, setAnalyzedBrand] = useState('Blinkit');
  const [customBrand, setCustomBrand] = useState('');
  const [targetAudience, setTargetAudience] = useState('Urban Gen Z & Busy Professionals');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Tips State
  const [tipBrand, setTipBrand] = useState('Blinkit');
  const [tipObjective, setTipObjective] = useState('Viral Push Notification & Social Hooks');
  const [tipsResult, setTipsResult] = useState<string | null>(null);
  const [generatingTips, setGeneratingTips] = useState(false);
  const [copied, setCopied] = useState(false);

  // Search filter logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(CASE_STUDIES.slice(0, 4));
      return;
    }
    const q = query.toLowerCase();
    const filtered = CASE_STUDIES.filter((c) =>
      c.brand.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.snippet.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.includes(q))
    );
    setSearchResults(filtered.length > 0 ? filtered : CASE_STUDIES.slice(0, 2));
  };

  // Run Brand Strategy Analysis
  const runAnalysis = () => {
    const brand = customBrand.trim() || analyzedBrand;
    setAnalyzing(true);
    setTimeout(() => {
      let analysis = '';
      if (brand.toLowerCase().includes('blinkit')) {
        analysis = `
### ⚡ Brand Architecture: **Blinkit**
- **Core Cultural Tension**: Urban Indian consumers experience acute micro-crises (sudden lack of milk for morning tea, missing dinner ingredients) where standard e-commerce delivery (2-24 hours) causes unbearable household friction.
- **Kotlerian STP Positioning**: 
  - *Segment*: Dual-income households, Gen-Z creators, and young urban working professionals in Tier 1-2 metros.
  - *Target*: Consumers who value 10 minutes of saved time significantly higher than small price discounts.
  - *Positioning*: "The Instant Extension of Your Refrigerator & Emergency Pantry".
- **Primary Growth Levers**: Hyper-local dark store density (sub-2km delivery radius), cross-pollinated street hoardings with parent Zomato, and high-frequency seasonal spikes (10-minute gold coins during Dhanteras, emergency iPhone deliveries).
- **Competitive Moat**: High order density per square kilometer lowering delivery cost per drop; compounding habit loops that replace weekly supermarket trips with daily micro-orders.
        `;
      } else if (brand.toLowerCase().includes('zomato')) {
        analysis = `
### 🍔 Brand Architecture: **Zomato**
- **Core Cultural Tension**: Food is an intensely emotional, social, and guilty indulgence. Traditional corporate promotional emails feel intrusive and salesy.
- **Kotlerian STP Positioning**:
  - *Segment*: Digital-native food lovers aged 18–35.
  - *Target*: Urbanites experiencing mid-day work boredom, late-night hunger, or celebratory cricket cravings.
  - *Positioning*: "The Irreverent Foodie Best Friend Who Understands Your Cravings".
- **Primary Growth Levers**: Contextual lock-screen micro-poetry timed to physiological hunger triggers (12:45 PM lunch, 4:00 PM chai, 11:30 PM dessert); self-deprecating meme marketing that users screenshot and share organically.
- **Competitive Moat**: Near-zero customer acquisition cost for new campaigns due to organic social share-of-voice and strong network effects across millions of active restaurant partners.
        `;
      } else if (brand.toLowerCase().includes('amul')) {
        analysis = `
### 🧈 Brand Architecture: **Amul**
- **Core Cultural Tension**: Rapid political, cultural, and sports developments in India require a neutral, beloved lens that unites rather than divides public sentiment.
- **Kotlerian STP Positioning**:
  - *Segment*: Mass Indian households across all socioeconomic strata.
  - *Target*: Every Indian breakfast table from tier-1 metros to rural towns.
  - *Positioning*: "The Taste of India — The Nation's Gentle, Butterly Conscience".
- **Primary Growth Levers**: 58+ years of uninterrupted topical billboards reacting to national news within 24 hours with pun-filled illustrations; farmer cooperative ownership structure building generational trust.
- **Competitive Moat**: Over 85% branded butter market share achieved with less than 1% revenue spent on paid advertising; unmatched distribution reach across millions of cold-chain retail points.
        `;
      } else if (brand.toLowerCase().includes('apple')) {
        analysis = `
### 🍎 Brand Architecture: **Apple**
- **Core Cultural Tension**: Technology was traditionally sold on confusing, utilitarian specifications (megahertz, RAM, floppy drives) that stripped computing of humanity and artistic soul.
- **Kotlerian STP Positioning**:
  - *Segment*: Creative professionals, designers, innovators, and premium lifestyle consumers.
  - *Target*: Non-conformists who view tools as an extension of their personal creativity and identity.
  - *Positioning*: "Tools for the Crazy Ones Who Change the World".
- **Primary Growth Levers**: Values-first emotional brand platforms (Think Different) paired with closed hardware-software ecosystem integration, minimalist product design, and architectural flagship stores.
- **Competitive Moat**: Unmatched pricing power, customer lifetime loyalty, and an aspirational status symbol that transcends functional computing.
        `;
      } else if (brand.toLowerCase().includes('boat')) {
        analysis = `
### 🎧 Brand Architecture: **boAt**
- **Core Cultural Tension**: Personal audio was dominated by expensive global brands speaking in technical jargon (driver size, impedance) or cheap, fragile grey-market earphones.
- **Kotlerian STP Positioning**:
  - *Segment*: College students, young professionals, and Gen-Z music lovers aged 16–28.
  - *Target*: Youth seeking premium-looking bass-heavy tech accessories under ₹2,000.
  - *Positioning*: "Make Personal Technology Part of Youth Identity — The boAthead Lifestyle".
- **Primary Growth Levers**: Music & sports culture alignments ('Lost in Nirvana' with 360M+ impressions, RCB IPL gamification with 78M impressions), youth celebrity endorsers (Hardik Pandya, Kiara Advani), and overwhelming marketplace review moats on Amazon and Flipkart.
- **Competitive Moat**: Community affinity and volume leadership in Indian earwear, combined with rapid product design turnaround and low consumer price resistance.
        `;
      } else if (brand.toLowerCase().includes('zepto')) {
        analysis = `
### ⚡ Brand Architecture: **Zepto**
- **Core Cultural Tension**: Planning grocery runs or waiting 24–48 hours for e-commerce deliveries causes severe household friction during emergency shortage moments.
- **Kotlerian STP Positioning**:
  - *Segment*: Busy double-income couples, students, and urban households in top metros.
  - *Target*: High-urgency shoppers who prioritize immediate convenience over minor price discounts.
  - *Positioning*: "Speed is the Promise, Convenience is the Habit — 10 Minutes Flat".
- **Primary Growth Levers**: Dark store proximity (sub-2km delivery radius), 90-second picking SLAs, and viral real-time cultural OOH hoardings (e.g. Manyavar wedding billboard generating 250+ brand reactions in 24 hours).
- **Competitive Moat**: Micro-warehouse spatial density and hyper-optimized route density per square kilometer that competitors cannot easily duplicate without massive capex.
        `;
      } else if (brand.toLowerCase().includes('inshorts')) {
        analysis = `
### 📰 Brand Architecture: **Inshorts**
- **Core Cultural Tension**: Infinite social media feeds, long clickbait articles, and cognitive news fatigue overwhelm modern mobile-first readers.
- **Kotlerian STP Positioning**:
  - *Segment*: Digitally native youth, competitive exam aspirants, and corporate professionals.
  - *Target*: Time-poor individuals who want to stay informed in under 3 minutes per day.
  - *Positioning*: "A Quick News Format Built for Mobile Attention — 60 Words, One Story".
  - *Primary Growth Levers*: Product-led UX virality (swipe-up gesture, clean cards), high-CTR native sponsored cards, and regional video expansion via Public (10M users in 6 months).
- **Competitive Moat**: Habitual muscle-memory retention (5–10 daily app sessions) paired with a high-margin native advertising inventory that respects reader attention.
        `;
      } else {
        analysis = `
### 🎯 Brand Architecture: **${brand}**
- **Core Cultural Tension**: In the ${targetAudience} category, buyers are inundated with identical feature claims and price discounting, creating choice paralysis and zero emotional brand loyalty.
- **Kotlerian STP Positioning**:
  - *Target*: High-intent segments within ${targetAudience} seeking clarity, premium execution, and status enhancement.
  - *Value Proposition*: Moving beyond utilitarian product features to articulate a bold point of view on culture and efficiency.
- **Primary Growth Levers**: 
  1. *Owned Narrative*: Transform customer touchpoints (onboarding emails, product packaging, social feeds) into distinctive media channels.
  2. *Topical Distribution*: Capitalize on industry tension and cultural conversations to earn high organic share-of-voice.
- **Competitive Moat**: Brand personality and defensible positioning that competitors cannot replicate with paid advertising alone.
        `;
      }
      setAnalysisResult(analysis.trim());
      setAnalyzing(false);
    }, 450);
  };

  // Run Marketing Tips & Hooks Generator
  const runTips = () => {
    const brand = customBrand.trim() || tipBrand;
    setGeneratingTips(true);
    setTimeout(() => {
      let tips = '';
      if (brand.toLowerCase().includes('blinkit')) {
        tips = `
### 🚀 Actionable Marketing Playbook & Viral Hooks for **Blinkit**

#### 1. Lock-Screen Push Notifications (Urgency & Micro-Humour)
- **Morning Chai Hook**: *"Pani ubal gaya? Chai patti hum le aate hain. Arriving in 8 mins."*
- **Office Afternoon Slump**: *"Coffee peene ka man hai par seat chhodne ka nahi? Blinkit has cold brew on the way."*
- **Late-Night Emergency**: *"Forgot to charge your phone before bed? 20W Fast Charger delivered before you finish this episode."*

#### 2. Outdoor Billboard Copy Concepts
- **Twin Billboard with Local Cafe**: 
  - *Cafe Billboard*: "Great coffee takes 5 minutes to brew."
  - *Blinkit Billboard*: "Blinkit delivers the cookies before it cools down."
- **Cultural Billboard**: *"Khana banana chahte the, par pyaz khatam ho gaya? We are outside your building."*

#### 3. Core Retention Strategy
- **Smart Predictive Carts**: Auto-suggest milk, eggs, or bread right when household inventory typically empties (every 3–4 days).
- **Festival Tentpoles**: Pre-book instant delivery windows for high-friction holiday items (Dhanteras coins, Rakhi thalis, Holi organic gulal).
        `;
      } else if (brand.toLowerCase().includes('zomato')) {
        tips = `
### 🍕 Actionable Marketing Playbook & Viral Hooks for **Zomato**

#### 1. Push Notification Hooks (Self-Deprecating & Topical)
- **Cricket Match Night**: *"Khana banate waqt boundary miss ho sakti hai. Order biryani, save the over."*
- **Rainy Evening**: *"Baarish ho rahi hai. Chai aur pakode ka order humein lene dijiye. Driver on standby."*
- **Mid-Week Burnout**: *"Your boss called for another meeting. You deserve chocolate lava cake."*

#### 2. Viral Social Media Hooks
- **LinkedIn Satire**: *"We analyzed 10M food orders. 0% of people who ordered salad on Friday actually wanted salad."*
- **Topical Meme Billboard**: *"Rider already left with your momos. Do not call your ex while waiting."*

#### 3. Full-Funnel Growth Lever
- **Gamified Delivery Tracking**: Add witty easter eggs and interactive mini-games to the live delivery tracking map to maximize in-app dwell time.
        `;
      } else if (brand.toLowerCase().includes('boat')) {
        tips = `
### 🎧 Actionable Marketing Playbook & Viral Hooks for **boAt**

#### 1. Push Notification & Product Hooks
- **Workout / Gym Drop**: *"Playlist ready hai, bass tumhare earphones charge nahi hain. Plug into Nirvana in 5 mins."*
- **Cricket Season**: *"Match tight hai, commentary clear honi chahiye. Switch to boAt ANC."*
- **New Drop Alert**: *"Bass itna deep, padosi bhi vibe karein. Meet the new Airdopes."*

#### 2. Creator & Streetwear Campaigns
- **Audio OOTD**: Partner with streetwear micro-creators to feature boAt headphones as color-matched accessories in fashion reels.
- **Gym Battle Campaign**: Challenge fitness creators to drop-test earbuds during extreme workouts, highlighting sweat-proof durability.

#### 3. Community Engagement Flywheel
- **#boAthead Fan Hall of Fame**: Repost top consumer unboxings to official brand channels with humorous commentary from co-founder Aman Gupta.
        `;
      } else if (brand.toLowerCase().includes('zepto')) {
        tips = `
### ⚡ Actionable Marketing Playbook & Viral Hooks for **Zepto**

#### 1. Push Notification Hooks (Emergency & Micro-Habits)
- **Late-Night Craving**: *"Ice cream khatam, mood kharab? Zepto rider reaching in 8 mins."*
- **Breakfast Panic**: *"Tawa garam ho chuka hai, par butter nahi hai? Order on Zepto, deliver before bread is toasted."*
- **Work from Home Stress**: *"Coffee packet empty during zoom call? We are on your floor before the meeting ends."*

#### 2. Street-Smart Billboard Hooks
- **Metro Exit Hoarding**: *"Traffic will take 45 mins. Your cold drinks reached home 35 mins ago."*
- **Collab Banter**: Partner with local salons and bakeries with witty two-brand hoardings: *"They make you look good, we bring the tissues in 10 mins."*

#### 3. Retention Habit Architecture
- **Automatic 3-Day Milk/Bread Replenishment**: Nudge 1-click reorder notifications at 6:45 AM based on consumption cadence.
        `;
      } else if (brand.toLowerCase().includes('inshorts')) {
        tips = `
### 📰 Actionable Marketing Playbook & Viral Hooks for **Inshorts**

#### 1. Engagement & Lock-Screen Hooks
- **Morning Coffee Brevity**: *"60 seconds. 5 major global stories. Be the smartest person in your 10 AM standup."*
- **Breaking News Card**: *"Big policy shift just happened. Here are the 60 words that actually matter."*
- **Evening Wind-Down**: *"No drama, no shouting anchors. Just the day's facts before you sleep."*

#### 2. Native Advertising Best Practices
- **Sponsored Card Formula**: Match editorial tone: 1 crisp problem hook + 3 bulleted factual advantages + 1 subtle CTA link to source.
- **WhatsApp Share Optimization**: Add 1-click formatted text copy with attribution for instant forwarding in family and work groups.
        `;
      } else {
        tips = `
### 💡 Strategic Growth & Marketing Playbook for **${brand}**

#### 1. High-Converting Hook Formulas
- **The "Before You Notice" Formula**: Highlight the exact micro-moment when a customer realizes they have a problem, and position your brand as the instant savior.
- **The Contrast Hook**: Frame your category's conventional, tedious way against your clean, instant solution.

#### 2. Outdoor & Social Copy Angles
- **Hook 1**: *"Everyone else makes you wait. We make it unforgettable in 10 minutes."*
- **Hook 2**: *"Stop settling for category defaults. Experience how ${brand} redefines the standard."*

#### 3. 3 Golden Rules for Compounding Brand Recall
- **Rule 1: Personality is Free Media**: Speak like an authentic human with wit and empathy rather than an impersonal corporate press release.
- **Rule 2: Turn Touchpoints into Stories**: Invoices, delivery bags, app update notes, and push notifications are prime billboard real estate.
- **Rule 3: Win Cultural Moments**: React to news, memes, and festival rituals before traditional competitors even schedule an agency meeting.
        `;
      }
      setTipsResult(tips.trim());
      setGeneratingTips(false);
    }, 450);
  };

  const copyResult = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="ai-desk" className="relative py-16 text-ivory">
      {/* Container */}
      <div className="relative mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#0F1724]/90 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        {/* Glow ambient effect */}
        <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-[#F28C38]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* Section Header */}
        <div className="relative z-10 mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#F28C38]/30 bg-[#F28C38]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#F28C38]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive AI Marketing Desk</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white font-heading">
              Your Real-Time <span className="text-[#F28C38]">Brand &amp; Strategy</span> Engine.
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-400 max-w-2xl">
              Search iconic case studies, dissect brand positioning frameworks, and generate actionable marketing hooks and strategies in seconds.
            </p>
          </div>

          {/* Quick Brand Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">Analyzed Brands:</span>
            {[
              { name: 'Blinkit', logo: '/images/brand-logos/blinkit.png' },
              { name: 'Zomato', logo: '/images/brand-logos/zomato.png' },
              { name: 'Amul', logo: '/images/brand-logos/amul.jpg' },
              { name: 'Apple', logo: '/images/brand-logos/apple.png' },
              { name: 'boAt', logo: '/images/brand-logos/uploaded-logo.png' },
              { name: 'Zepto', logo: '/images/brand-logos/blinkit.png' },
            ].map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => {
                  setAnalyzedBrand(b.name);
                  setTipBrand(b.name);
                  handleSearch(b.name);
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300 hover:border-[#F28C38]/50 hover:bg-white/10 transition-all"
              >
                <img src={getAssetPath(b.logo)} alt={b.name} className="h-3.5 w-3.5 rounded object-contain" />
                <span>{b.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 mb-8 flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs md:text-sm font-heading font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('finder')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 transition-all ${
              activeTab === 'finder'
                ? 'bg-[#F28C38] text-white font-bold shadow-lg shadow-[#F28C38]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search className="h-4 w-4" />
            <span>1. Find Case Studies</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('analyzer');
              if (!analysisResult) runAnalysis();
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 transition-all ${
              activeTab === 'analyzer'
                ? 'bg-[#F28C38] text-white font-bold shadow-lg shadow-[#F28C38]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>2. Analyze Brand Strategy</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('tips');
              if (!tipsResult) runTips();
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 transition-all ${
              activeTab === 'tips'
                ? 'bg-[#F28C38] text-white font-bold shadow-lg shadow-[#F28C38]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            <span>3. Marketing Tips &amp; Hooks</span>
          </button>
        </div>

        {/* TAB 1: Case Study Finder */}
        {activeTab === 'finder' && (
          <div className="space-y-6">
            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Ask or search: e.g. 'Blinkit 10 min delivery', 'Zomato funny memes', 'Apple brand comeback'..."
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 pl-11 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#F28C38] focus:ring-1 focus:ring-[#F28C38]"
              />
              <Search className="absolute left-3.5 top-4 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearch('')}
                  className="absolute right-3.5 top-3.5 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-gray-400 font-mono">Popular searches:</span>
              {PRESET_QUERIES.map((pq) => (
                <button
                  key={pq}
                  type="button"
                  onClick={() => handleSearch(pq.split(' ')[0])}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 hover:border-[#F28C38]/40 hover:bg-[#F28C38]/10 hover:text-[#F28C38] transition-all"
                >
                  {pq}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {searchResults.map((item) => (
                <div
                  key={item.slug}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#F28C38]/40 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={getAssetPath(item.logo)}
                          alt={item.brand}
                          className="h-7 w-7 rounded-lg object-contain bg-white/10 p-0.5 border border-white/10"
                        />
                        <span className="text-sm font-bold text-white font-heading">{item.brand}</span>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-mono text-[#F28C38]">
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-gray-100 group-hover:text-[#F28C38] transition-colors leading-snug mb-2 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-gray-400 font-mono">{item.tag}</span>
                    <Link
                      href={item.slug}
                      className="inline-flex items-center gap-1 font-semibold text-[#F28C38] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Breakdown</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Brand Strategy Analyzer */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5">
                  Select or Enter Brand
                </label>
                <div className="flex gap-2">
                  <select
                    value={analyzedBrand}
                    onChange={(e) => {
                      setAnalyzedBrand(e.target.value);
                      setCustomBrand('');
                    }}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#F28C38]"
                  >
                    <option value="Blinkit" className="bg-[#0F1724]">Blinkit (Quick Commerce)</option>
                    <option value="Zomato" className="bg-[#0F1724]">Zomato (Food Tech)</option>
                    <option value="Amul" className="bg-[#0F1724]">Amul (Dairy FMCG)</option>
                    <option value="Apple" className="bg-[#0F1724]">Apple (Consumer Tech)</option>
                    <option value="Custom" className="bg-[#0F1724]">Type Custom Brand...</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5">
                  Custom Brand Name (Optional)
                </label>
                <input
                  type="text"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  placeholder="e.g. MyBrand, Tesla, CRED, boAt"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#F28C38]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5">
                  Target Consumer Group
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Urban Gen Z, Working Moms, D2C"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#F28C38]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={runAnalysis}
                disabled={analyzing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F28C38] px-5 py-2.5 text-sm font-heading font-bold text-white shadow-lg shadow-[#F28C38]/25 hover:bg-[#e07b27] transition-all disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                <span>{analyzing ? 'Analyzing Architecture...' : 'Analyze Brand Strategy'}</span>
              </button>
            </div>

            {analysisResult && (
              <div className="relative rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    onClick={() => copyResult(analysisResult)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Analysis'}</span>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-sm text-gray-200 leading-relaxed space-y-4">
                  {analysisResult.split('\n\n').map((paragraph, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[#F28C38] font-heading mb-1">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Marketing Tips & Viral Hooks */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5">
                  Select Brand or Enter Product
                </label>
                <input
                  type="text"
                  value={customBrand || tipBrand}
                  onChange={(e) => {
                    setTipBrand(e.target.value);
                    setCustomBrand(e.target.value);
                  }}
                  placeholder="e.g. Blinkit, Zomato, Amul, Nike, or your brand"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#F28C38]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5">
                  Marketing Deliverable / Output Type
                </label>
                <select
                  value={tipObjective}
                  onChange={(e) => setTipObjective(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#F28C38]"
                >
                  <option value="Viral Push Notification & Social Hooks" className="bg-[#0F1724]">Viral Push Notifications &amp; Social Hooks</option>
                  <option value="Street Billboard & OOH Copy Concepts" className="bg-[#0F1724]">Street Billboard &amp; OOH Copy Concepts</option>
                  <option value="Customer Retention & Habit Loops" className="bg-[#0F1724]">Customer Retention &amp; Habit Loops</option>
                  <option value="Full Campaign Strategy Framework" className="bg-[#0F1724]">Full Campaign Strategy Framework</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={runTips}
                disabled={generatingTips}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F28C38] px-5 py-2.5 text-sm font-heading font-bold text-white shadow-lg shadow-[#F28C38]/25 hover:bg-[#e07b27] transition-all disabled:opacity-50"
              >
                <Flame className="h-4 w-4" />
                <span>{generatingTips ? 'Generating Hooks...' : 'Generate Marketing Tips & Hooks'}</span>
              </button>
            </div>

            {tipsResult && (
              <div className="relative rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    onClick={() => copyResult(tipsResult)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Tips'}</span>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-sm text-gray-200 leading-relaxed space-y-4">
                  {tipsResult.split('\n\n').map((paragraph, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[#F28C38] font-heading mb-1">$1</h3>').replace(/^#### (.*$)/gim, '<h4 class="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wide mt-3 mb-1">$1</h4>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
