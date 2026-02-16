import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

// In a real app, this would connect to a database
const subscribers: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Valid email is required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (subscribers.includes(email)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Email already subscribed'
      };
      return NextResponse.json(response, { status: 409 });
    }

    subscribers.push(email);

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: { message: 'Successfully subscribed to newsletter' }
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Invalid request body'
    };
    return NextResponse.json(response, { status: 400 });
  }
}
