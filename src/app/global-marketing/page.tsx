import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import GlobalMarketingContent from '@/components/editorial/GlobalMarketingContent';

export const metadata: Metadata = {
  title: 'Global Marketing — MARKETECTURE',
  description:
    'Explore how world-class brands build meaning, market share, and consumer loyalty across continents. Cross-cultural strategy, global brand architecture, and international campaign analyses.',
};

export default function GlobalMarketingPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="GLOBAL MARKETING"
        title="Ideas That Cross Borders."
        description="Explore the strategies of transnational mega-brands navigating the tension between global scale and local cultural intimacy. From cross-cultural semiotics to international media ecosystems."
      />

      <section className="py-20">
        <div className="editorial-container">
          <GlobalMarketingContent />
        </div>
      </section>
    </div>
  );
}
