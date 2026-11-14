import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { getPageBySlug, decodeHTMLEntities } from '@/lib/wordpress';
import parse from 'html-react-parser';
import { Target, Compass, Award, Globe, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Marketecture — Where Marketing Ideas Take Shape',
  description:
    'Discover the vision, editorial philosophy, and analytical methodology behind MARKETECTURE — the premier marketing intelligence and learning platform.',
};

export const revalidate = 300;

export default async function AboutPage() {
  const wpPage = await getPageBySlug('about');
  const renderedContent = wpPage ? wpPage.content.rendered : '';

  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="ABOUT MARKETECTURE"
        title="Where Marketing Ideas Take Shape."
        description="Marketecture is an independent learning and discovery platform exploring the ideas, campaigns, brands, and consumer behaviour shaping modern marketing — from the streets and screens of India to global creative movements."
      />

      {/* Brand Philosophy Triple Pill */}
      <section className="py-12 bg-navy text-ivory border-y border-white/10">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-white/10 rounded-sm bg-white/[0.02]">
              <span className="text-display-md text-orange font-bold font-heading block mb-1">50%</span>
              <h3 className="font-heading font-bold text-base text-ivory mb-2">Indian Perspective</h3>
              <p className="text-xs text-muted leading-relaxed">
                Deep respect for vernacular nuance, joint-family dynamics, festive cycles, price-value equations, and Bharat’s 1.4B consumers.
              </p>
            </div>

            <div className="p-6 border border-white/10 rounded-sm bg-white/[0.02]">
              <span className="text-display-md text-ivory font-bold font-heading block mb-1">50%</span>
              <h3 className="font-heading font-bold text-base text-ivory mb-2">Global Perspective</h3>
              <p className="text-xs text-muted leading-relaxed">
                Rigorous analysis of transnational brand building, cross-cultural semiotics, global mega-campaigns, and platform economics.
              </p>
            </div>

            <div className="p-6 border border-white/10 rounded-sm bg-white/[0.02]">
              <span className="text-display-md text-orange font-bold font-heading block mb-1">100%</span>
              <h3 className="font-heading font-bold text-base text-ivory mb-2">Marketing Thinking</h3>
              <p className="text-xs text-muted leading-relaxed">
                Relentless focus on human consumer insight, distinct positioning, creative courage, unit economics, and verified outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20">
        <div className="editorial-narrow">
          {renderedContent ? (
            <div className="wp-content mb-16">
              {parse(renderedContent)}
            </div>
          ) : (
            <div className="space-y-12 text-navy/85 leading-relaxed">
              <div>
                <h2 className="text-display-sm text-navy mb-4">Our Purpose &amp; Editorial Mission</h2>
                <p className="text-base text-muted leading-relaxed mb-4">
                  Marketing is often trivialized as superficial advertising slogans, vanity social media likes, or manipulative growth hacks. At Marketecture, we believe marketing is the single most consequential discipline in modern commerce — the deliberate architectural alignment between human psychology and corporate capability.
                </p>
                <p className="text-base text-muted leading-relaxed">
                  We exist to provide marketing students, agency planners, brand managers, and ambitious founders with an intellectually rigorous, aesthetic, and practical resource.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-navy/10">
                <div className="p-6 bg-white border border-navy/10 rounded-sm">
                  <ShieldCheck className="w-6 h-6 text-orange mb-3" />
                  <h3 className="font-heading font-bold text-base text-navy mb-2">Editorial Policy</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    We never fabricate campaign metrics, invent customer testimonials, or pass off speculative predictions as audited facts. Reported results are cited with verifiable public sources.
                  </p>
                </div>

                <div className="p-6 bg-white border border-navy/10 rounded-sm">
                  <Compass className="w-6 h-6 text-orange mb-3" />
                  <h3 className="font-heading font-bold text-base text-navy mb-2">Analytical Rigor</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Every case study follows our 13-point architectural matrix, dissecting the business tension, human insight, creative platform, media choices, and enduring strategic lessons.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* WordPress Live Sync Badge */}
          <div className="mt-16 p-6 bg-navy text-ivory rounded-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
              <span>Connected to WordPress CMS Headless API</span>
            </div>
            <a
              href="https://marketecture5.wordpress.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline uppercase font-heading font-semibold tracking-wider text-[11px]"
            >
              View on WordPress.com →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
