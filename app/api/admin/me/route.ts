import { NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'

export async function GET() {
  try {
    const admin = await verifyAdminToken()
    
    if (admin) {
      return NextResponse.json({ user: admin, success: true })
    } else {
      return NextResponse.json({ user: null, success: false }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { user: null, success: false, error: 'Authentication failed' }, 
      { status: 500 }
    )
  }
}
