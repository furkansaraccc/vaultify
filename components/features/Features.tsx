//file:components/features/Features.tsx
import React from 'react';
import { Shield, Key, Share2, History, Lock, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';  // Keep relative path but use named import
import '@/styles/globals.css'
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Secure Password Storage',
    description: 'Store your passwords with military-grade encryption, ensuring your sensitive data remains protected.',
    icon: <Lock className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Password Sharing',
    description: 'Safely share passwords with team members while maintaining full control over access permissions.',
    icon: <Share2 className="w-6 h-6 text-green-500" />,
  },
  {
    title: 'Access History',
    description: 'Track when and where your passwords are accessed with detailed activity logs.',
    icon: <History className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account with 2FA support.',
    icon: <Shield className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: 'Password Generator',
    description: 'Generate strong, unique passwords with our built-in password generator.',
    icon: <Key className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: 'Breach Alerts',
    description: 'Get instant notifications if your accounts are compromised in data breaches.',
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Secure Password Management
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Everything you need to keep your passwords safe and accessible
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="h-full"
              hoverable
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;