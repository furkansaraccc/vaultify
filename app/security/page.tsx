// file:app/security/page.tsx
'use client';
import { useState, useMemo } from 'react';
import { Shield, AlertTriangle, Lock, History, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import '@/styles/globals.css'
export default function SecurityPage() {
  const [securityChecks] = useState([
    {
      name: 'Two-Factor Authentication',
      status: 'enabled',
      lastChecked: '2024-01-30',
      description: 'Your account is protected with 2FA'
    },
    {
      name: 'Password Strength',
      status: 'warning',
      lastChecked: '2024-01-30',
      description: '2 passwords need to be updated'
    },
    {
      name: 'Data Encryption',
      status: 'enabled',
      lastChecked: '2024-01-30',
      description: 'All data is encrypted with AES-256'
    }
  ]);

  const securityScore = useMemo(() => {
    const enabledChecks = securityChecks.filter(check => check.status === 'enabled').length;
    return Math.round((enabledChecks / securityChecks.length) * 100);
  }, [securityChecks]);
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Security Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">{securityScore}%</div>
            <p className="text-gray-600 mt-2">Your vault security is strong</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-500" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Device</p>
                  <p className="text-sm text-gray-600">Last access: Just now</p>
                </div>
                <button className="text-red-500 text-sm">Logout</button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-purple-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Password updated - 2h ago</p>
              <p className="text-sm text-gray-600">New login - 5h ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Security Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {securityChecks.map((check) => (
              <div key={check.name} className="flex items-start gap-4">
                {check.status === 'enabled' ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                ) : (
                  <XCircle className="h-6 w-6 text-yellow-500 mt-1" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{check.name}</h3>
                    <span className="text-sm text-gray-500">
                      Last checked: {check.lastChecked}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Regular security audits help maintain the safety of your stored credentials.
        </AlertDescription>
      </Alert>
    </div>
  );
}