//file:components/layout/Navbar.tsx
'use client';
import Link from 'next/link'
import { Shield, Settings, ChartBar, Home, Lock } from 'lucide-react'
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/vault/share', label: 'Vault', icon: Lock },
    { href: '/security', label: 'Security', icon: Shield },
    { href: '/reports', label: 'Reports', icon: ChartBar },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Vaultify
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive(href)
                      ? 'border-b-2 border-indigo-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
              <span className="sr-only">User menu</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">U</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar