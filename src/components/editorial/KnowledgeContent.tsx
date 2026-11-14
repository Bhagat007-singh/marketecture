'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  Megaphone,
  Monitor,
  BarChart3,
  Search,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface Topic {
  id: string;
  category: string;
  title: string;
  summary: string;
  framework: string;
  detailedExplanation: string;
  realWorldExample: string;
  keyTakeaway: string;
}

const topicsData: Topic[] = [
  // 1. FUNDAMENTALS
  {
    id: 'definition-marketing',
    category: 'Fundamentals',
    title: 'Definition & Purpose of Marketing',
    summary: 'The strategic discipline of understanding, creating, delivering, and communicating superior value to chosen customer segments at a sustainable profit.',
    framework: 'Core Exchange Theory & Value Triad',
    detailedExplanation:
      'Modern marketing has evolved far beyond transactional advertising. As defined by Philip Kotler and Peter Drucker, marketing is the foundational business orientation where every functional choice originates from customer empathy and unmet market needs. It establishes the bridge between raw corporate capabilities and genuine societal utility.',
    realWorldExample:
      'Apple does not market aluminium laptop chassis or silicon processors; it markets individual creative empowerment, intuitive human-machine design, and personal status.',
    keyTakeaway:
      'Marketing is not an expense department tasked with selling whatever the factory produces; it dictates what the factory should build in the first place.',
  },
  {
    id: '4ps-7ps',
    category: 'Fundamentals',
    title: "The 4Ps & 7Ps Marketing Mix",
    summary: 'The operational levers used to orchestrate a competitive market offering across Product, Price, Place, Promotion (extended by People, Process, Physical Evidence).',
    framework: "McCarthy's 4Ps + Booms & Bitner's 7Ps",
    detailedExplanation:
      "Formulated by E. Jerome McCarthy (4Ps) and extended for services by Booms and Bitner (7Ps), this framework categorises the controllable parameters a firm coordinates. For service-led and digital brands, 'People' (frontline personnel), 'Process' (frictionless delivery workflows), and 'Physical Evidence' (trust signals, UI polish, ambient cues) often dictate customer retention more than promotion alone.",
    realWorldExample:
      "Starbucks: The product is coffee; the place is high-density urban transit nodes; the physical evidence is warm lighting, acoustic jazz, and branded cups; the people are trained baristas; the price commands an intentional 400% margin above commodity beans.",
    keyTakeaway:
      'Misaligning a single P (e.g. ultra-luxury pricing with cheap convenience packaging) destroys the entire strategic coherence.',
  },
  {
    id: 'stp-framework',
    category: 'Fundamentals',
    title: 'Segmentation, Targeting & Positioning (STP)',
    summary: 'The bedrock mechanism for dividing a heterogeneous mass market into distinct cohorts, choosing where to win, and anchoring a distinct mental image.',
    framework: 'Kotlerian STP Matrix',
    detailedExplanation:
      "Segmentation decomposes the landscape via geographic, demographic, psychographic, and behavioural parameters. Targeting evaluates segment size, structural growth, structural attractiveness, and brand fit. Positioning crafts the distinctive mental territory the brand claims relative to alternatives in the consumer's cognitive map.",
    realWorldExample:
      'Marriott International: Segmented by traveler purpose (business, luxury, extended stay, budget). Targeted with dedicated brands (Ritz-Carlton for luxury prestige, Courtyard for mid-tier business mobility, Moxy for Gen-Z urban lifestyle).',
    keyTakeaway:
      'Trying to appeal to everyone guarantees that you resonate deeply with no one. Strategy is fundamentally about deciding what NOT to do.',
  },
  {
    id: 'porters-five-forces',
    category: 'Fundamentals',
    title: "Porter's Five Forces & Industry Structure",
    summary: 'Assessing external market attractiveness, profit pools, and competitive intensity to determine sustainable pricing power and margin defence.',
    framework: "Michael Porter's Industry Economics",
    detailedExplanation:
      'Marketers must understand the structural macroeconomic forces governing their industry: (1) Threat of new entrants, (2) Bargaining power of buyers, (3) Bargaining power of suppliers, (4) Threat of substitute products, and (5) Rivalry among existing competitors. High competitive intensity compresses margins and escalates promotional expenditure.',
    realWorldExample:
      'Airline Industry: Severe supplier power (Boeing/Airbus, jet fuel cartels), extreme buyer price sensitivity via meta-search engines, zero switching costs, and brutal rivalry lead to chronic single-digit margins despite massive capital investment.',
    keyTakeaway:
      'Great advertising cannot compensate for an economically hostile industry structure. Marketing strategy must exploit structural asymmetries.',
  },

  // 2. CONSUMER BEHAVIOUR
  {
    id: 'consumer-psychology',
    category: 'Consumer Behaviour',
    title: 'Consumer Decision Journeys & Psychology',
    summary: 'The non-linear cognitive paths consumers navigate from initial trigger and active evaluation through post-purchase loyalty loops.',
    framework: 'McKinsey CDJ & System 1 / System 2 (Kahneman)',
    detailedExplanation:
      'Daniel Kahneman proved that 95% of human choices are dictated by fast, emotional, automatic mental heuristics (System 1), not slow rational calculation (System 2). The McKinsey Consumer Decision Journey replaces the classical linear funnel with an iterative circular loop: Trigger → Active Evaluation → Moment of Purchase → Post-Purchase Experience → Loyalty Loop.',
    realWorldExample:
      'Amazon 1-Click Ordering: Eliminates cognitive friction at the critical moment of purchase, bypassing deliberative System 2 second-guessing before buyer remorse or checkout drop-off occurs.',
    keyTakeaway:
      'Brands build salience through emotional System 1 associations, then provide rational System 2 facts to allow buyers to justify their emotional decision.',
  },
  {
    id: 'audience-personas',
    category: 'Consumer Behaviour',
    title: 'Audience Personas & Jobs-To-Be-Done (JTBD)',
    summary: 'Moving beyond flat demographic stats to uncover the underlying progress a customer is trying to make in a specific circumstance.',
    framework: "Clayton Christensen's JTBD",
    detailedExplanation:
      "Demographics tell you someone is a '34-year-old male with an MBA living in Mumbai.' They fail to explain WHY he purchases a fast-food meal at 8:00 AM. Christensen's Jobs-To-Be-Done framework reveals that customers 'hire' products to solve situational functional, emotional, and social progress challenges.",
    realWorldExample:
      'The Famous Milkshake Study: Fast food milkshakes were hired by commuters during long morning drives not as a dessert, but because they kept one hand occupied and staved off mid-morning hunger with clean viscosity.',
    keyTakeaway:
      'Focus on the job, not the customer’s age or gender. The same individual hires completely different products depending on context and emotional stress.',
  },

  // 3. ADVERTISING & COMMUNICATION
  {
    id: 'aida-hierarchy-effects',
    category: 'Advertising & Comm',
    title: 'AIDA, DAGMAR & Hierarchy of Effects',
    summary: 'Sequential communication models tracing the psychological shift from passive unawareness to confirmed behavioural adoption.',
    framework: 'Strong’s AIDA (1898) & Colley’s DAGMAR (1961)',
    detailedExplanation:
      'AIDA maps Attention (disrupting sensory habituation), Interest (demonstrating personal relevance), Desire (stirring emotional aspiration), and Action (reducing friction to transact). Colley’s DAGMAR (Defining Advertising Goals for Measured Advertising Results) established that advertising objectives must be framed in explicit communication metrics (e.g. increase unaided brand recall from 20% to 45% in 6 months), distinct from overall corporate sales volume.',
    realWorldExample:
      'Tesla Cybertruck Launch: Sledgehammer on armored glass drew unprecedented global Attention; 500-mile electric range created Interest; futuristic sci-fi aesthetic spurred intense Desire; a refundable $100 reservation provided frictionless Action.',
    keyTakeaway:
      'Never confuse creative cut-through (Attention) with commercial persuasion (Desire and Action). An ad that is merely funny without brand attribution is wasted budget.',
  },
  {
    id: 'brand-storytelling',
    category: 'Advertising & Comm',
    title: 'Brand Storytelling & Narrative Archetypes',
    summary: 'Embedding commercial messages into universal mythological arcs (The Hero, The Outlaw, The Explorer) to forge deep limbic resonance.',
    framework: 'Jungian Archetypes & Campbell’s Monomyth',
    detailedExplanation:
      'Human brains are biologically hardwired for narrative. Neurological studies prove that storytelling stimulates cortisol (attention), dopamine (emotional immersion), and oxytocin (empathy and trust). Great brands place the consumer as the Hero, positioning the brand not as the protagonist, but as the wise Mentor / Guide providing the magical elixir.',
    realWorldExample:
      'Airbnb: "Belong Anywhere". The customer is the traveler seeking belonging; Airbnb is the mentor opening the door to genuine human hospitality.',
    keyTakeaway:
      'The customer is always Luke Skywalker. Your brand is Yoda. Never make your brand the hero of the story.',
  },

  // 4. DIGITAL MARKETING
  {
    id: 'seo-sem-mechanics',
    category: 'Digital Marketing',
    title: 'SEO & Search Intent Architecture',
    summary: 'Capturing high-intent commercial demand by matching informational, navigational, and transactional search queries with indexable relevance.',
    framework: 'Google Search Quality Evaluator Guidelines (E-E-A-T)',
    detailedExplanation:
      'Search Engine Optimisation is not keyword stuffing; it is information architecture designed to satisfy user search intent faster and more authoritatively than any competing page. Google’s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) prioritises primary source depth, structured schema, fast Core Web Vitals, and authoritative contextual backlinks.',
    realWorldExample:
      'HubSpot: Built an inbound marketing empire by creating definitive guides, free downloadable templates, and tools matching every phase of search intent in the B2B SaaS space.',
    keyTakeaway:
      'Social media discovers demand; Search captures existing intent. When a user searches, they have already framed their problem.',
  },
  {
    id: 'performance-marketing',
    category: 'Digital Marketing',
    title: 'Performance Marketing & Paid Social Dynamics',
    summary: 'Algorithmic auction-based user acquisition (Meta, Google Ads) optimising real-time bids toward bottom-funnel conversion signals.',
    framework: 'Second-Price Auction Mechanics & Machine Learning Attribution',
    detailedExplanation:
      'Modern performance marketing relies on algorithmic creative optimization. Meta Advantage+ and Google Performance Max operate on machine-learning auctions where the ad creative acts as the primary targeting lever. Winning advertisers test high creative variations to lower blended customer acquisition cost (CAC).',
    realWorldExample:
      'D2C brands like Gymshark and boAt scale hyper-rapidly by pairing high-frequency UGC (user-generated content) video hooks with automated broad audience targeting.',
    keyTakeaway:
      'Creative is the new targeting. Algorithmic ad platforms reward continuous creative freshness and emotional thumb-stopping hooks.',
  },

  // 5. MEASUREMENT
  {
    id: 'roi-roas-metrics',
    category: 'Measurement',
    title: 'ROI, ROAS & Unit Economics (CAC vs LTV)',
    summary: 'Distinguishing between immediate gross ad revenue efficiency (ROAS) and comprehensive corporate profitability (ROI, LTV:CAC ratios).',
    framework: 'Marketing Unit Economics & Incremental Lift',
    detailedExplanation:
      'Return on Ad Spend (ROAS = Revenue from Ads ÷ Ad Cost) measures tactical campaign efficiency, but ignores cost of goods sold (COGS), shipping, returns, and operational overhead. True Marketing ROI evaluates incremental profit against fully-loaded expenditure. In subscription and recurring commerce, a healthy business targets an LTV:CAC ratio of 3:1 or higher.',
    realWorldExample:
      'An e-commerce brand celebrating a 4.0x ROAS can still be bankrupt if product margins are 20% and payment gateway / logistics swallow another 15%.',
    keyTakeaway:
      'High ROAS is a vanity metric if incremental net margin is negative. Measure bottom-line contribution margin, not top-line ad multiples.',
  },
  {
    id: 'ctr-cpm-cpc-metrics',
    category: 'Measurement',
    title: 'Core Funnel Metrics: CTR, CPM, CPC & Engagement',
    summary: 'The operational telemetry of digital ad auctions measuring creative cut-through, media pricing, and acquisition friction.',
    framework: 'Media Efficiency Funnel Ratios',
    detailedExplanation:
      'CPM (Cost Per Mille) reflects audience supply and advertiser competition. CTR (Click-Through Rate) isolates creative appeal and audience relevance. CPC (Cost Per Click) is mathematically bounded by CPM ÷ (CTR × 10). When analyzing Engagement Rates, the denominator (Reach vs Impressions vs Followers) must remain consistent to prevent misleading benchmarks.',
    realWorldExample:
      'A B2B LinkedIn campaign may exhibit an expensive $80 CPM, but deliver high-converting decision-maker leads with an average contract value of $50,000, outperforming cheap $4 CPM TikTok traffic.',
    keyTakeaway:
      'Context determines the value of a metric. Cheap clicks from unqualified audiences represent pure capital waste.',
  },
];

const categories = [
  'All Topics',
  'Fundamentals',
  'Consumer Behaviour',
  'Advertising & Comm',
  'Digital Marketing',
  'Measurement',
];

export default function KnowledgeContent() {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('definition-marketing');
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat === 'fundamentals') setSelectedCategory('Fundamentals');
    else if (cat === 'consumer') setSelectedCategory('Consumer Behaviour');
    else if (cat === 'advertising') setSelectedCategory('Advertising & Comm');
    else if (cat === 'digital') setSelectedCategory('Digital Marketing');
    else if (cat === 'measurement') setSelectedCategory('Measurement');
  }, [searchParams]);

  const filteredTopics = useMemo(() => {
    return topicsData.filter((topic) => {
      const matchesCat =
        selectedCategory === 'All Topics' || topic.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.framework.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-navy/10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-orange text-white shadow-md shadow-orange/20'
                  : 'bg-white text-navy/70 border border-navy/10 hover:border-orange/50 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frameworks, models, terms..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-navy/15 rounded-sm text-xs text-navy placeholder:text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          />
        </div>
      </div>

      {/* Grid of Knowledge Accordions */}
      <div className="space-y-4">
        {filteredTopics.map((topic, idx) => {
          const isExpanded = expandedId === topic.id;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className={`bg-white rounded-sm border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-orange shadow-lg' : 'border-navy/10 hover:border-orange/40'
              }`}
            >
              {/* Header clickable */}
              <button
                onClick={() => toggleExpand(topic.id)}
                className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 focus:outline-none"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="editorial-label text-[10px]">{topic.category}</span>
                    <span className="text-navy/20">•</span>
                    <span className="text-xs text-muted font-mono">{topic.framework}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-navy mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-4xl">
                    {topic.summary}
                  </p>
                </div>

                <div
                  className={`w-9 h-9 rounded-sm flex items-center justify-center border transition-all shrink-0 mt-1 ${
                    isExpanded
                      ? 'bg-orange text-white border-orange rotate-180'
                      : 'bg-navy/5 text-navy/70 border-navy/10 hover:bg-orange hover:text-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </button>

              {/* Expandable Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="border-t border-navy/5 bg-navy/[0.01]"
                  >
                    <div className="p-6 md:p-8 space-y-6">
                      <div>
                        <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-orange mb-2">
                          Theoretical &amp; Strategic Foundation
                        </h4>
                        <p className="text-sm text-navy/85 leading-relaxed">
                          {topic.detailedExplanation}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-navy/5">
                        <div className="bg-white p-5 rounded-sm border border-navy/10">
                          <h5 className="text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-orange" /> Real-World Application
                          </h5>
                          <p className="text-xs text-muted leading-relaxed">
                            {topic.realWorldExample}
                          </p>
                        </div>

                        <div className="bg-orange/[0.04] p-5 rounded-sm border border-orange/20">
                          <h5 className="text-xs font-heading font-bold uppercase tracking-wider text-orange mb-2 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" /> Essential Strategic Principle
                          </h5>
                          <p className="text-xs text-navy/90 leading-relaxed font-medium">
                            {topic.keyTakeaway}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
