//file:app/settings/page.tsx
// file: app/settings/page.tsx
'use client';
import '@/styles/globals.css'
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [theme, setTheme] = useState('light');

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password update logic
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    // TODO: Implement theme change logic
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Settings</h1>

      <Card className="mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Account Settings</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </form>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                Theme
              </label>
              <div className="flex gap-4">
                <Button
                  variant={theme === 'light' ? 'primary' : 'secondary'}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'secondary'}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Advanced</h2>
          <div className="space-y-4">
            <Button variant="secondary" onClick={() => {/* TODO: Export data logic */}}>
              Export Vault Data
            </Button>
            <Button variant="danger" onClick={() => {/* TODO: Account deletion logic */}}>
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}