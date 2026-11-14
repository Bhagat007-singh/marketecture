import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marketecture5.wordpress.com';

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
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/campaigns/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    return [...routes, ...postUrls];
  } catch {
    return routes;
  }
}
