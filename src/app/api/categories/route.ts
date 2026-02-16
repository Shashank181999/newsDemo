import { NextResponse } from 'next/server';
import { categories } from '@/data/mock';
import { ApiResponse, Category } from '@/types';

export async function GET() {
  const response: ApiResponse<Category[]> = {
    success: true,
    data: categories
  };

  return NextResponse.json(response);
}
