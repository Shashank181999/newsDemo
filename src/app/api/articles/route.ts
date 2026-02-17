import { NextRequest, NextResponse } from 'next/server';
import { getLatestPosts, getTrendingPosts, searchPosts } from '@/lib/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 50); // Max 50 articles
  const trending = searchParams.get('trending');
  const search = searchParams.get('search');

  try {
    let articles;

    if (search) {
      articles = await searchPosts(search, limit);
    } else if (trending === 'true') {
      articles = await getTrendingPosts(limit);
    } else {
      articles = await getLatestPosts(limit);
    }

    // Return with cache headers for faster subsequent loads
    return NextResponse.json(
      { articles, total: articles.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({
      articles: [],
      total: 0,
      error: 'Failed to fetch articles'
    }, { status: 500 });
  }
}
