
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Shield, Lock, Users, Zap } from 'lucide-react'
import '@/styles/globals.css'
export default function Home() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold">
              Vaultify
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Secure Password Management for Everyone
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Keep your digital life secure with enterprise-grade encryption, 
                  seamless sharing, and advanced security features.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/register">
                    <Button size="lg">Start for free</Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to stay secure
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        {feature.icon}
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    name: 'Military-grade encryption',
    description: 'Your data is protected with AES-256 encryption, ensuring maximum security for all your sensitive information.',
    icon: <Shield className="h-6 w-6 text-white" />,
  },
  {
    name: 'Secure sharing',
    description: 'Share passwords and secure notes with team members while maintaining full control and audit logs.',
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    name: 'Zero-knowledge architecture',
    description: 'We never see your master password or decrypted data. Your privacy is guaranteed by design.',
    icon: <Lock className="h-6 w-6 text-white" />,
  },
  {
    name: 'Instant access',
    description: 'Access your passwords instantly across all your devices with our secure browser extension and mobile apps.',
    icon: <Zap className="h-6 w-6 text-white" />,
  },
]