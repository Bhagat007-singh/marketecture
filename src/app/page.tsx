import { Metadata } from 'next';
import OverstoryStudioLanding, {
  OvsLogo,
  OvsQuote,
  OvsCase,
  OvsService,
  OvsStep,
  OvsLink,
} from '@/components/ui/overstory-studio-landing';
import CampaignFolderVault from '@/components/campaigns/CampaignFolderVault';
import AIDeskFeature from '@/components/ai-tools/AIDeskFeature';

export const metadata: Metadata = {
  title: 'MARKETECTURE — Where Marketing Ideas Take Shape',
  description:
    'MARKETECTURE is an open marketing intelligence and architecture platform. We deconstruct iconic Indian and global campaigns into repeatable psychological frameworks, viral distribution mechanics, and full-funnel playbooks.',
};

const NAV_LINKS: OvsLink[] = [
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Case Studies', href: '#work' },
  { label: 'AI Desk', href: '#ai-desk' },
  { label: '3D Vault', href: '#vault' },
  { label: 'Strategy Hub', href: '/strategy-hub' },
  { label: 'Methodology', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

const LOGOS: OvsLogo[] = [
  { name: 'BLINKIT', mark: 'knot', type: 'heavy', image: '/images/brand-logos/blinkit.png' },
  { name: 'ZOMATO', mark: 'slash', type: 'heavy', image: '/images/brand-logos/zomato.png' },
  { name: 'APPLE', mark: 'knot', type: 'sans', image: '/images/brand-logos/apple.png' },
  { name: 'AMUL', mark: 'leaf', type: 'serif', image: '/images/brand-logos/amul.jpg' },
  { name: 'MARKETECTURE', mark: 'scribe', type: 'heavy', image: '/images/brand-logos/uploaded-logo.png' },
  { name: 'NIKE', mark: 'watch', type: 'heavy' },
  { name: 'BOAT', mark: 'venn', type: 'sans' },
];

const MANIFESTO = {
  kicker: 'The Architecture of Influence',
  text: 'Marketing is not guessing. It is architecture. [team] We deconstruct iconic Indian and global campaigns into repeatable psychological frameworks, viral distribution mechanics, [chart] and full-funnel playbooks — from Kotlerian foundations to modern memetic growth.',
};

const STATS = [
  { value: 26, suffix: '+', label: 'deep-dive campaign teardowns' },
  { value: 10, suffix: '+', label: 'proven strategic frameworks (4Ps, STP, Porter’s)' },
  { value: 50, suffix: '+', label: 'curated AI marketing tools & workflows' },
  { value: 100, suffix: '%', label: 'open-access strategic intelligence' },
];

const SERVICES: { kicker: string; title: string; text: string; items: OvsService[] } = {
  kicker: 'Core Research Pillars',
  title: 'From cultural tension to category-defining market dominance.',
  text: 'Explore our four dedicated research pillars, bridging classical academic marketing theory with fast-moving modern viral playbooks.',
  items: [
    {
      title: 'Indian Breakouts',
      art: 'brand',
      time: '10 Case Studies',
      text: 'Vernacular communication, festival triggers, memetic delivery notifications, and street-smart Indian consumer psychology.',
      tags: ['Blinkit', 'Zomato', 'Amul Girl', 'Paper Boat', 'boAt D2C'],
    },
    {
      title: 'Global Titans',
      art: 'site',
      time: '8 Case Studies',
      text: 'Decade-spanning brand positioning, emotional resonance, and global scale from the world’s most enduring brands.',
      tags: ['Nike', 'Apple', 'Share a Coke', 'Dove', 'Red Bull'],
    },
    {
      title: 'Strategy Hub & Frameworks',
      art: 'system',
      time: '6 Core Models',
      text: 'Rigorous execution templates for Kotler’s 4Ps/7Ps, STP Segmentation, Porter’s Five Forces, and DAGMAR Conversion Funnels.',
      tags: ['Kotlerian 4Ps', 'STP Matrix', 'Porter’s 5 Forces', 'AIDA Funnels'],
    },
    {
      title: 'AI Marketing Directory',
      art: 'product',
      time: '50+ Tools',
      text: 'The next-generation stack for modern growth teams: automated creative generation, predictive copywriting, and market intelligence.',
      tags: ['Prompt Architecture', 'Copy AI', 'Creative Generation', 'Attribution'],
    },
  ],
};

const FEATURED_CASES: OvsCase[] = [
  {
    client: 'Blinkit',
    mark: 'knot',
    image: '/images/brand-logos/blinkit.png',
    kind: 'Quick Commerce & Viral Banter',
    title: '10-minute delivery economics and the nationwide viral billboard banter with Zomato.',
    metric: '10 Min',
    metricLabel: 'instant fulfillment SLA powering $13B+ valuation',
    year: '2023-Present',
    mock: 'mobile',
    tint: ['#fef08a', '#eab308'],
    href: '/campaigns/blinkit-quick-commerce-topical-marketing',
  },
  {
    client: 'Zomato',
    mark: 'slash',
    image: '/images/brand-logos/zomato.png',
    kind: 'Indian Viral Growth',
    title: 'How humor, push notification banter, and outdoor topicality built India’s food-tech giant.',
    metric: '+142%',
    metricLabel: 'organic share of voice via topical wit',
    year: '2024',
    mock: 'chat',
    tint: ['#fee2e2', '#ef4444'],
    href: '/campaigns/zomato-social-media-humour',
  },
  {
    client: 'Apple',
    mark: 'knot',
    image: '/images/brand-logos/apple.png',
    kind: 'Global Brand Revival',
    title: 'The 1997 "Think Different" masterstroke that resurrected Apple from near-bankruptcy.',
    metric: '$3T',
    metricLabel: 'cultural equity & category transformation',
    year: '1997',
    mock: 'doc',
    tint: ['#e2e8f0', '#475569'],
    href: '/campaigns/apple-think-different-comeback',
  },
  {
    client: 'Amul',
    mark: 'leaf',
    image: '/images/brand-logos/amul.jpg',
    kind: 'Topical Advertising Legacy',
    title: 'The Amul Girl: 58+ years of uninterrupted daily commentary capturing India’s cultural pulse.',
    metric: '58+ Yrs',
    metricLabel: 'longest-running topical brand campaign',
    year: '1966-Present',
    mock: 'dashboard',
    tint: ['#fef3c7', '#f59e0b'],
    href: '/campaigns/amul-girl-topical-advertising',
  },
  {
    client: 'Nike',
    mark: 'watch',
    kind: 'Iconic Positioning',
    title: 'From running shoe challenger to universal symbol of grit, courage, and human potential.',
    metric: '18x',
    metricLabel: 'revenue expansion over 3 decades',
    year: '1988-Present',
    mock: 'mobile',
    tint: ['#e0e7ff', '#4338ca'],
    href: '/campaigns/nike-just-do-it-evolution',
  },
];

const STEPS: OvsStep[] = [
  {
    name: 'Tension',
    when: 'Phase 1',
    title: 'Cultural Tension & Consumer Truth',
    text: 'Every great campaign starts with an unarticulated human truth or cultural friction that mainstream advertising is ignoring.',
  },
  {
    name: 'Architecture',
    when: 'Phase 2',
    title: 'Strategic Positioning & STP',
    text: 'Apply Kotler’s STP framework and positioning axes to carve an uncontested mental category in the consumer’s mind.',
  },
  {
    name: 'Creative',
    when: 'Phase 3',
    title: 'Memetic & Emotional Storytelling',
    text: 'Turn the positioning into high-voltage creative expression — whether through topical wit, emotional storytelling, or provocative media.',
  },
  {
    name: 'Scale',
    when: 'Phase 4',
    title: 'Omnichannel Distribution & Reinforcement',
    text: 'Distribute across digital touchpoints, performance funnels, community advocacy, and physical spaces for compounding brand recall.',
  },
];

const QUOTES: OvsQuote[] = [
  {
    quote:
      'When you have written your headline, you have spent eighty cents out of your dollar. If it doesn’t sell, it isn’t creative.',
    name: 'David Ogilvy',
    role: 'Father of Modern Advertising',
    mark: 'scribe',
  },
  {
    quote:
      'Marketing takes a day to learn and a lifetime to master. If you are not a brand, you are a commodity.',
    name: 'Philip Kotler',
    role: 'Professor & Author, Marketing Management',
    mark: 'leaf',
  },
  {
    quote:
      'Great advertising doesn’t feel like advertising. It feels like an insight shared between two friends who understand each other.',
    name: 'Piyush Pandey',
    role: 'Former Executive Chairman, Ogilvy India',
    mark: 'knot',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What makes Marketecture different from other marketing blogs?',
    a: 'Marketecture doesn’t write superficial news. We treat marketing as an architectural discipline, breaking down real business numbers, cultural tensions, Kotlerian frameworks, and exact creative execution strategies.',
  },
  {
    q: 'Are all the case studies and frameworks really free?',
    a: 'Yes. All 26 teardowns across Indian breakout brands, global iconic campaigns, and strategic frameworks are 100% free to read, bookmark, and reference.',
  },
  {
    q: 'How are the Indian marketing case studies selected?',
    a: 'We curate campaigns that fundamentally shifted consumer behavior, created cultural catchphrases, or pioneered new distribution channels in India (e.g. Zomato, Amul, Paper Boat, boAt).',
  },
  {
    q: 'Can I use these frameworks in my agency or MBA studies?',
    a: 'Absolutely. Our Kotlerian 4Ps, STP matrices, and Porter’s Five Forces breakdowns are designed specifically for marketing practitioners, founders, and MBA students.',
  },
  {
    q: 'Can I submit a campaign for Marketecture to analyze?',
    a: 'Yes. You can contact us anytime with campaign links, background data, and creative assets for our editorial team to review.',
  },
];

const FOOTER_DATA = {
  columns: [
    {
      title: 'Intelligence',
      links: [
        { label: 'All Campaigns', href: '/campaigns' },
        { label: 'Indian Breakouts', href: '/indian-marketing' },
        { label: 'Global Titans', href: '/global-marketing' },
        { label: 'Strategy Hub', href: '/strategy-hub' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'AI Tools Directory', href: '/ai-marketing-desk' },
        { label: 'Marketing Frameworks', href: '/knowledge-library' },
        { label: 'Brand Comparisons', href: '/india-vs-global' },
        { label: 'Community', href: '/marketing-circle' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub Repository', href: 'https://github.com/Bhagat007-singh/marketecture' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Twitter / X', href: 'https://x.com' },
        { label: 'Contact Team', href: '/contact' },
      ],
    },
  ],
  city: 'New Delhi · Mumbai · Bangalore',
  timeZone: 'Asia/Kolkata',
  note: 'MARKETECTURE — Where Marketing Ideas Take Shape.',
};

export default function HomePage() {
  return (
    <OverstoryStudioLanding
      brand="MARKETECTURE"
      season="autumn"
      seed={42}
      theme="dark"
      themeToggle={true}
      ctaButtonText="Explore Vault"
      status="✦ 26 IN-DEPTH MARKETING CASE STUDIES & STRATEGIC PLAYBOOKS"
      hero={{
        lead: 'Marketing Intelligence For',
        words: ['Brands', 'Agencies', 'Strategists', 'Founders', 'Growth Teams'],
        tail: 'Where Ideas Take Shape.',
        trusted: 'Iconic case studies & campaign architecture analyzed from',
        cue: 'Scroll to explore marketing architecture',
      }}
      links={NAV_LINKS}
      logos={LOGOS}
      manifesto={MANIFESTO}
      stats={STATS}
      services={SERVICES}
      work={{
        kicker: 'Featured Case Studies',
        title: 'Iconic campaigns decoded down to the atom.',
        next: 'Explore all 26 teardowns',
        items: FEATURED_CASES,
      }}
      process={{
        kicker: 'The Marketecture Methodology',
        title: 'From cultural tension to enduring market icon.',
        steps: STEPS,
      }}
      quotes={QUOTES}
      pricing={null}
      faq={{
        kicker: 'Knowledge Base FAQ',
        title: 'Everything you need to know about Marketecture.',
        text: 'Curious about how we deconstruct campaigns or how to collaborate? Here are the answers.',
        items: FAQ_ITEMS,
      }}
      cta={{
        title: 'Where Marketing Ideas Take Shape.',
        text: 'Dive into the vault of case studies, master timeless marketing frameworks, and discover the tools shaping modern growth.',
        button: 'Explore Campaign Archive',
      }}
      footer={FOOTER_DATA}
      email="hello@marketecture.agency"
      currency="$"
      newsletter={false}
    >
      {/* AI Marketing Intelligence Desk Feature */}
      <div id="ai-desk" data-sec="ai-desk" className="py-6 scroll-mt-20">
        <AIDeskFeature />
      </div>

      {/* Interactive Frosted-Glass 3D Folder Vault */}
      <div id="vault" data-sec="vault" className="pt-6 scroll-mt-20">
        <CampaignFolderVault />
      </div>
    </OverstoryStudioLanding>
  );
}
