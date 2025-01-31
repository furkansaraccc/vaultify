//file:app/(auth)/register/page.tsx
'use client'
import '@/styles/globals.css'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const passwordRequirements = [
    {
      text: 'At least 12 characters long',
      test: (pass: string) => pass.length >= 12,
    },
    {
      text: 'Contains uppercase letter',
      test: (pass: string) => /[A-Z]/.test(pass),
    },
    {
      text: 'Contains lowercase letter',
      test: (pass: string) => /[a-z]/.test(pass),
    },
    {
      text: 'Contains number',
      test: (pass: string) => /[0-9]/.test(pass),
    },
    {
      text: 'Contains special character',
      test: (pass: string) => /[^A-Za-z0-9]/.test(pass),
    },
  ]

  const isPasswordValid = passwordRequirements.every(req => req.test(password))
  const doPasswordsMatch = password === confirmPassword

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!isPasswordValid || !doPasswordsMatch || !acceptedTerms) {
      setError('Please ensure all fields are filled correctly and terms are accepted.')
      setIsLoading(false)
      return
    }

    try {
      // Add registration logic here
      // Example: const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) })
      // if (!response.ok) throw new Error('Registration failed')

      // Redirect to initial vault setup
      // Example: window.location.href = '/dashboard'
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || 'An error occurred during registration.')
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Vaultify</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Setting up Vaultify was a breeze. Within minutes, our entire 
              team was up and running with secure password management.&rdquo;
            </p>
            <footer className="text-sm">Michael Chen, Security Lead at SecureStack</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Create your account</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email below to create your account
            </p>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Master Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="mt-2 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className={`text-sm ${req.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                        {req.test(password) ? '✓' : '✗'} {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Master Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full p-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    terms of service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isPasswordValid || !doPasswordsMatch || !acceptedTerms}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </Card>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}