import { Suspense } from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import KnowledgeContent from '@/components/editorial/KnowledgeContent';

export const metadata: Metadata = {
  title: 'Marketing Knowledge Library — MARKETECTURE',
  description:
    'Master the foundational frameworks, models, and analytical principles governing modern marketing — from Kotlerian 4Ps and STP to behavioural economics, DAGMAR, and performance unit economics.',
};

export default function KnowledgeLibraryPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="MARKETING KNOWLEDGE LIBRARY"
        title="Frameworks That Shape Marketing Thinking."
        description="Marketing intuition is honed by rigorous theory. Explore interactive, actionable breakdowns of classical and modern marketing models with real-world case examples and strategic takeaways."
      />

      <section className="py-20">
        <div className="editorial-container">
          <Suspense fallback={<div className="py-20 text-center text-muted text-sm">Loading knowledge library...</div>}>
            <KnowledgeContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
