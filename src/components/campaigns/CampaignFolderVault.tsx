'use client';

import Link from 'next/link';
import GlassFolder, { FolderFile } from '@/components/ui/glass-folder-cards';
import { ArrowRight, Sparkles, FolderArchive } from 'lucide-react';

const indianCampaignFiles: FolderFile[] = [
  {
    name: 'Blinkit: 10-Min Delivery & Viral Billboards',
    meta: 'Quick Commerce & OOH Memes',
    art: 'ember',
    href: '/campaigns/blinkit-quick-commerce-topical-marketing',
  },
  {
    name: 'Zepto: 10-Minute Speed & Wedding Billboard',
    meta: 'Quick Commerce SLA & Social OOH',
    art: 'dusk',
    href: '/campaigns/zepto-quick-commerce-speed',
  },
  {
    name: 'Inshorts: 60-Word News Brevity as Product',
    meta: 'Brevity Product & Native Ads',
    art: 'glacier',
    href: '/campaigns/inshorts-news-brevity-product',
  },
  {
    name: 'boAt Lifestyle: D2C Audio Community',
    meta: 'Wearables & Youth Tribe',
    art: 'aurora',
    href: '/campaigns/boat-youth-lifestyle-audio',
  },
  {
    name: 'Zomato: Conversational Tone & Push CRM',
    meta: 'CRM & Viral Memes',
    art: 'ember',
    href: '/campaigns/zomato-social-media-humour',
  },
  {
    name: 'Amul Girl: 58+ Years of Topical Hoardings',
    meta: 'OOH & News Commentary',
    art: 'verdant',
    href: '/campaigns/amul-girl-topical-advertising',
  },
  {
    name: 'Paper Boat: Childhood Nostalgia Branding',
    meta: 'Beverage Packaging Storytelling',
    art: 'dusk',
    href: '/campaigns/paper-boat-nostalgia-marketing',
  },
];

const globalCampaignFiles: FolderFile[] = [
  {
    name: 'Nike: 35-Year Evolution of Just Do It',
    meta: 'Cultural Ethos & Athletics',
    art: 'aurora',
    href: '/campaigns/nike-just-do-it-evolution',
  },
  {
    name: 'Apple: Think Different 1997 Comeback',
    meta: 'Brand Identity & Comeback',
    art: 'glacier',
    href: '/campaigns/apple-think-different-comeback',
  },
  {
    name: 'Share a Coke: Personalisation Engine',
    meta: 'Global Packaging Activation',
    art: 'ember',
    href: '/campaigns/share-a-coke-personalisation',
  },
  {
    name: 'Dove: Real Beauty & Self-Esteem Project',
    meta: 'Emotional Brand Purpose',
    art: 'dusk',
    href: '/campaigns?category=global',
  },
];

const galleryCampaignFiles: FolderFile[] = [
  {
    name: 'Blinkit × Zomato: "Doodh / Kheer" Billboards',
    meta: 'Viral Street Hoardings (Gurugram)',
    art: 'ember',
    href: '/campaigns/blinkit-quick-commerce-topical-marketing',
  },
  {
    name: 'Amul Girl: 4,000+ Topical Hoardings Archive',
    meta: '58 Years of Satirical Cartoons',
    art: 'verdant',
    href: '/campaigns/amul-girl-topical-advertising',
  },
  {
    name: 'Zepto × Manyavar: "10-Min Dulha" Billboard',
    meta: 'Social-to-OOH Real-Time Stunt',
    art: 'dusk',
    href: '/campaigns/zepto-quick-commerce-speed',
  },
  {
    name: 'boAt: "Lost in Nirvana" & RCB Campaign',
    meta: 'Lifestyle & Celebrity Audio Ads',
    art: 'aurora',
    href: '/campaigns/boat-youth-lifestyle-audio',
  },
  {
    name: 'Inshorts: 60-Word Native Ad Cards',
    meta: 'Clean Editorial Ad Architecture',
    art: 'glacier',
    href: '/campaigns/inshorts-news-brevity-product',
  },
  {
    name: 'Share a Coke: Named Packaging Showcase',
    meta: 'Global Pack-as-Media Visuals',
    art: 'ember',
    href: '/campaigns/share-a-coke-personalisation',
  },
];

const strategyFiles: FolderFile[] = [
  {
    name: 'Kotlerian 4Ps & 7Ps Marketing Architecture',
    meta: 'Foundational Marketing Mix',
    art: 'verdant',
    href: '/knowledge-library?cat=fundamentals',
  },
  {
    name: 'Segmentation, Targeting & Positioning (STP)',
    meta: 'Market Definition & Moats',
    art: 'dusk',
    href: '/knowledge-library?cat=fundamentals',
  },
  {
    name: "Porter's Five Forces Industry Analysis",
    meta: 'Competitive Dynamics Audit',
    art: 'aurora',
    href: '/knowledge-library?cat=fundamentals',
  },
  {
    name: 'The AIDA Conversion Funnel & DAGMAR',
    meta: 'Hierarchy of Advertising Effects',
    art: 'glacier',
    href: '/knowledge-library?cat=advertising',
  },
];

export default function CampaignFolderVault() {
  return (
    <section className="bg-[#0B1020] text-white py-16 sm:py-20 lg:py-24 border-b border-white/5 relative overflow-hidden">
      {/* Background Dotted Overlay & Subtle Radial Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-white opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1.1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#F28C38]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <FolderArchive className="w-4 h-4 text-[#F28C38]" />
            <span className="text-[11px] font-heading font-black uppercase tracking-[2px] text-white">
              Tactile Intelligence Vault
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Interactive Campaign Folders
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 leading-relaxed font-body">
            Hover to lean the frosted glass toward you, click to open the pocket, and explore the curated campaign case studies and strategic briefs tucked inside.
          </p>
        </div>

        {/* 4 Interactive Glass Folders Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 justify-items-center items-end">
          {/* Folder 1: Indian Campaigns */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Indian Campaigns"
              meta="7 Case Studies"
              tone="dark"
              art="ember"
              width={290}
              seed={5}
              action="more"
              labelPlacement="bottom-left"
              appearDelay={0}
              files={indianCampaignFiles}
              menu={[
                { label: 'View Indian Hub', onSelect: () => window.location.assign('/indian-marketing') },
                { label: 'Explore Blinkit Study', onSelect: () => window.location.assign('/campaigns/blinkit-quick-commerce-topical-marketing') },
                { label: 'Explore Zepto Study', onSelect: () => window.location.assign('/campaigns/zepto-quick-commerce-speed') },
                { label: 'Explore boAt Study', onSelect: () => window.location.assign('/campaigns/boat-youth-lifestyle-audio') },
                { label: 'Explore Inshorts Study', onSelect: () => window.location.assign('/campaigns/inshorts-news-brevity-product') },
              ]}
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-heading font-bold text-[#F28C38] tracking-wider uppercase">
                Regional &amp; Cultural Storytelling
              </span>
            </div>
          </div>

          {/* Folder 2: Global Campaigns */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Global Campaigns"
              meta="4 Case Studies"
              tone="dark"
              art="aurora"
              width={290}
              seed={17}
              action="more"
              labelPlacement="bottom-left"
              appearDelay={140}
              files={globalCampaignFiles}
              menu={[
                { label: 'View Global Hub', onSelect: () => window.location.assign('/global-marketing') },
                { label: 'Explore Nike Study', onSelect: () => window.location.assign('/campaigns/nike-just-do-it-evolution') },
                { label: 'Explore Share a Coke', onSelect: () => window.location.assign('/campaigns/share-a-coke-personalisation') },
                { label: 'Explore Apple Study', onSelect: () => window.location.assign('/campaigns/apple-think-different-comeback') },
              ]}
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-heading font-bold text-[#F28C38] tracking-wider uppercase">
                Worldwide Brand Movements
              </span>
            </div>
          </div>

          {/* Folder 3: Strategic Playbooks */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Strategy Playbooks"
              meta="4 Frameworks"
              tone="dark"
              art="dusk"
              width={290}
              seed={23}
              action="more"
              labelPlacement="bottom-left"
              appearDelay={280}
              files={strategyFiles}
              menu={[
                { label: 'Open Knowledge Library', onSelect: () => window.location.assign('/knowledge-library') },
                { label: 'Interactive Brief Planner', onSelect: () => window.location.assign('/strategy-hub#planner') },
              ]}
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-heading font-bold text-[#F28C38] tracking-wider uppercase">
                Kotlerian &amp; Modern Frameworks
              </span>
            </div>
          </div>

          {/* Folder 4: Creative & Ad Gallery */}
          <div className="flex flex-col items-center">
            <GlassFolder
              label="Creative Gallery"
              meta="6 Ad Showcases"
              tone="dark"
              art="verdant"
              width={290}
              seed={31}
              action="more"
              labelPlacement="bottom-left"
              appearDelay={420}
              files={galleryCampaignFiles}
              menu={[
                { label: 'View All Campaigns', onSelect: () => window.location.assign('/campaigns') },
                { label: 'Blinkit × Zomato Hoardings', onSelect: () => window.location.assign('/campaigns/blinkit-quick-commerce-topical-marketing') },
                { label: 'Amul Topical Cartoon Archive', onSelect: () => window.location.assign('/campaigns/amul-girl-topical-advertising') },
                { label: 'boAt Lost in Nirvana Creative', onSelect: () => window.location.assign('/campaigns/boat-youth-lifestyle-audio') },
              ]}
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-heading font-bold text-[#F28C38] tracking-wider uppercase">
                Ad Archive &amp; Hoardings
              </span>
            </div>
          </div>
        </div>

        {/* Micro Interaction Hint */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="font-mono text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
            Hover to lean glass · Click to fan open · Click file to read case study
          </p>
        </div>
      </div>
    </section>
  );
}
