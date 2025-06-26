import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this'

export interface AdminUser {
  email: string
  isAdmin: boolean
}

export async function verifyAdminToken(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    if (decoded.isAdmin && decoded.email) {
      return {
        email: decoded.email,
        isAdmin: decoded.isAdmin
      }
    }

    return null
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await verifyAdminToken()
  
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
  
  return admin
}
