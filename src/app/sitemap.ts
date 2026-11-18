import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';

const FALLBACK_CAMPAIGN_SLUGS = [
  'blinkit-quick-commerce-topical-marketing',
  'amul-girl-topical-advertising',
  'share-a-coke-personalisation',
  'zomato-social-media-humour',
  'nike-just-do-it-evolution',
  'paper-boat-nostalgia-marketing',
  'apple-think-different-comeback',
  'boat-youth-lifestyle-audio',
  'zepto-quick-commerce-speed',
  'inshorts-news-brevity-product',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marketecture.agency';

  const routes: MetadataRoute.Sitemap = [
    '',
    '/campaigns',
    '/knowledge-library',
    '/strategy-hub',
    '/indian-marketing',
    '/global-marketing',
    '/india-vs-global',
    '/ai-marketing-desk',
    '/tools-resources',
    '/marketing-circle',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const { posts } = await getPosts({ perPage: 20 });
    const postSlugs = posts.length > 0 ? posts.map((p) => p.slug) : FALLBACK_CAMPAIGN_SLUGS;
    const postUrls: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
      url: `${baseUrl}/campaigns/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    return [...routes, ...postUrls];
  } catch {
    const fallbackUrls: MetadataRoute.Sitemap = FALLBACK_CAMPAIGN_SLUGS.map((slug) => ({
      url: `${baseUrl}/campaigns/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    return [...routes, ...fallbackUrls];
  }
}
