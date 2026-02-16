import { NextRequest, NextResponse } from 'next/server';
import { searchArticles, videos } from '@/data/mock';
import { ApiResponse, SearchResult } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    const response: ApiResponse<SearchResult> = {
      success: false,
      error: 'Search query is required'
    };
    return NextResponse.json(response, { status: 400 });
  }

  const matchingArticles = searchArticles(query);
  const lowerQuery = query.toLowerCase();
  const matchingVideos = videos.filter(v =>
    v.title.toLowerCase().includes(lowerQuery) ||
    v.description.toLowerCase().includes(lowerQuery)
  );

  const response: ApiResponse<SearchResult> = {
    success: true,
    data: {
      articles: matchingArticles,
      videos: matchingVideos,
      totalResults: matchingArticles.length + matchingVideos.length
    }
  };

  return NextResponse.json(response);
}
