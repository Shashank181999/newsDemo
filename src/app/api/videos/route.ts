import { NextRequest, NextResponse } from 'next/server';
import { videos } from '@/data/mock';
import { PaginatedResponse, Video } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');

  let filteredVideos = videos;

  if (category) {
    filteredVideos = videos.filter(v => v.category === category);
  }

  const total = filteredVideos.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredVideos.slice(startIndex, endIndex);

  const response: PaginatedResponse<Video> = {
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
