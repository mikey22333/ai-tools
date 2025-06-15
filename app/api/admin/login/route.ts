import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Admin credentials - in production, you might want to use a database
const ADMIN_CREDENTIALS = [
  {
    email: 'admin@allaitools.com',
    password: '$2b$10$PD8ALoW8dRYUqGVLNqis5OrKrfVcOil0wrdNYl0ZV9dRVronAgxjm' // 'admin123' hashed
  }
  // Add more admin users here if needed
]

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find admin user
    const admin = ADMIN_CREDENTIALS.find(cred => cred.email === email.toLowerCase())
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, admin.password)
    
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        email: admin.email,
        isAdmin: true,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET
    )

    // Set cookie
    const response = NextResponse.json({ 
      success: true, 
      user: { email: admin.email, isAdmin: true }
    })
    
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
