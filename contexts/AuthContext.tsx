'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success?: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: 'Not implemented' }),
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        setIsAdmin(data.user.isAdmin)
        return { success: true }
      } else {
        return { error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { error: 'Network error' }
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    setIsAdmin(false)
  }

  const checkAuthStatus = async () => {
    try {
      // Add retry logic for initial fetch failures
      let retries = 3
      let lastError = null
      
      while (retries > 0) {
        try {
          const response = await fetch('/api/admin/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.user) {
              setUser(data.user)
              setIsAdmin(data.user.isAdmin)
            }
          } else if (response.status === 401) {
            // 401 is expected when not logged in
            console.log('User not authenticated')
          } else {
            console.log('Auth check failed with status:', response.status)
          }
          
          // If we get here, the request succeeded (even if user is not authenticated)
          break
          
        } catch (fetchError) {
          lastError = fetchError
          retries--
          
          if (retries > 0) {
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 200))
          }
        }
      }
      
      // If all retries failed, log the error
      if (retries === 0 && lastError) {
        throw lastError
      }
      
    } catch (error) {
      console.error('Auth check error after retries:', error)
      // Don't log this as an error in development when server might not be ready
      if (process.env.NODE_ENV === 'production') {
        console.error('Failed to check authentication status')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Add a small delay to ensure server is ready
    const timer = setTimeout(() => {
      checkAuthStatus()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
