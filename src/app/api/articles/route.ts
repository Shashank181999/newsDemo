import { NextRequest, NextResponse } from 'next/server';
import { articles, getLatestArticles, getFeaturedArticles, getTrendingArticles, getArticlesByCategory } from '@/data/mock';
import { PaginatedResponse, Article } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const trending = searchParams.get('trending');

  let filteredArticles: Article[] = [];

  if (featured === 'true') {
    filteredArticles = getFeaturedArticles(limit);
  } else if (trending === 'true') {
    filteredArticles = getTrendingArticles(limit);
  } else if (category) {
    filteredArticles = getArticlesByCategory(category);
  } else {
    filteredArticles = getLatestArticles(100);
  }

  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredArticles.slice(startIndex, endIndex);

  const response: PaginatedResponse<Article> = {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };

  return NextResponse.json(response);
}
