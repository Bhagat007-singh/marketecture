'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Rocket,
  Monitor,
  BarChart3,
  FileText,
  Sliders,
  CheckCircle2,
  Sparkles,
  Download,
  Share2,
  Calendar,
} from 'lucide-react';

interface StrategyPillar {
  title: string;
  category: string;
  icon: typeof Compass;
  summary: string;
  steps: string[];
  templateDesc: string;
}

const pillars: StrategyPillar[] = [
  {
    title: 'Brand Positioning & Identity Blueprint',
    category: 'Brand Foundations',
    icon: Compass,
    summary:
      'The architecture of consumer perception. Establish who your brand serves, the distinct category frame of reference, and the single most compelling reason to believe.',
    steps: [
      '1. Frame of Reference: Define the competitive market category.',
      '2. Target Insight: Pinpoint the tension your audience experiences.',
      '3. Core Proposition: Draft the singular, non-negotiable brand promise.',
      '4. Reasons to Believe (RTB): Document concrete proof points.',
      '5. Brand Archetype & Tone: Establish verbal and visual guardrails.',
    ],
    templateDesc: 'Downloadable Brand Key & Perceptual Map Canvas',
  },
  {
    title: 'Omnichannel Campaign & GTM Planning',
    category: 'Campaign Execution',
    icon: Rocket,
    summary:
      'Choreographing a high-impact launch from teaser phase and hero tentpole moment to sustained community advocacy and retargeting loops.',
    steps: [
      '1. Objective Setting: Establish single primary commercial metric.',
      '2. Creative Platform: Formulate the modular campaign umbrella.',
      '3. Phased Flighting: Tease (15%) → Launch (55%) → Sustain (30%).',
      '4. Channel Interlock: Align Paid, Owned, and Earned touchpoints.',
      '5. Contingency Playbook: Pre-approve real-time response triggers.',
    ],
    templateDesc: 'GTM Flighting Spreadsheet & Creative Brief Matrix',
  },
  {
    title: 'Media Channel Allocation & Budgeting',
    category: 'Media & Digital',
    icon: Monitor,
    summary:
      'Balancing the 60/40 Binet & Field rule: allocating 60% of budget toward long-term brand building and 40% toward short-term direct response activation.',
    steps: [
      '1. Brand vs Activation Ratio: Default to 60/40 rule of thumb.',
      '2. Channel Weighting: Allocate by customer touchpoint affinity.',
      '3. Frequency Capping: Guard against ad fatigue and rising CPMs.',
      '4. Marginal CAC Curve: Monitor diminishing returns per channel.',
      '5. Attribution Model: Combine MMM and incrementality lift tests.',
    ],
    templateDesc: 'Media Budget Planner & Incrementality Worksheet',
  },
  {
    title: 'Competitor Intelligence & Perceptual Audit',
    category: 'Analytics & Optimization',
    icon: BarChart3,
    summary:
      'Mapping competitor whitespace, share of voice (SOV), pricing elasticity, and creative positioning to pinpoint uncontested market niches.',
    steps: [
      '1. Direct vs Indirect Competitors: Map substitutes and alternatives.',
      '2. SOV vs SOM Matrix: Track Excess Share of Voice (ESOV).',
      '3. Messaging Analysis: Deconstruct competitor ad hooks and claims.',
      '4. Pricing Corridors: Map value delivery against price points.',
      '5. Whitespace Identification: Identify underserved customer jobs.',
    ],
    templateDesc: 'Competitive Matrix & Perceptual Gap Analysis Sheet',
  },
];

export default function StrategyContent() {
  // Campaign Planner State
  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState('Brand Awareness');
  const [audience, setAudience] = useState('');
  const [budgetTier, setBudgetTier] = useState('₹5L – ₹25L');
  const [duration, setDuration] = useState('3 Months');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'Social Media (Meta)',
    'Influencer Seeding',
  ]);
  const [generatedPlan, setGeneratedPlan] = useState<boolean>(false);

  const channelOptions = [
    'Social Media (Meta)',
    'Search (Google Ads)',
    'Influencer Seeding',
    'Short-Form Video (Reels/YouTube)',
    'Programmatic Display',
    'Content & SEO',
    'OOH / Outdoor Hoardings',
    'Email & CRM Marketing',
  ];

  const handleChannelToggle = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName.trim() || !audience.trim()) return;
    setGeneratedPlan(true);
  };

  return (
    <div className="space-y-24">
      {/* SECTION 1: Strategic Playbooks */}
      <div>
        <div className="mb-12">
          <span className="editorial-label">Frameworks</span>
          <h2 className="text-display-md text-navy mt-1">Core Strategic Playbooks</h2>
          <p className="text-muted text-sm max-w-2xl mt-2">
            Structured methodologies used by leading agencies and brand consultancies to translate fuzzy market data into decisive execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-8 rounded-sm border border-navy/10 hover:border-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-orange">
                      {pillar.category}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-navy/5 text-orange flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6">
                    {pillar.summary}
                  </p>

                  <div className="p-4 bg-navy/[0.02] border border-navy/5 rounded-sm space-y-2 mb-6">
                    <h4 className="text-[11px] font-heading font-bold uppercase tracking-wider text-navy">
                      Execution Sequence:
                    </h4>
                    {pillar.steps.map((step) => (
                      <p key={step} className="text-xs text-navy/80">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-navy/5 flex items-center justify-between text-xs text-orange font-heading font-semibold">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> {pillar.templateDesc}
                  </span>
                  <span className="text-navy/40 uppercase text-[10px]">Reference Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Interactive Campaign Planner */}
      <div id="planner" className="bg-navy text-ivory p-8 md:p-12 rounded-sm border border-white/10 relative overflow-hidden scroll-mt-24">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/30 text-orange text-xs font-heading font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" /> Interactive Planning Utility
          </div>
          <h2 className="text-display-md text-ivory mb-3">
            Interactive Campaign Blueprint Generator
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Configure your campaign parameters below to construct an instantaneous strategic brief outline, flighting breakdown, and channel balance matrix.
          </p>
        </div>

        <form onSubmit={handleGeneratePlan} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-2">
              Campaign Name *
            </label>
            <input
              type="text"
              required
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Summer Refresh 2025"
              className="w-full bg-white/[0.05] border border-white/15 rounded-sm px-4 py-3 text-sm text-ivory placeholder:text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-2">
              Primary Objective
            </label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-navy-light border border-white/15 rounded-sm px-4 py-3 text-sm text-ivory focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            >
              <option value="Brand Awareness & Salience">Brand Awareness &amp; Salience</option>
              <option value="Audience Engagement & Community">Audience Engagement &amp; Community</option>
              <option value="Direct Response / Lead Generation">Direct Response / Lead Generation</option>
              <option value="Product Launch / Category Education">Product Launch / Category Education</option>
              <option value="Retention & Repeat Purchase">Retention &amp; Repeat Purchase</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-2">
              Target Audience Persona *
            </label>
            <input
              type="text"
              required
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Urban Gen-Z, tier 1-2 students & early-career pros"
              className="w-full bg-white/[0.05] border border-white/15 rounded-sm px-4 py-3 text-sm text-ivory placeholder:text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                Budget Tier
              </label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-navy-light border border-white/15 rounded-sm px-4 py-3 text-sm text-ivory focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              >
                <option value="Under ₹1 Lakh (Bootstrap)">Under ₹1L (Bootstrap)</option>
                <option value="₹1L – ₹5L (Growth)">₹1L – ₹5L (Growth)</option>
                <option value="₹5L – ₹25L (Mid-Market)">₹5L – ₹25L (Mid-Market)</option>
                <option value="₹25L – ₹1 Crore (Scale)">₹25L – ₹1Cr (Scale)</option>
                <option value="₹1 Crore+ (Enterprise)">₹1Cr+ (Enterprise)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-navy-light border border-white/15 rounded-sm px-4 py-3 text-sm text-ivory focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              >
                <option value="2 Weeks Sprint">2 Weeks Sprint</option>
                <option value="1 Month Intensive">1 Month Intensive</option>
                <option value="3 Months Flight">3 Months Flight</option>
                <option value="6 Months Campaign">6 Months Campaign</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ivory/80 mb-3">
              Distribution Channels (Select All Applicable)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {channelOptions.map((opt) => {
                const isSelected = selectedChannels.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleChannelToggle(opt)}
                    className={`p-3 rounded-sm text-left text-xs transition-all border ${
                      isSelected
                        ? 'bg-orange/15 border-orange text-orange font-semibold'
                        : 'bg-white/[0.02] border-white/10 text-muted hover:border-white/30 hover:text-ivory'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2 pt-2">
            <button type="submit" className="btn-primary py-3.5 px-8 text-xs">
              Generate Strategic Brief Outline
            </button>
          </div>
        </form>

        {/* Generated Brief Modal / Display */}
        {generatedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-surface rounded-sm border border-orange/40 text-ivory"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange" />
                <h3 className="text-lg font-heading font-bold text-ivory">
                  Strategic Brief: {campaignName}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-orange uppercase tracking-wider">
                Status: Ready for Team Review
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mb-8">
              <div className="bg-white/5 p-4 rounded">
                <span className="text-muted block mb-1">Target Persona</span>
                <strong className="text-ivory">{audience}</strong>
              </div>
              <div className="bg-white/5 p-4 rounded">
                <span className="text-muted block mb-1">Commercial Goal</span>
                <strong className="text-ivory">{objective}</strong>
              </div>
              <div className="bg-white/5 p-4 rounded">
                <span className="text-muted block mb-1">Resource Envelope</span>
                <strong className="text-ivory">{budgetTier} • {duration}</strong>
              </div>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-ivory/80">
              <h4 className="font-heading font-bold text-sm text-orange uppercase tracking-wider">
                Recommended Channel Flighting Architecture:
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-muted">
                <li>
                  <strong className="text-ivory">Channels Deployed:</strong>{' '}
                  {selectedChannels.join(', ')}
                </li>
                <li>
                  <strong className="text-ivory">Phase 1 (Week 1–2):</strong> Audience seeding &amp; teaser hooks. Focus on high-retention video formats to populate custom remarketing pools.
                </li>
                <li>
                  <strong className="text-ivory">Phase 2 (Mid-Flight):</strong> Omnichannel tentpole push. Synchronize paid social with search intent bidding and creator testimonials.
                </li>
                <li>
                  <strong className="text-ivory">Phase 3 (Final 30%):</strong> Hard direct response retargeting with urgency-driven creative variants and frequency capping.
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
