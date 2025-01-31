//file:lib/auth.ts
import { type Session } from 'next-auth'
import { type JWT } from 'next-auth/jwt'

/**
 * Custom session type extending NextAuth Session
 */
export interface VaultifySession extends Session {
  user: {
    id: string
    email: string
    name?: string
    role: 'user' | 'admin'
    twoFactorEnabled: boolean
  }
}

/**
 * Custom JWT type extending NextAuth JWT
 */
export interface VaultifyJWT extends JWT {
  userId: string
  role: 'user' | 'admin'
  twoFactorEnabled: boolean
}

/**
 * Authentication states for the application
 */
export const authStates = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  LOADING: 'loading',
} as const

/**
 * Checks if user has required role
 */
export const hasRole = (session: VaultifySession | null, requiredRole: 'user' | 'admin'): boolean => {
  if (!session?.user) return false
  return session.user.role === requiredRole
}

/**
 * Checks if user has 2FA enabled
 */
export const isTwoFactorEnabled = (session: VaultifySession | null): boolean => {
  return session?.user?.twoFactorEnabled ?? false
}

/**
 * Validates authentication state and redirects if necessary
 */
export const validateAuthState = async (
  session: VaultifySession | null,
  requiredRole: 'user' | 'admin' = 'user'
): Promise<{
  isAuthenticated: boolean
  redirect?: { destination: string; permanent: boolean }
}> => {
  if (!session) {
    return {
      isAuthenticated: false,
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (!hasRole(session, requiredRole)) {
    return {
      isAuthenticated: false,
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    }
  }

  return { isAuthenticated: true }
}

/**
 * Gets user session safely with type checking
 */
export const getAuthSession = async (): Promise<VaultifySession | null> => {
  try {
    const { getSession } = await import('next-auth/react')
    const session = await getSession()
    return session as VaultifySession
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

/**
 * Validates password requirements
 */
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Creates a rate limiter key for authentication attempts
 */
export const getRateLimiterKey = (identifier: string): string => {
  return `auth-attempt:${identifier}`
}

/**
 * Formats authentication errors for consistent handling
 */
export const formatAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An authentication error occurred'
}