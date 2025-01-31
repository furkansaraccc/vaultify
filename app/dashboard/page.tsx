//file:app/dashboard/page.tsx
'use client';
import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Plus, Clock, Star, AlertTriangle } from 'lucide-react';

// Add this interface before the Password interface
interface VaultEntry {
  id: string;
  data: {
    title?: string;
    username?: string;
    strength?: 'weak' | 'medium' | 'strong';
  };
}

// Define the Password interface to match the VaultEntry structure
interface Password {
  id: string;
  title: string;
  username: string;
  lastAccessed: string;
  strength: 'weak' | 'medium' | 'strong';
}

export default function DashboardPage() {
  const [recentPasswords, setRecentPasswords] = useState<Password[]>([]);
  const [securityScore, setSecurityScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch vault entries from the API
  useEffect(() => {
    const fetchVaultEntries = async () => {
      try {
        const response = await fetch('/api/vault');
        if (!response.ok) {
          throw new Error('Failed to fetch vault entries');
        }
        const data = await response.json();

        // Transform the API data into the Password interface format
        const passwords: Password[] = data.map((entry: VaultEntry) => ({
          id: entry.id,
          title: entry.data.title || 'Untitled',
          username: entry.data.username || 'No username',
          lastAccessed: 'Recently', // Placeholder, replace with actual last accessed time
          strength: entry.data.strength || 'medium', // Default to medium if not provided
        }));

        setRecentPasswords(passwords);

        // Calculate security score based on password strengths
        const strongCount = passwords.filter((p) => p.strength === 'strong').length;
        const totalCount = passwords.length;
        const score = totalCount > 0 ? Math.round((strongCount / totalCount) * 100) : 100;
        setSecurityScore(score);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaultEntries();
  }, []);

  // Handle adding a new password
  const handleAddPassword = async () => {
    // Redirect to a form or modal for adding a new password
    // This can be implemented using a modal or a separate page
    console.log('Add new password clicked');
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Password Vault</h1>
        <Button className="flex items-center gap-2" onClick={handleAddPassword}>
          <Plus className="w-4 h-4" />
          Add New Password
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Security Score</h3>
              <p className="text-2xl font-bold text-blue-500">{securityScore}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="font-semibold">Total Passwords</h3>
              <p className="text-2xl font-bold">{recentPasswords.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="font-semibold">Weak Passwords</h3>
              <p className="text-2xl font-bold">
                {recentPasswords.filter((p) => p.strength === 'weak').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recently Accessed */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recently Accessed
        </h2>
        <div className="space-y-4">
          {recentPasswords.map((password) => (
            <div
              key={password.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{password.title}</h3>
                <p className="text-sm text-gray-500">{password.username}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{password.lastAccessed}</span>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}