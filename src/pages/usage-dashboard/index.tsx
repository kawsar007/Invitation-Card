import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Users, Mail, AlertTriangle, TrendingUp, Crown } from 'lucide-react';
import { Subscription, subscriptionService, UsageLimits } from '@/services/subscription.service';

const UsageDashboard: React.FC = () => {
  const [usageLimits, setUsageLimits] = useState<UsageLimits | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      setLoading(true);
      const [usageResponse, subscriptionResponse] = await Promise.all([
        subscriptionService.getUsageLimits(),
        subscriptionService.getMySubscription()
      ]);

      if (usageResponse.success) {
        setUsageLimits(usageResponse.data);
      }

      if (subscriptionResponse.success) {
        setSubscription(subscriptionResponse.data);
      }
    } catch (err) {
      setError('Failed to load usage data');
      console.error('Error fetching usage data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUsagePercentage = (current: number, max: number): number => {
    if (max === -1) return 0; // Unlimited
    return Math.round((current / max) * 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return '#EF4444'; // Red
    if (percentage >= 70) return '#F59E0B'; // Orange
    return '#10B981'; // Green
  };

  const isNearLimit = (current: number, max: number): boolean => {
    if (max === -1) return false; // Unlimited
    return (current / max) >= 0.8;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading usage data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  if (!usageLimits || !subscription) {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-64 p-6 pt-24">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Usage Data Available</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't retrieve your usage data at this time. Please try again later or contact support if the issue persists.
        </p>
      </div>
    );
  }

  const usageData = [
    {
      name: 'Events',
      current: usageLimits?.events.current,
      max: usageLimits?.events.max === -1 ? usageLimits?.events.current + 10 : usageLimits?.events.max,
      unlimited: usageLimits?.events.max === -1,
      percentage: getUsagePercentage(usageLimits?.events.current, usageLimits?.events.max),
      icon: Calendar,
      color: getUsageColor(getUsagePercentage(usageLimits?.events.current, usageLimits?.events.max))
    },
    {
      name: 'Contacts',
      current: usageLimits?.contacts.current,
      max: usageLimits?.contacts.max === -1 ? usageLimits?.contacts.current + 100 : usageLimits?.contacts.max,
      unlimited: usageLimits?.contacts.max === -1,
      percentage: getUsagePercentage(usageLimits?.contacts.current, usageLimits?.contacts.max),
      icon: Users,
      color: getUsageColor(getUsagePercentage(usageLimits?.contacts.current, usageLimits?.contacts.max))
    },
    {
      name: 'Invitations',
      current: 0, // This would need to be calculated per event
      max: usageLimits?.invitations.max === -1 ? 100 : usageLimits?.invitations.max,
      unlimited: usageLimits?.invitations.max === -1,
      percentage: 0,
      icon: Mail,
      color: '#10B981'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 pt-24">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Usage Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your subscription usage and limits</p>
          </div>
          <div className="flex items-center space-x-2 text-right">
            <Crown className="w-5 h-5 text-blue-500" />
            <div>
              <div className="font-semibold text-gray-900">{subscription.plan} Plan</div>
              <div className="text-sm text-gray-500">
                {subscription.status === 'ACTIVE' && subscription.ends_at 
                  ? `Expires: ${new Date(subscription.ends_at).toLocaleDateString()}`
                  : `Status: ${subscription.status}`
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {usageData.map((item) => {
          const Icon = item.icon;
          const isAtLimit = !item.unlimited && item.current >= item.max;
          const nearLimit = isNearLimit(item.current, item.unlimited ? -1 : item.max);

          return (
            <div key={item.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon className="w-6 h-6 text-gray-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </div>
                {(nearLimit || isAtLimit) && !item.unlimited && (
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.current?.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    / {item.unlimited ? '∞' : item.max?.toLocaleString()}
                  </span>
                </div>

                {!item.unlimited && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(item.percentage, 100)}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {item.unlimited ? 'Unlimited' : `${item.percentage}% used`}
                  </span>
                  {isAtLimit && (
                    <span className="text-red-600 font-medium">Limit reached</span>
                  )}
                  {nearLimit && !isAtLimit && (
                    <span className="text-orange-600 font-medium">Near limit</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData.filter(item => !item.unlimited)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'current' ? `${value} used` : `${value} limit`,
                  name === 'current' ? 'Current Usage' : 'Limit'
                ]}
              />
              <Bar dataKey="current" name="current" radius={[4, 4, 0, 0]}>
                {usageData.filter(item => !item.unlimited).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar dataKey="max" name="max" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upgrade Suggestion */}
      {(subscription?.plan === 'FREE' && (
        usageLimits?.events.current >= 3 || 
        usageLimits?.contacts.current >= 150
      )) && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-500 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Ready to Scale Up?</h3>
              <p className="text-gray-600 mt-1">
                You're approaching your limits. Upgrade to Premium for more capacity and advanced features.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/subscription/plans'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageDashboard;