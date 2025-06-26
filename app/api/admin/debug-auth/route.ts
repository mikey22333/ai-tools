import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/admin/debug-auth
 * Debug authentication status (remove in production)
 */
export async function GET() {
  try {
    const hasJwtSecret = !!process.env.JWT_SECRET
    const jwtSecretValue = process.env.JWT_SECRET
    
    return NextResponse.json({
      hasJwtSecret,
      isUsingFallback: jwtSecretValue === 'your-fallback-secret-key-change-this',
      secretLength: jwtSecretValue ? jwtSecretValue.length : 0
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Debug failed' },
      { status: 500 }
    )
  }
}
