//file:components/layout/Footer.tsx
import Link from 'next/link'
import { Shield } from 'lucide-react'
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Vaultify</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Secure password management for individuals and teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vault/share" className="text-base text-gray-500 hover:text-gray-900">
                  Password Vault
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-base text-gray-500 hover:text-gray-900">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/settings" className="text-base text-gray-500 hover:text-gray-900">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-base text-gray-500 hover:text-gray-900">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {currentYear} Vaultify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer