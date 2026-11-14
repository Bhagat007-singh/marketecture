import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import AIWorkspace from '@/components/ai-tools/AIWorkspace';

export const metadata: Metadata = {
  title: 'AI Marketing Desk — MARKETECTURE',
  description:
    'An interactive AI workbench for brand strategists: generate campaign ideas, build strategic GTM blueprints, execute brand audits, and compose high-engagement social copy.',
};

export default function AIMarketingDeskPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="AI MARKETING DESK"
        title="Your AI-Powered Marketing Partner."
        description="Accelerate your strategic thinking with structured AI copilots calibrated for advertising analysis, creative ideation, social content architecture, and search intent planning."
      />

      <section className="py-20">
        <div className="editorial-container">
          <AIWorkspace />
        </div>
      </section>
    </div>
  );
}
