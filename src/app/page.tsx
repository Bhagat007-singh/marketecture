import { Metadata } from 'next';
import HomeHero from '@/components/hero/HomeHero';
import FeatureStrip from '@/components/hero/FeatureStrip';
import FeaturedAndPopular from '@/components/editorial/FeaturedAndPopular';
import CampaignFolderVault from '@/components/campaigns/CampaignFolderVault';
import IndianSpotlight from '@/components/editorial/IndianSpotlight';
import GlobalSpotlight from '@/components/editorial/GlobalSpotlight';
import IndiaVsGlobalPreview from '@/components/editorial/IndiaVsGlobalPreview';
import KnowledgePreview from '@/components/editorial/KnowledgePreview';
import StrategyHubPreview from '@/components/editorial/StrategyHubPreview';
import AIMarketingPreview from '@/components/editorial/AIMarketingPreview';
import ToolsPreview from '@/components/editorial/ToolsPreview';
import CommunityPreview from '@/components/editorial/CommunityPreview';
import NewsletterSection from '@/components/editorial/NewsletterSection';

export const metadata: Metadata = {
  title: 'MARKETECTURE — Where Marketing Ideas Take Shape',
  description:
    'Understand marketing, decode ideas, and build strategies with Marketecture. An editorial knowledge platform exploring campaigns, consumer behavior, and brand strategy across Indian and global markets.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A101C]">
      {/* 1. Hero Section (Word-by-word headline + Statue Megaphone Billboard composite) */}
      <HomeHero />

      {/* 2. Feature Strip: "Explore Marketing from Every Angle" */}
      <FeatureStrip />

      {/* 3. Featured Campaign (Zomato) + Popular Sections (Knowledge, Strategy, AI Desk) */}
      <FeaturedAndPopular />

      {/* 3.5. Interactive Glass Folder Campaign Vaults */}
      <CampaignFolderVault />

      {/* 4. Indian Marketing Spotlight */}
      <IndianSpotlight />

      {/* 5. Global Marketing Spotlight */}
      <GlobalSpotlight />

      {/* 6. India vs Global Brand Comparisons */}
      <IndiaVsGlobalPreview />

      {/* 7. Marketing Knowledge Library Preview */}
      <KnowledgePreview />

      {/* 8. Strategy Hub Playbooks */}
      <StrategyHubPreview />

      {/* 9. AI Marketing Desk Workbench */}
      <AIMarketingPreview />

      {/* 10. Interactive Tools & Working Calculators */}
      <ToolsPreview />

      {/* 11. Marketing Circle Community */}
      <CommunityPreview />

      {/* 12. Weekly Intelligence Briefing Subscription */}
      <NewsletterSection />
    </div>
  );
}
