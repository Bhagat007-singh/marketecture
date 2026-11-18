'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Percent,
  DollarSign,
  Activity,
  BarChart2,
  TrendingUp,
  PieChart,
  RotateCcw,
  Sliders,
  CheckSquare,
  Download,
  FileSpreadsheet,
  Check,
  FileText,
  X,
  Eye,
} from 'lucide-react';

interface BlueprintItem {
  id: string;
  title: string;
  format: string;
  desc: string;
  filename: string;
  content: string;
}

const BLUEPRINTS: BlueprintItem[] = [
  {
    id: 'creative-brief',
    title: 'Master Creative Brief Canvas',
    format: 'Markdown / PDF',
    desc: 'The single-page brief standard used by global creative agencies to align clients, strategists, and creatives.',
    filename: 'marketecture-master-creative-brief.md',
    content: `# MASTER CREATIVE BRIEF CANVAS
**Framework**: Marketecture Editorial Strategy Series
**Version**: 2.4 Production Standard

---

## 1. PROJECT OVERVIEW
- **Brand / Client**: [Brand Name]
- **Campaign Name**: [Campaign Title]
- **Flighting Window**: [Q1 / Q2 Dates]
- **Budget Tier**: [Brand Building 60% / Direct Response 40%]

## 2. THE BUSINESS PROBLEM
*What real-world business hurdle is marketing tasked with overcoming?*
> [Define market challenge: e.g. Plateaued organic acquisition, commoditisation, or low unaided recall among 18-24 demographics.]

## 3. QUANTIFIED OBJECTIVE
*SMART criteria (Specific, Measurable, Attainable, Relevant, Time-bound):*
- Primary: Increase unaided brand salience by +18% within 90 days.
- Secondary: Drive 250,000 qualified lead conversions at target CAC < ₹450.

## 4. TARGET AUDIENCE & BEHAVIORAL TENSION
- **Core Demographic**: [Age, geography, income tier, media habit]
- **The Human Tension**: What do they currently believe or feel that holds them back?
- **Current Behavior**: [Buying competitor commodity X]
- **Desired Behavior**: [Treating our brand as an aspirational badge]

## 5. THE SINGLE CORE INSIGHT
*A penetrating human truth that reframes the conversation:*
> [One provocative sentence uncovering an emotional or cultural reality.]

## 6. THE CREATIVE PROPOSITION (THE SMP)
*Single-Minded Proposition:*
> [The one sentence we want etched into the consumer's memory.]

## 7. REASONS TO BELIEVE (RTBs)
1. **Proof Point 1**: [Product feature or clinical metric]
2. **Proof Point 2**: [Social proof, market heritage, or customer volume]
3. **Proof Point 3**: [Audited pricing or distribution accessibility]

## 8. MANDATORIES & EXECUTIONAL GUARDRAILS
- Mandatory Elements: Logo lockup (min 3 sec on video), sound logo, legal disclaimer.
- Tone of Voice: Witty, authoritative, uncompromising, empathetic.
- Media Channels: OOH Tentpoles + YouTube Non-Skip (15s) + Meta Reel Retargeting.
`,
  },
  {
    id: 'content-calendar',
    title: 'Annual Omnichannel Content Calendar',
    format: 'Spreadsheet Template',
    desc: '52-week thematic editorial flighting schedule with platform-specific content pillar tagging.',
    filename: 'marketecture-annual-content-calendar.md',
    content: `# 52-WEEK OMNICHANNEL CONTENT CALENDAR TEMPLATE
**Framework**: Marketecture Editorial Standard (Hero-Hub-Help Model)

---

## Q1: BRAND BUILDING & CORE THESIS (JAN - MAR)
| Week | Theme / Pillar | Content Tier | Channel Matrix | KPI Target |
|------|----------------|--------------|----------------|------------|
| W01  | New Year Resolution vs Truth | Hub (Educational) | LinkedIn, Blog, X | 15k Impressions |
| W02  | Industry Prediction Report | Hero (Tentpole) | YouTube Long-form, PR | 50k Views |
| W03  | Product Deep-Dive & RTB | Help (Utility) | Reels, TikTok, FAQ | 3.5% Engagement |
| W04  | Customer Transformation Case | Hub (Social Proof) | Case Study, Newsletter | 12% CTR |

## CONTENT REPURPOSING PLAYBOOK
1. **Core Asset**: 1x Comprehensive Long-Form Teardown (1,500 words).
2. **Derivative 1**: 5x Slide Carousel for LinkedIn / Instagram.
3. **Derivative 2**: 1x 60-second vertical video breakdown for Shorts / Reels.
4. **Derivative 3**: 1x Provocative 6-tweet commentary thread on X.
5. **Derivative 4**: 1x Newsletter feature with actionable executive summary.
`,
  },
  {
    id: 'whitespace-matrix',
    title: 'Competitor Whitespace Matrix',
    format: 'Analysis Canvas',
    desc: 'Perceptual positioning worksheet to identify untapped market opportunities across pricing and prestige.',
    filename: 'marketecture-competitor-whitespace-matrix.md',
    content: `# COMPETITOR WHITESPACE MATRIX
**Framework**: Perceptual Gap Analysis & Strategic Territory Mapping

---

## 1. AXIS DEFINITIONS
- **X-Axis**: Rational Utility (Left) <---> Emotional Identity (Right)
- **Y-Axis**: Mass Accessibility (Bottom) <---> Ultra-Premium Prestige (Top)

## 2. COMPETITOR AUDIT AUDIT
| Brand | Quadrant | Primary Tagline | Core Vulnerability |
|-------|----------|-----------------|--------------------|
| Competitor A | Top-Left (Premium Rational) | "Engineered for Precision" | Clinical, lacks emotional warmth |
| Competitor B | Bottom-Left (Budget Rational) | "Always the Lowest Price" | Susceptible to price wars, zero loyalty |
| Competitor C | Bottom-Right (Mass Emotional) | "Together for Moments" | Cluttered messaging, weak product RTBs |

## 3. IDENTIFIED WHITESPACE OPPORTUNITY
> **The Uncontested Territory**: Top-Right (Aspirational Emotional Badge with accessible financing).
> **Strategic Rationale**: Market analysis reveals high consumer willingness to pay a 25% premium for authentic cultural storytelling.
`,
  },
  {
    id: 'media-flighting',
    title: 'Media Flighting & Budget Allocation Sheet',
    format: 'Excel / Sheets',
    desc: 'Formula-enabled spreadsheet incorporating the 60/40 rule and marginal CAC diminishing returns curves.',
    filename: 'marketecture-media-budget-allocation.md',
    content: `# MEDIA FLIGHTING & BUDGET ALLOCATION FORMULA
**Reference**: Binet & Field Long & Short of It Framework

---

## 1. 60/40 BUDGET DIVISION MODEL
- **Total Annual Marketing Budget**: 100%
- **Brand Building Allocation (60%)**:
  - Focus: High-reach, broad-targeting emotional creative.
  - Channels: Connected TV (CTV), High-Impact OOH, Cinema, YouTube 30s.
  - Payoff Horizon: 6 to 36 months (compounds mental availability).
- **Direct Response Allocation (40%)**:
  - Focus: High-intent capture, friction removal, conversion.
  - Channels: Google Paid Search (Exact Match), Meta Dynamic Retargeting, Performance Affiliate.
  - Payoff Horizon: 0 to 90 days.

## 2. FLIGHTING SCHEDULE OPTIONS
1. **Continuous (Drip)**: Flat spend week-over-week. Best for high-frequency repeat purchase goods (FMCG).
2. **Flighted (Burst)**: Concentrated bursts of heavy spending separated by periods of zero spending. Best for seasonal launches and tight budgets.
3. **Pulsing**: Constant low-level baseline spend with intense seasonal multiplier bursts during festive windows (Diwali, Q4).
`,
  },
  {
    id: 'influencer-guardrails',
    title: 'Influencer Collaboration Contract Guardrails',
    format: 'Legal & Strategic Guide',
    desc: 'Checklist of non-negotiable clauses: exclusivity windows, usage rights duration, and FTC/ASCI compliance.',
    filename: 'marketecture-influencer-contract-guardrails.md',
    content: `# INFLUENCER COLLABORATION STRATEGIC CONTRACT GUARDRAILS
**Compliance**: ASCI (Advertising Standards Council of India) & FTC Guidelines

---

## 1. NON-NEGOTIABLE CONTRACTUAL CLAUSES
1. **Clear Regulatory Disclosures**:
   - Influencer MUST use platform disclosure toggles (#ad, #collab, "Paid Partnership with [Brand]").
   - Disclosures must be super-imposed within the first 3 seconds of video and placed before the "more" cutoff in caption text.

2. **Category Exclusivity Window**:
   - Influencer warrants they will not endorse, feature, or mention direct competitors in the same category for 30 days prior and 60 days following campaign air date.

3. **Paid Amplification & Dark Post Rights (Whitelisting)**:
   - Contract must explicitly include: "Brand retains the royalty-free, worldwide license to run Meta Partnership Ads and Spark Ads from Creator's handle for a duration of 90 days."

4. **Brand Safety & Moral Hazard Clause**:
   - Immediate termination and full clawback of remuneration if the Creator engages in hate speech, political controversy, or criminal proceedings.
`,
  },
  {
    id: 'brand-pyramid',
    title: 'Brand Pyramid & Architecture Guide',
    format: 'Strategic Framework',
    desc: 'Step-by-step workbook translating product features into emotional rewards and central brand essence.',
    filename: 'marketecture-brand-pyramid-guide.md',
    content: `# BRAND ARCHITECTURE & PYRAMID GUIDE
**Framework**: 5-Tier Strategic Brand Equity Hierarchy

---

## LEVEL 5: BRAND ESSENCE (THE HEART & SOUL)
> **The North Star**: One singular 2-3 word concept that defines why the brand exists in culture.
> *Examples: Nike = "Authentic Athletic Performance" | Apple = "Empowering Creative Rebellion" | Amul = "The Taste of India"*

## LEVEL 4: BRAND PERSONALITY & ARCHETYPE
- Primary Archetype: [The Hero / The Outlaw / The Creator / The Everyman]
- Human Traits: If this brand walked into a room, how would they dress, speak, and interact?

## LEVEL 3: EMOTIONAL BENEFITS (HOW THE CUSTOMER FEELS)
- What emotional transformation takes place when using this product?
- "I feel confident, unburdened, and in command of my destiny."

## LEVEL 2: FUNCTIONAL BENEFITS (WHAT THE PRODUCT DOES)
- Direct customer problem solved:
- Saves 45 minutes of daily admin; eliminates audio latency; keeps milk fresh for 48 hours without refrigeration.

## LEVEL 1: PRODUCT ATTRIBUTES & FEATURES (WHAT IT HAS)
- Physical components, proprietary technology, raw materials, clinical patents.
`,
  },
];

export default function ToolsContent() {
  const [activeTab, setActiveTab] = useState<'calculators' | 'budget-planner' | 'seo-checklist' | 'templates'>('calculators');
  const [activeBlueprint, setActiveBlueprint] = useState<BlueprintItem | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadBlueprint = (blueprint: BlueprintItem) => {
    try {
      const blob = new Blob([blueprint.content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = blueprint.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadToast(`Saved ${blueprint.filename}`);
      setTimeout(() => setDownloadToast(null), 4000);
    } catch {
      setActiveBlueprint(blueprint);
    }
  };

  // Calculator 1: CTR
  const [ctrClicks, setCtrClicks] = useState<string>('2400');
  const [ctrImpressions, setCtrImpressions] = useState<string>('120000');
  const [ctrResult, setCtrResult] = useState<number | null>(2.0);

  // Calculator 2: CPM
  const [cpmCost, setCpmCost] = useState<string>('45000');
  const [cpmImpressions, setCpmImpressions] = useState<string>('250000');
  const [cpmResult, setCpmResult] = useState<number | null>(180);

  // Calculator 3: CPC
  const [cpcCost, setCpcCost] = useState<string>('25000');
  const [cpcClicks, setCpcClicks] = useState<string>('1250');
  const [cpcResult, setCpcResult] = useState<number | null>(20);

  // Calculator 4: Engagement Rate
  const [erEngagements, setErEngagements] = useState<string>('4500');
  const [erDenominatorType, setErDenominatorType] = useState<'Reach' | 'Impressions' | 'Followers'>('Reach');
  const [erDenominatorValue, setErDenominatorValue] = useState<string>('90000');
  const [erResult, setErResult] = useState<number | null>(5.0);

  // Calculator 5: ROI
  const [roiReturn, setRoiReturn] = useState<string>('350000');
  const [roiInvestment, setRoiInvestment] = useState<string>('100000');
  const [roiResult, setRoiResult] = useState<number | null>(250);

  // Calculator 6: ROAS
  const [roasRevenue, setRoasRevenue] = useState<string>('500000');
  const [roasSpend, setRoasSpend] = useState<string>('125000');
  const [roasResult, setRoasResult] = useState<number | null>(4.0);

  // Budget Planner State
  const [totalBudget, setTotalBudget] = useState<number>(500000);
  const [brandPct, setBrandPct] = useState<number>(60);

  // Handlers for calculations with validation
  const calculateCTR = () => {
    const clicks = parseFloat(ctrClicks);
    const imps = parseFloat(ctrImpressions);
    if (isNaN(clicks) || isNaN(imps) || imps <= 0 || clicks < 0) {
      setCtrResult(null);
      return;
    }
    setCtrResult((clicks / imps) * 100);
  };

  const calculateCPM = () => {
    const cost = parseFloat(cpmCost);
    const imps = parseFloat(cpmImpressions);
    if (isNaN(cost) || isNaN(imps) || imps <= 0 || cost < 0) {
      setCpmResult(null);
      return;
    }
    setCpmResult((cost / imps) * 1000);
  };

  const calculateCPC = () => {
    const cost = parseFloat(cpcCost);
    const clicks = parseFloat(cpcClicks);
    if (isNaN(cost) || isNaN(clicks) || clicks <= 0 || cost < 0) {
      setCpcResult(null);
      return;
    }
    setCpcResult(cost / clicks);
  };

  const calculateER = () => {
    const engs = parseFloat(erEngagements);
    const denom = parseFloat(erDenominatorValue);
    if (isNaN(engs) || isNaN(denom) || denom <= 0 || engs < 0) {
      setErResult(null);
      return;
    }
    setErResult((engs / denom) * 100);
  };

  const calculateROI = () => {
    const ret = parseFloat(roiReturn);
    const inv = parseFloat(roiInvestment);
    if (isNaN(ret) || isNaN(inv) || inv <= 0) {
      setRoiResult(null);
      return;
    }
    setRoiResult(((ret - inv) / inv) * 100);
  };

  const calculateROAS = () => {
    const rev = parseFloat(roasRevenue);
    const spend = parseFloat(roasSpend);
    if (isNaN(rev) || isNaN(spend) || spend <= 0 || rev < 0) {
      setRoasResult(null);
      return;
    }
    setRoasResult(rev / spend);
  };

  return (
    <div className="space-y-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-navy/10 pb-4">
        {[
          { id: 'calculators', label: 'Marketing Calculators', icon: Calculator },
          { id: 'budget-planner', label: '60/40 Budget Allocator', icon: Sliders },
          { id: 'seo-checklist', label: 'Pre-Launch SEO Checklist', icon: CheckSquare },
          { id: 'templates', label: 'Downloadable Frameworks', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-3 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-orange text-white shadow-md shadow-orange/20'
                  : 'bg-white text-navy/70 border border-navy/10 hover:border-orange/50 hover:text-navy'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ALL 6 WORKING CALCULATORS */}
      {activeTab === 'calculators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. CTR */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Relevance Metric</span>
                <Percent className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">CTR Calculator</h3>
              <p className="text-xs font-mono text-muted mb-4">(Clicks ÷ Impressions) × 100</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Clicks</label>
                  <input
                    type="number"
                    value={ctrClicks}
                    onChange={(e) => setCtrClicks(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Impressions</label>
                  <input
                    type="number"
                    value={ctrImpressions}
                    onChange={(e) => setCtrImpressions(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateCTR} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate CTR
                </button>
                <button
                  onClick={() => {
                    setCtrClicks('');
                    setCtrImpressions('');
                    setCtrResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">Click-Through Rate:</span>
                <span className="font-heading font-bold text-xl text-orange">
                  {ctrResult !== null ? `${ctrResult.toFixed(2)}%` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. CPM */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Media Pricing</span>
                <DollarSign className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">CPM Calculator</h3>
              <p className="text-xs font-mono text-muted mb-4">(Cost ÷ Impressions) × 1,000</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Campaign Cost (₹)</label>
                  <input
                    type="number"
                    value={cpmCost}
                    onChange={(e) => setCpmCost(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Impressions Delivered</label>
                  <input
                    type="number"
                    value={cpmImpressions}
                    onChange={(e) => setCpmImpressions(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateCPM} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate CPM
                </button>
                <button
                  onClick={() => {
                    setCpmCost('');
                    setCpmImpressions('');
                    setCpmResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">Cost Per Thousand:</span>
                <span className="font-heading font-bold text-xl text-orange">
                  {cpmResult !== null ? `₹${cpmResult.toFixed(2)}` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>

          {/* 3. CPC */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Acquisition Cost</span>
                <Activity className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">CPC Calculator</h3>
              <p className="text-xs font-mono text-muted mb-4">Campaign Cost ÷ Clicks</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Total Ad Spend (₹)</label>
                  <input
                    type="number"
                    value={cpcCost}
                    onChange={(e) => setCpcCost(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Total Clicks Received</label>
                  <input
                    type="number"
                    value={cpcClicks}
                    onChange={(e) => setCpcClicks(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateCPC} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate CPC
                </button>
                <button
                  onClick={() => {
                    setCpcCost('');
                    setCpcClicks('');
                    setCpcResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">Cost Per Click:</span>
                <span className="font-heading font-bold text-xl text-orange">
                  {cpcResult !== null ? `₹${cpcResult.toFixed(2)}` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Engagement Rate */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Social Affinity</span>
                <BarChart2 className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">Engagement Rate</h3>
              <p className="text-xs font-mono text-muted mb-4">(Engagements ÷ Denominator) × 100</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Total Engagements</label>
                  <input
                    type="number"
                    value={erEngagements}
                    onChange={(e) => setErEngagements(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Denominator</label>
                    <select
                      value={erDenominatorType}
                      onChange={(e) => setErDenominatorType(e.target.value as typeof erDenominatorType)}
                      className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                    >
                      <option value="Reach">Reach</option>
                      <option value="Impressions">Impressions</option>
                      <option value="Followers">Followers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Count</label>
                    <input
                      type="number"
                      value={erDenominatorValue}
                      onChange={(e) => setErDenominatorValue(e.target.value)}
                      className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateER} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate Rate
                </button>
                <button
                  onClick={() => {
                    setErEngagements('');
                    setErDenominatorValue('');
                    setErResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">ER by {erDenominatorType}:</span>
                <span className="font-heading font-bold text-xl text-orange">
                  {erResult !== null ? `${erResult.toFixed(2)}%` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>

          {/* 5. ROI */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Net Profitability</span>
                <TrendingUp className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">Marketing ROI</h3>
              <p className="text-xs font-mono text-muted mb-4">((Return − Investment) ÷ Investment) × 100</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Gross Return / Revenue (₹)</label>
                  <input
                    type="number"
                    value={roiReturn}
                    onChange={(e) => setRoiReturn(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Fully-Loaded Investment (₹)</label>
                  <input
                    type="number"
                    value={roiInvestment}
                    onChange={(e) => setRoiInvestment(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateROI} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate ROI
                </button>
                <button
                  onClick={() => {
                    setRoiReturn('');
                    setRoiInvestment('');
                    setRoiResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">Net Return:</span>
                <span
                  className={`font-heading font-bold text-xl ${
                    roiResult !== null && roiResult >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {roiResult !== null ? `${roiResult >= 0 ? '+' : ''}${roiResult.toFixed(1)}%` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>

          {/* 6. ROAS */}
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-label text-[10px]">Direct Ad Efficiency</span>
                <PieChart className="w-4 h-4 text-orange" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-1">ROAS Calculator</h3>
              <p className="text-xs font-mono text-muted mb-4">Ad Revenue Generated ÷ Ad Spend</p>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Direct Attributed Revenue (₹)</label>
                  <input
                    type="number"
                    value={roasRevenue}
                    onChange={(e) => setRoasRevenue(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-semibold uppercase tracking-wider mb-1">Direct Media Spend (₹)</label>
                  <input
                    type="number"
                    value={roasSpend}
                    onChange={(e) => setRoasSpend(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded p-2 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={calculateROAS} className="btn-primary flex-1 py-2.5 text-xs justify-center">
                  Calculate ROAS
                </button>
                <button
                  onClick={() => {
                    setRoasRevenue('');
                    setRoasSpend('');
                    setRoasResult(null);
                  }}
                  className="px-3 py-2.5 bg-navy/5 hover:bg-navy/10 text-navy/70 rounded-sm text-xs font-heading font-semibold flex items-center gap-1"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
              <div className="p-4 bg-navy text-ivory rounded-sm flex items-center justify-between">
                <span className="text-xs text-muted">ROAS Multiple:</span>
                <span className="font-heading font-bold text-xl text-orange">
                  {roasResult !== null ? `${roasResult.toFixed(2)}x` : 'Invalid Input'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUDGET ALLOCATOR */}
      {activeTab === 'budget-planner' && (
        <div className="bg-white p-8 md:p-12 rounded-sm border border-navy/15 shadow-sm max-w-4xl mx-auto space-y-8">
          <div>
            <span className="editorial-label text-[10px]">Binet &amp; Field 60/40 Rule</span>
            <h3 className="text-2xl font-heading font-bold text-navy mb-2">
              Brand vs Activation Budget Allocator
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Empirical research across 1,000+ effectiveness case studies proves that long-term sustainable growth requires approximately 60% investment in broad brand building and 40% in short-term direct response activation.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-navy mb-2">
                Total Annual Marketing Budget (₹)
              </label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                className="w-full text-xl font-heading font-bold text-orange bg-ivory/50 border border-navy/15 rounded p-4 focus:border-orange focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-heading font-bold">
                <span className="text-navy">Brand Building: {brandPct}%</span>
                <span className="text-orange">Direct Response: {100 - brandPct}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={brandPct}
                onChange={(e) => setBrandPct(parseInt(e.target.value))}
                className="w-full accent-orange cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-navy/10">
              <div className="p-6 bg-navy text-ivory rounded-sm">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-orange block mb-1">
                  Long-Term Brand Equity ({brandPct}%)
                </span>
                <div className="text-3xl font-heading font-bold text-ivory mb-2">
                  ₹{((totalBudget * brandPct) / 100).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Dedicated to creative storytelling, high-reach video, OOH, sponsorships, and uncompromised brand salience that drives pricing power.
                </p>
              </div>

              <div className="p-6 bg-orange/10 border border-orange/30 rounded-sm">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-orange block mb-1">
                  Short-Term Activation ({100 - brandPct}%)
                </span>
                <div className="text-3xl font-heading font-bold text-navy mb-2">
                  ₹{((totalBudget * (100 - brandPct)) / 100).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-navy/80 leading-relaxed">
                  Dedicated to bottom-funnel paid search, dynamic retargeting, promotional discounts, and frictionless conversion channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRE-LAUNCH SEO CHECKLIST */}
      {activeTab === 'seo-checklist' && (
        <div className="bg-white p-8 md:p-12 rounded-sm border border-navy/15 shadow-sm max-w-4xl mx-auto space-y-6">
          <div>
            <span className="editorial-label text-[10px]">Technical &amp; Content Audit</span>
            <h3 className="text-2xl font-heading font-bold text-navy mb-2">
              Pre-Launch Campaign SEO Checklist
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Verify that landing pages, campaign microsites, and editorial posts satisfy Google E-E-A-T and technical indexability standards before driving paid media.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { title: 'Canonical Tag Integrity', desc: 'Ensure every URL specifies a self-referencing canonical to prevent duplicate content indexing.' },
              { title: 'Open Graph & Twitter Cards', desc: 'Configure title, description, and high-resolution 1200x630px social preview imagery.' },
              { title: 'Core Web Vitals Benchmark', desc: 'LCP under 2.5s, FID under 100ms, and zero disruptive cumulative layout shifts (CLS).' },
              { title: 'Structured Data Schema (Article / Organization)', desc: 'Embed valid JSON-LD schema to unlock rich snippets in search results.' },
              { title: 'Semantic Hierarchy (H1, H2, H3)', desc: 'Only one H1 per page containing primary search intent keywords, followed by logical subheadings.' },
              { title: 'Accessible Alt Text on All Visuals', desc: 'Descriptive, natural language alt attributes without keyword spamming.' },
            ].map((item, idx) => (
              <div key={item.title} className="p-4 bg-navy/[0.02] border border-navy/10 rounded-sm flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange/20 text-orange flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold font-mono">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-navy text-sm mb-0.5">{item.title}</h4>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOWNLOADABLE FRAMEWORKS */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLUEPRINTS.map((t) => (
              <div
                key={t.title}
                className="bg-white p-6 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-orange uppercase tracking-wider block mb-2">
                    {t.format}
                  </span>
                  <h4 className="font-heading font-bold text-base text-navy mb-2">{t.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{t.desc}</p>
                </div>
                <div className="pt-6 border-t border-navy/5 mt-6 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDownloadBlueprint(t)}
                    className="flex items-center gap-1.5 text-xs font-heading font-semibold text-orange hover:text-white bg-orange/10 hover:bg-orange px-3 py-1.5 rounded transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Blueprint
                  </button>
                  <button
                    onClick={() => setActiveBlueprint(t)}
                    className="text-xs font-heading font-semibold text-navy/60 hover:text-navy hover:bg-navy/5 px-2.5 py-1.5 rounded transition-all flex items-center gap-1"
                    title="Preview blueprint text"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Toast Notification when Downloaded */}
          <AnimatePresence>
            {downloadToast && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="fixed bottom-6 right-6 z-50 bg-navy text-ivory border border-orange/40 shadow-2xl p-4 rounded-md flex items-center gap-3 max-w-md"
              >
                <div className="w-8 h-8 rounded-full bg-orange/20 text-orange flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-heading font-bold text-white">Blueprint Downloaded</div>
                  <div className="text-[11px] text-muted">{downloadToast}</div>
                </div>
                <button
                  onClick={() => setDownloadToast(null)}
                  className="p-1 text-ivory/60 hover:text-white rounded-full hover:bg-white/10 ml-auto"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Preview */}
          <AnimatePresence>
            {activeBlueprint && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-navy/20 rounded-md max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
                >
                  <div className="p-5 border-b border-navy/10 flex items-center justify-between bg-ivory">
                    <div>
                      <span className="text-[10px] font-mono text-orange uppercase tracking-wider block">
                        {activeBlueprint.format}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-navy">
                        {activeBlueprint.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveBlueprint(null)}
                      className="p-2 text-navy/60 hover:text-navy rounded-full hover:bg-navy/5"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto font-mono text-xs text-navy/85 bg-white whitespace-pre-wrap leading-relaxed select-text">
                    {activeBlueprint.content}
                  </div>
                  <div className="p-4 border-t border-navy/10 bg-ivory flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">{activeBlueprint.filename}</span>
                    <button
                      onClick={() => {
                        handleDownloadBlueprint(activeBlueprint);
                        setActiveBlueprint(null);
                      }}
                      className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .md File
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
