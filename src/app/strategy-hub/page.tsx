import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import StrategyContent from '@/components/editorial/StrategyContent';

export const metadata: Metadata = {
  title: 'Strategy Hub — MARKETECTURE',
  description:
    'Actionable brand strategy playbooks, creative briefs, GTM frameworks, channel allocation guides, and interactive campaign planning tools.',
};

export default function StrategyHubPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="STRATEGY HUB"
        title="From Insight to Action."
        description="Transform theoretical marketing principles into decisive, disciplined brand execution. Access structured frameworks, GTM blueprints, and our interactive campaign planner."
      />

      <section className="py-20">
        <div className="editorial-container">
          <StrategyContent />
        </div>
      </section>
    </div>
  );
}
