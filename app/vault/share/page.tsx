//file:app/vault/share/page.tsx
'use client';
import { useState } from 'react';
import { Users, Clock, Shield, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import '@/styles/globals.css'
export default function VaultSharePage() {
  const [sharedItems] = useState([
    {
      id: 1,
      name: 'Company WiFi',
      sharedWith: ['alice@company.com', 'bob@company.com'],
      expires: '2025-02-28',
      permissions: 'view'
    },
    {
      id: 2,
      name: 'Team Dashboard',
      sharedWith: ['team@company.com'],
      expires: '2025-03-15',
      permissions: 'view,edit'
    }
  ]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shared Vault Items</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Users className="h-4 w-4" />
          Share New Item
        </button>
      </div>

      <div className="space-y-4">
        {sharedItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{item.name}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Shared With</p>
                  <div className="mt-1">
                    {item.sharedWith.map((email) => (
                      <div key={email} className="text-sm">{email}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Expires
                  </p>
                  <p className="text-sm mt-1">{item.expires}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Permissions
                  </p>
                  <p className="text-sm mt-1 capitalize">{item.permissions.replace(',', ', ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="mt-6">
        <AlertDescription>
          Shared items are automatically revoked when they expire. You can manually revoke access at any time.
        </AlertDescription>
      </Alert>
    </div>
  );
}