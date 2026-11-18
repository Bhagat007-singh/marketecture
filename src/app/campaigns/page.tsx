import { Suspense } from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import CampaignFolderVault from '@/components/campaigns/CampaignFolderVault';
import CampaignGrid from '@/components/campaigns/CampaignGrid';
import { fallbackCampaigns } from '@/lib/campaigns-data';
import { getPosts, wpPostToCampaign } from '@/lib/wordpress';
import { Campaign } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Campaign Archive — MARKETECTURE',
  description:
    'Analyse breakthrough advertising campaigns and unpack the thinking, consumer insights, creative mechanics, and media execution behind iconic Indian and global marketing work.',
};

export const revalidate = 300;

export default async function CampaignsPage() {
  let campaigns: Campaign[] = [];
  try {
    const { posts } = await getPosts({ perPage: 20 });
    const wpCampaigns = posts.map(wpPostToCampaign);
    // Merge WordPress posts with fallbackCampaigns to ensure featured hero images and full coverage
    const mergedWp: Campaign[] = wpCampaigns.map((wp): Campaign => {
      const fb = fallbackCampaigns.find((f) => f.slug === wp.slug);
      return {
        ...wp,
        featuredImage: wp.featuredImage || fb?.featuredImage,
      };
    });
    campaigns = [...mergedWp];
    for (const fb of fallbackCampaigns) {
      if (!campaigns.some((c) => c.slug === fb.slug)) {
        campaigns.push(fb);
      }
    }
  } catch (error) {
    console.error('Failed to load campaigns from WordPress API:', error);
    campaigns = [...fallbackCampaigns];
  }

  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="CAMPAIGN ARCHIVE"
        title="The Thinking Behind the Work."
        description="Go beyond aesthetic admiration. We deconstruct the business challenge, target consumer insight, creative platform, channel mix, verified outcomes, and enduring strategic lessons behind seminal marketing campaigns."
      />

      {/* Interactive Glass Folder Campaign Vaults */}
      <CampaignFolderVault />

      <section className="py-20">
        <div className="editorial-container">
          <Suspense fallback={<div className="py-20 text-center text-muted text-sm">Loading campaigns...</div>}>
            <CampaignGrid initialCampaigns={campaigns} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
