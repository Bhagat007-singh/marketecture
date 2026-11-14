'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Compass,
  Search,
  Share2,
  Users,
  FileCode,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  Send,
  Loader2,
} from 'lucide-react';
import parse from 'html-react-parser';

type ToolId =
  | 'campaign-idea'
  | 'strategy-builder'
  | 'brand-analysis'
  | 'social-content'
  | 'influencer-planner'
  | 'seo-assistant';

interface ToolMeta {
  id: ToolId;
  name: string;
  icon: typeof Lightbulb;
  description: string;
}

const tools: ToolMeta[] = [
  {
    id: 'campaign-idea',
    name: 'Campaign Idea Generator',
    icon: Lightbulb,
    description: 'Generate high-impact creative concepts, narrative hooks, and channel flight plans.',
  },
  {
    id: 'strategy-builder',
    name: 'Marketing Strategy Builder',
    icon: Compass,
    description: 'Structure comprehensive positioning frameworks, GTM timelines, and unit economic goals.',
  },
  {
    id: 'brand-analysis',
    name: 'Brand Analysis Assistant',
    icon: Search,
    description: 'Audit brand identity, perceptual differentiation, and competitive messaging whitespace.',
  },
  {
    id: 'social-content',
    name: 'Social Media Copilot',
    icon: Share2,
    description: 'Craft thumb-stopping video hooks, carousel architectures, captions, and hashtag clusters.',
  },
  {
    id: 'influencer-planner',
    name: 'Influencer Marketing Planner',
    icon: Users,
    description: 'Design creator selection criteria, collaboration formats, contracts, and ROI benchmarks.',
  },
  {
    id: 'seo-assistant',
    name: 'SEO & Intent Architect',
    icon: FileCode,
    description: 'Deconstruct search intent clusters, topical authority maps, and on-page optimization.',
  },
];

export default function AIWorkspace() {
  const [activeTool, setActiveTool] = useState<ToolId>('campaign-idea');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [campaignInputs, setCampaignInputs] = useState({
    brandName: 'Paper Boat',
    product: 'Traditional Indian festive beverage range (Thandai & Rose Milk)',
    targetAudience: 'Tier 1 & 2 urban millennials living away from hometowns',
    objective: 'Brand Awareness & Festive Salience',
    budget: '₹5L – ₹25L',
    duration: '1 Month',
    platforms: ['Instagram', 'YouTube', 'OOH'],
  });

  const [strategyInputs, setStrategyInputs] = useState({
    brandName: '',
    industry: '',
    challenge: '',
    targetSegment: '',
    timeline: '3 Months',
  });

  const [brandInputs, setBrandInputs] = useState({
    brandName: '',
    industry: '',
    focus: 'Full Brand Audit & Positioning',
  });

  const [socialInputs, setSocialInputs] = useState({
    brandTopic: '',
    platform: 'Instagram',
    format: 'Carousel & Reel Script',
    tone: 'Witty & Analytical',
    context: '',
  });

  const [influencerInputs, setInfluencerInputs] = useState({
    brandName: '',
    goal: 'Product Launch Awareness',
    budget: '₹5L – ₹25L',
    tier: 'Micro & Mid-Tier Creators',
    channels: 'Instagram & YouTube Shorts',
  });

  const [seoInputs, setSeoInputs] = useState({
    topic: '',
    keywords: '',
    focusArea: 'Comprehensive Content Architecture & Intent Mapping',
  });

  const handleToolChange = (id: ToolId) => {
    setActiveTool(id);
    setResult(null);
    setErrorMessage(null);
  };

  const handlePlatformCheckbox = (plat: string) => {
    const exists = campaignInputs.platforms.includes(plat);
    if (exists) {
      setCampaignInputs({
        ...campaignInputs,
        platforms: campaignInputs.platforms.filter((p) => p !== plat),
      });
    } else {
      setCampaignInputs({
        ...campaignInputs,
        platforms: [...campaignInputs.platforms, plat],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setResult(null);

    let payloadInputs: Record<string, unknown> = {};
    if (activeTool === 'campaign-idea') payloadInputs = campaignInputs;
    if (activeTool === 'strategy-builder') payloadInputs = strategyInputs;
    if (activeTool === 'brand-analysis') payloadInputs = brandInputs;
    if (activeTool === 'social-content') payloadInputs = socialInputs;
    if (activeTool === 'influencer-planner') payloadInputs = influencerInputs;
    if (activeTool === 'seo-assistant') payloadInputs = seoInputs;

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: activeTool, inputs: payloadInputs }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResult(data.content);
      setIsDemoMode(data.isDemo);
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        'An error occurred while connecting to the AI workbench. Falling back to local demonstration mode.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result && typeof window !== 'undefined') {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleToolChange(t.id)}
              className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-navy text-ivory border-orange shadow-lg shadow-orange/10'
                  : 'bg-white text-navy/70 border-navy/10 hover:border-orange/50 hover:text-navy'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-sm flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-orange text-white' : 'bg-navy/5 text-orange'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-xs leading-snug">
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Workbench (Form on Left, Output on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 5 Cols */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-sm border border-navy/15 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy/10">
            <div>
              <span className="editorial-label text-[10px]">Configured Model Tool</span>
              <h3 className="font-heading font-bold text-lg text-navy">
                {tools.find((t) => t.id === activeTool)?.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setErrorMessage(null);
              }}
              className="text-xs text-muted hover:text-orange flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Tool 1: Campaign Idea */}
            {activeTool === 'campaign-idea' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignInputs.brandName}
                    onChange={(e) =>
                      setCampaignInputs({ ...campaignInputs, brandName: e.target.value })
                    }
                    placeholder="e.g. Paper Boat"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Product / Proposition *
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignInputs.product}
                    onChange={(e) =>
                      setCampaignInputs({ ...campaignInputs, product: e.target.value })
                    }
                    placeholder="e.g. Traditional Indian beverage range"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Target Consumer Cohort *
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignInputs.targetAudience}
                    onChange={(e) =>
                      setCampaignInputs({ ...campaignInputs, targetAudience: e.target.value })
                    }
                    placeholder="e.g. Homesick urban professionals"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Objective
                    </label>
                    <select
                      value={campaignInputs.objective}
                      onChange={(e) =>
                        setCampaignInputs({ ...campaignInputs, objective: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Brand Awareness">Brand Awareness</option>
                      <option value="Engagement & Virality">Engagement &amp; Virality</option>
                      <option value="Product Launch">Product Launch</option>
                      <option value="Festive Footfall & Sales">Festive Footfall &amp; Sales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Budget Tier
                    </label>
                    <select
                      value={campaignInputs.budget}
                      onChange={(e) =>
                        setCampaignInputs({ ...campaignInputs, budget: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Under ₹1L">Under ₹1L</option>
                      <option value="₹1L – ₹5L">₹1L – ₹5L</option>
                      <option value="₹5L – ₹25L">₹5L – ₹25L</option>
                      <option value="₹25L – ₹1Cr">₹25L – ₹1Cr</option>
                      <option value="₹1Cr+">₹1Cr+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1.5">
                    Distribution Platforms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Instagram', 'YouTube', 'OOH', 'Twitter/X', 'LinkedIn', 'Influencer'].map((p) => {
                      const isChecked = campaignInputs.platforms.includes(p);
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => handlePlatformCheckbox(p)}
                          className={`px-3 py-1 rounded text-[11px] border transition-all ${
                            isChecked
                              ? 'bg-orange/15 border-orange text-orange font-semibold'
                              : 'bg-navy/5 border-navy/10 text-muted hover:border-navy/30'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Tool 2: Strategy Builder */}
            {activeTool === 'strategy-builder' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={strategyInputs.brandName}
                    onChange={(e) =>
                      setStrategyInputs({ ...strategyInputs, brandName: e.target.value })
                    }
                    placeholder="e.g. Urban Company"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Industry / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={strategyInputs.industry}
                    onChange={(e) =>
                      setStrategyInputs({ ...strategyInputs, industry: e.target.value })
                    }
                    placeholder="e.g. Home Services Marketplace"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Core Strategic Challenge *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={strategyInputs.challenge}
                    onChange={(e) =>
                      setStrategyInputs({ ...strategyInputs, challenge: e.target.value })
                    }
                    placeholder="e.g. Increasing customer repeat order frequency from 1.4x to 3.2x annually without eroding margins."
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange resize-none"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Target Segment
                  </label>
                  <input
                    type="text"
                    value={strategyInputs.targetSegment}
                    onChange={(e) =>
                      setStrategyInputs({ ...strategyInputs, targetSegment: e.target.value })
                    }
                    placeholder="e.g. Dual-income metropolitan homeowners"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
              </>
            )}

            {/* Tool 3: Brand Analysis */}
            {activeTool === 'brand-analysis' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandInputs.brandName}
                    onChange={(e) =>
                      setBrandInputs({ ...brandInputs, brandName: e.target.value })
                    }
                    placeholder="e.g. Lenskart"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Industry / Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandInputs.industry}
                    onChange={(e) =>
                      setBrandInputs({ ...brandInputs, industry: e.target.value })
                    }
                    placeholder="e.g. Omnichannel Eyewear"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Audit Focus
                  </label>
                  <select
                    value={brandInputs.focus}
                    onChange={(e) =>
                      setBrandInputs({ ...brandInputs, focus: e.target.value })
                    }
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  >
                    <option value="Full Brand Audit & Positioning">Full Brand Audit &amp; Positioning</option>
                    <option value="Competitor Whitespace & Perception">Competitor Whitespace &amp; Perception</option>
                    <option value="Identity & Verbal Voice Analysis">Identity &amp; Verbal Voice Analysis</option>
                    <option value="Pricing Power & Moat Assessment">Pricing Power &amp; Moat Assessment</option>
                  </select>
                </div>
              </>
            )}

            {/* Tool 4: Social Media Content */}
            {activeTool === 'social-content' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Brand / Subject Matter *
                  </label>
                  <input
                    type="text"
                    required
                    value={socialInputs.brandTopic}
                    onChange={(e) =>
                      setSocialInputs({ ...socialInputs, brandTopic: e.target.value })
                    }
                    placeholder="e.g. Zomato / Biryani craving hook"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Platform
                    </label>
                    <select
                      value={socialInputs.platform}
                      onChange={(e) =>
                        setSocialInputs({ ...socialInputs, platform: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Twitter/X">Twitter/X</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Tone
                    </label>
                    <select
                      value={socialInputs.tone}
                      onChange={(e) =>
                        setSocialInputs({ ...socialInputs, tone: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Witty & Irreverent">Witty &amp; Irreverent</option>
                      <option value="Authoritative & Strategic">Authoritative &amp; Strategic</option>
                      <option value="Inspirational & Narrative">Inspirational &amp; Narrative</option>
                      <option value="Educational & Framework-Led">Educational &amp; Framework-Led</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Specific Message / Campaign Angle
                  </label>
                  <textarea
                    rows={2}
                    value={socialInputs.context}
                    onChange={(e) =>
                      setSocialInputs({ ...socialInputs, context: e.target.value })
                    }
                    placeholder="e.g. Celebrating weekend culinary cravings with a relatable guilt-free twist."
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange resize-none"
                  />
                </div>
              </>
            )}

            {/* Tool 5: Influencer Planner */}
            {activeTool === 'influencer-planner' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={influencerInputs.brandName}
                    onChange={(e) =>
                      setInfluencerInputs({ ...influencerInputs, brandName: e.target.value })
                    }
                    placeholder="e.g. Sugar Cosmetics"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Creator Tier
                    </label>
                    <select
                      value={influencerInputs.tier}
                      onChange={(e) =>
                        setInfluencerInputs({ ...influencerInputs, tier: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Nano (1k–10k followers)">Nano (1k–10k)</option>
                      <option value="Micro (10k–100k followers)">Micro (10k–100k)</option>
                      <option value="Mid-Tier (100k–500k followers)">Mid-Tier (100k–500k)</option>
                      <option value="Macro / Celebrity (500k+)">Macro / Celebrity (500k+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                      Budget
                    </label>
                    <select
                      value={influencerInputs.budget}
                      onChange={(e) =>
                        setInfluencerInputs({ ...influencerInputs, budget: e.target.value })
                      }
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                    >
                      <option value="Under ₹2L">Under ₹2L</option>
                      <option value="₹2L – ₹10L">₹2L – ₹10L</option>
                      <option value="₹10L – ₹50L">₹10L – ₹50L</option>
                      <option value="₹50L+">₹50L+</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Tool 6: SEO Assistant */}
            {activeTool === 'seo-assistant' && (
              <>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Website / Business Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={seoInputs.topic}
                    onChange={(e) =>
                      setSeoInputs({ ...seoInputs, topic: e.target.value })
                    }
                    placeholder="e.g. B2B Performance Marketing Agency"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1">
                    Target Keyword Seed
                  </label>
                  <input
                    type="text"
                    value={seoInputs.keywords}
                    onChange={(e) =>
                      setSeoInputs({ ...seoInputs, keywords: e.target.value })
                    }
                    placeholder="e.g. B2B CAC reduction, SaaS attribution"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-xs justify-center flex items-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing Strategy...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Generate Strategic Intelligence
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Console: 7 Cols */}
        <div className="lg:col-span-7 bg-navy text-ivory rounded-sm border border-white/10 overflow-hidden min-h-[500px] flex flex-col justify-between">
          {/* Console Header */}
          <div className="bg-surface px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-ivory">
                Output Workbench
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isDemoMode && (
                <span className="text-[10px] font-mono uppercase bg-orange/20 text-orange px-2 py-0.5 rounded border border-orange/30">
                  Demo Fallback Mode
                </span>
              )}
              {result && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-muted hover:text-orange flex items-center gap-1 font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Markdown
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Console Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[600px] font-body text-xs leading-relaxed text-ivory/90">
            {loading && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-8 h-8 text-orange animate-spin" />
                <p className="font-heading text-sm text-ivory">
                  Marketecture Engine Deconstructing Brief...
                </p>
                <p className="text-muted text-[11px] max-w-xs">
                  Applying consumer heuristics, creative platform filters, and channel attribution models.
                </p>
              </div>
            )}

            {!loading && errorMessage && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-sm text-red-200">
                <p className="font-heading font-semibold mb-1">Workbench Notice:</p>
                <p>{errorMessage}</p>
              </div>
            )}

            {!loading && !errorMessage && !result && (
              <div className="h-64 flex flex-col items-center justify-center text-center text-muted space-y-3">
                <Sparkles className="w-8 h-8 text-orange/40" />
                <p className="font-heading text-sm text-ivory/80">
                  Console Ready for Prompt Parameters
                </p>
                <p className="text-[11px] max-w-sm">
                  Complete the parameters on the left and submit to receive structured strategic intelligence, creative hooks, or GTM plans.
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="prose prose-invert prose-sm max-w-none space-y-4">
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                  {result}
                </pre>
              </div>
            )}
          </div>

          {/* Console Footer: Rigor Disclaimer */}
          <div className="p-4 bg-surface border-t border-white/10 text-[11px] text-muted flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange shrink-0" />
            <span>
              <strong>Editorial Guardrail:</strong> AI outputs are creative ideation accelerators. Validate final campaigns against legal trademark checks and cultural sentiment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
