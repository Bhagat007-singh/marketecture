import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import IndianMarketingContent from '@/components/editorial/IndianMarketingContent';

export const metadata: Metadata = {
  title: 'Indian Marketing — MARKETECTURE',
  description:
    'Decode the world’s most dynamic consumer market. Explore vernacular communication, festival marketing, cricket sponsorship dynamics, D2C revolutions, and rural Bharat consumer psychology.',
};

export default function IndianMarketingPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="INDIAN MARKETING"
        title="The World's Most Complex Consumer Market."
        description="India is not a monolithic territory. It is a continent of diverse languages, regional loyalties, joint family economic dynamics, and unmatched digital leapfrogging. Here is how breakthrough brands navigate Bharat."
      />

      <section className="py-20">
        <div className="editorial-container">
          <IndianMarketingContent />
        </div>
      </section>
    </div>
  );
}
