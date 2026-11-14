import { WPPost, WPPage, WPCategory, Campaign } from '@/lib/types';

const API_BASE = process.env.WP_API_URL || process.env.NEXT_PUBLIC_WP_API_URL || 
  'https://public-api.wordpress.com/wp/v2/sites/marketecture5.wordpress.com';

// Simple in-memory cache for server-side requests
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(url: string): string {
  return url;
}

async function fetchWithCache<T>(url: string, revalidate = 300): Promise<T> {
  const cacheKey = getCacheKey(url);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data as T;
  } catch (error) {
    // Return cached data even if expired, as fallback
    if (cached) {
      console.warn('Using stale cache due to fetch error:', error);
      return cached.data as T;
    }
    throw error;
  }
}

// Pages
export async function getPages(): Promise<WPPage[]> {
  try {
    return await fetchWithCache<WPPage[]>(`${API_BASE}/pages?per_page=20&orderby=menu_order&order=asc`);
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const pages = await fetchWithCache<WPPage[]>(`${API_BASE}/pages?slug=${encodeURIComponent(slug)}`);
    return pages[0] || null;
  } catch (error) {
    console.error(`Failed to fetch page "${slug}":`, error);
    return null;
  }
}

export async function getPageById(id: number): Promise<WPPage | null> {
  try {
    return await fetchWithCache<WPPage>(`${API_BASE}/pages/${id}`);
  } catch (error) {
    console.error(`Failed to fetch page ${id}:`, error);
    return null;
  }
}

// Posts (Campaigns)
export async function getPosts(params?: {
  perPage?: number;
  page?: number;
  categories?: number[];
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('per_page', String(params?.perPage || 12));
    searchParams.set('page', String(params?.page || 1));
    searchParams.set('_embed', 'true');
    
    if (params?.categories?.length) {
      searchParams.set('categories', params.categories.join(','));
    }
    if (params?.search) {
      searchParams.set('search', params.search);
    }
    searchParams.set('orderby', params?.orderBy || 'date');
    searchParams.set('order', params?.order || 'desc');

    const url = `${API_BASE}/posts?${searchParams.toString()}`;
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json() as WPPost[];
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const total = parseInt(response.headers.get('X-WP-Total') || '0');

    return { posts, totalPages, total };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { posts: [], totalPages: 0, total: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const posts = await fetchWithCache<WPPost[]>(
      `${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=true`
    );
    return posts[0] || null;
  } catch (error) {
    console.error(`Failed to fetch post "${slug}":`, error);
    return null;
  }
}

// Categories
export async function getCategories(): Promise<WPCategory[]> {
  try {
    return await fetchWithCache<WPCategory[]>(`${API_BASE}/categories?per_page=50`);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

// Transform WP Post to Campaign
export function wpPostToCampaign(post: WPPost): Campaign {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0];

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHTMLEntities(post.title.rendered),
    excerpt: decodeHTMLEntities(stripHTML(post.excerpt.rendered)),
    content: post.content.rendered,
    date: post.date,
    category: categories?.[0]?.name || 'Uncategorized',
    featuredImage: featuredMedia?.source_url,
    featuredImageAlt: featuredMedia?.alt_text || decodeHTMLEntities(post.title.rendered),
  };
}

// Search across posts and pages
export async function searchContent(query: string): Promise<{
  posts: WPPost[];
  pages: WPPage[];
}> {
  try {
    const [postsResult, pages] = await Promise.all([
      getPosts({ search: query, perPage: 10 }),
      fetchWithCache<WPPage[]>(`${API_BASE}/pages?search=${encodeURIComponent(query)}&per_page=10`),
    ]);
    return { posts: postsResult.posts, pages };
  } catch (error) {
    console.error('Search failed:', error);
    return { posts: [], pages: [] };
  }
}

// Utility functions
export function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, '…');
}

export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
