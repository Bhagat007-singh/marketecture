import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import CommunityContent from '@/components/editorial/CommunityContent';

export const metadata: Metadata = {
  title: 'Marketing Circle — MARKETECTURE',
  description:
    'Join our community of brand strategists, creative directors, and marketing students. Participate in campaign critiques, strategic debates, and live WordPress discussion threads.',
};

export default function MarketingCirclePage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="MARKETING CIRCLE"
        title="Where Marketing Thinkers Convene."
        description="A community space for questions, thoughtful debate, campaign analysis, and collaborative learning. Bring your observations, interrogate emerging trends, and contribute to the discourse."
      />

      <section className="py-20">
        <div className="editorial-container">
          <CommunityContent />
        </div>
      </section>
    </div>
  );
}
