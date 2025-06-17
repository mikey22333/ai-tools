import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/admin/clear-auth
 * Clear admin authentication cookies
 */
export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'Authentication cleared' 
    })
    
    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear authentication' },
      { status: 500 }
    )
  }
}
