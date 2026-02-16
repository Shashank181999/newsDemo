import { NextResponse } from 'next/server';
import { events } from '@/data/mock';
import { ApiResponse, Event } from '@/types';

export async function GET() {
  const response: ApiResponse<Event[]> = {
    success: true,
    data: events
  };

  return NextResponse.json(response);
}
