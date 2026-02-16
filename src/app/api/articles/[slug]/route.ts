import { NextRequest, NextResponse } from 'next/server';
import { getArticleBySlug } from '@/data/mock';
import { ApiResponse, Article } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    const response: ApiResponse<Article> = {
      success: false,
      error: 'Article not found'
    };
    return NextResponse.json(response, { status: 404 });
  }

  const response: ApiResponse<Article> = {
    success: true,
    data: article
  };

  return NextResponse.json(response);
}
