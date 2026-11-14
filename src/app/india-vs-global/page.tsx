import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ComparisonContent from '@/components/editorial/ComparisonContent';

export const metadata: Metadata = {
  title: 'India vs Global Brand Comparisons — MARKETECTURE',
  description:
    'Comparative analysis of category rivals: Amul vs Ben & Jerry’s, boAt vs Beats, Flipkart vs Amazon, Swiggy vs DoorDash, Zomato vs Uber Eats across positioning, communication, pricing, and cultural moats.',
};

export default function IndiaVsGlobalPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="INDIA VS GLOBAL"
        title="Same Category. Different Playbook."
        description="Side-by-side strategic deconstructions comparing India’s market champions with their global counterparts across positioning, cultural leverage, unit economics, and digital engagement."
      />

      <section className="py-20">
        <div className="editorial-container">
          <ComparisonContent />
        </div>
      </section>
    </div>
  );
}
