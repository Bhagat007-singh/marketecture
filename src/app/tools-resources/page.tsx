import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ToolsContent from '@/components/calculators/ToolsContent';

export const metadata: Metadata = {
  title: 'Tools & Resources — MARKETECTURE',
  description:
    'Interactive marketing calculators (CTR, CPM, CPC, Engagement Rate, ROI, ROAS), the 60/40 budget planner, pre-launch SEO checklist, and downloadable strategic frameworks.',
};

export default function ToolsResourcesPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="TOOLS & RESOURCES"
        title="Calculate. Plan. Execute."
        description="Eliminate guesswork with validated, interactive marketing calculators, media planning worksheets, technical checklists, and professional agency strategy templates."
      />

      <section className="py-20">
        <div className="editorial-container">
          <ToolsContent />
        </div>
      </section>
    </div>
  );
}
