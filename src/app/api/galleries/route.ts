import { NextResponse } from 'next/server';
import { photoGalleries } from '@/data/mock';
import { ApiResponse, PhotoGallery } from '@/types';

export async function GET() {
  const response: ApiResponse<PhotoGallery[]> = {
    success: true,
    data: photoGalleries
  };

  return NextResponse.json(response);
}
