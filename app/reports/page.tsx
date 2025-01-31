//file:app/reports/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '@/styles/globals.css'
interface PasswordHealth {
  total: number;
  weak: number;
  moderate: number;
  strong: number;
  reused: number;
  old: number;
}

interface SecurityIncident {
  date: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'resolved' | 'pending' | 'investigating';
}

interface UsageStats {
  date: string;
  logins: number;
  passwords_added: number;
  passwords_updated: number;
}

export default function ReportsPage() {
  const [passwordHealth, setPasswordHealth] = useState<PasswordHealth | null>(null);
  const [securityIncidents, setSecurityIncidents] = useState<SecurityIncident[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    try {
      const [healthResponse, incidentsResponse, statsResponse] = await Promise.all([
        fetch('/api/reports/password-health'),
        fetch('/api/reports/security-incidents'),
        fetch('/api/reports/usage-stats'),
      ]);
  
      // Check if any response failed
      for (const response of [healthResponse, incidentsResponse, statsResponse]) {
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }
  
      const [health, incidents, stats] = await Promise.all([
        healthResponse.json(),
        incidentsResponse.json(),
        statsResponse.json(),
      ]);
  
      setPasswordHealth(health);
      setSecurityIncidents(incidents);
      setUsageStats(stats);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch report data';
      setError(`${errorMessage}. Please try again later.`);
      console.error('Failed to fetch report data:', error);
    }
  }

  const getSeverityColor = (severity: SecurityIncident['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Reports & Analytics</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Password Health Overview */}
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Password Health</h2>
        {passwordHealth && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((passwordHealth.strong / passwordHealth.total) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Strong Passwords</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {passwordHealth.reused}
              </div>
              <div className="text-sm text-gray-600">Reused Passwords</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {passwordHealth.old}
              </div>
              <div className="text-sm text-gray-600">Passwords Needing Update</div>
            </div>
          </div>
        )}
      </div>

      {/* Usage Statistics */}
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Usage Statistics</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] h-64">
            <LineChart
              width={800}
              height={300}
              data={usageStats}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#8884d8" name="Logins" />
              <Line type="monotone" dataKey="passwords_added" stroke="#82ca9d" name="Passwords Added" />
              <Line type="monotone" dataKey="passwords_updated" stroke="#ffc658" name="Passwords Updated" />
            </LineChart>
          </div>
        </div>
      </div>

      {/* Security Incidents */}
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Security Incidents</h2>
        <div className="space-y-4">
          {securityIncidents.map((incident, index) => (
            <div
              key={index}
              className="border-l-4 border-l-gray-300 pl-4 py-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{incident.type}</h3>
                  <p className="text-sm text-gray-600">{incident.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-500">{incident.date}</div>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}