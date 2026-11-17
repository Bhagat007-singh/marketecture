import { NextRequest, NextResponse } from 'next/server';
import { searchContent, decodeHTMLEntities, stripHTML } from '@/lib/wordpress';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ posts: [], pages: [] });
  }

  try {
    const { posts, pages } = await searchContent(q);

    const formattedPosts = posts.map((p) => ({
      id: p.id,
      title: decodeHTMLEntities(p.title.rendered),
      excerpt: stripHTML(decodeHTMLEntities(p.excerpt.rendered)).slice(0, 140),
      slug: p.slug,
      link: `/campaigns/${p.slug}`,
      type: 'post',
    }));

    const formattedPages = pages.map((p) => ({
      id: p.id,
      title: decodeHTMLEntities(p.title.rendered),
      excerpt: stripHTML(decodeHTMLEntities(p.excerpt.rendered)).slice(0, 140),
      slug: p.slug,
      link: p.slug === 'home' ? '/' : `/${p.slug}`,
      type: 'page',
    }));

    return NextResponse.json({ posts: formattedPosts, pages: formattedPages });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute search query' },
      { status: 500 }
    );
  }
}
