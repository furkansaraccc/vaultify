//file:components/features/SecurityInfo.tsx
import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import '@/styles/globals.css'
const SecurityInfo = () => {
  const securityStatus = {
    passwordStrength: 'Strong',
    lastPasswordChange: '2024-01-15',
    twoFactorEnabled: true,
    recentLoginAttempts: 3,
    vulnerabilities: 0,
    lastSecurityScan: '2024-01-29',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Strong':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Weak':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Password Status</h3>
              <p className={`flex items-center gap-2 ${getStatusColor(securityStatus.passwordStrength)}`}>
                <CheckCircle className="h-5 w-5" />
                {securityStatus.passwordStrength}
              </p>
              <p className="text-sm text-gray-500">
                Last changed: {securityStatus.lastPasswordChange}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              {securityStatus.twoFactorEnabled ? (
                <p className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  Enabled
                </p>
              ) : (
                <p className="flex items-center gap-2 text-red-500">
                  <XCircle className="h-5 w-5" />
                  Disabled
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant={securityStatus.vulnerabilities > 0 ? "destructive" : "default"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Scan Results</AlertTitle>
        <AlertDescription>
          Last scan: {securityStatus.lastSecurityScan}
          {securityStatus.vulnerabilities === 0 ? (
            <p className="mt-2 text-green-500">No vulnerabilities detected</p>
          ) : (
            <p className="mt-2 text-red-500">
              {securityStatus.vulnerabilities} vulnerabilities detected
            </p>
          )}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            {securityStatus.recentLoginAttempts} login attempts in the last 24 hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityInfo;