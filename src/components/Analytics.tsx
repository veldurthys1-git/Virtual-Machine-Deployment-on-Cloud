import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Server, Users } from 'lucide-react';

export const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Total VMs',
      value: '24',
      change: '+3 from last month',
      trend: 'up',
      icon: Server
    },
    {
      title: 'Monthly Spend',
      value: '$2,847',
      change: '-$234 from last month',
      trend: 'down',
      icon: DollarSign
    },
    {
      title: 'Avg CPU Usage',
      value: '67%',
      change: '+12% from last month',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+23 from last month',
      trend: 'up',
      icon: Users
    }
  ];

  const costData = [
    { month: 'Jan', cost: 2200 },
    { month: 'Feb', cost: 2450 },
    { month: 'Mar', cost: 2100 },
    { month: 'Apr', cost: 2850 },
    { month: 'May', cost: 3200 },
    { month: 'Jun', cost: 2847 }
  ];

  const usageData = [
    { provider: 'AWS', usage: 45, cost: 1520 },
    { provider: 'Azure', usage: 32, cost: 890 },
    { provider: 'GCP', usage: 23, cost: 437 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Monitor your cloud infrastructure performance and costs</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
              <p className="text-gray-400 text-sm">{metric.title}</p>
              <p className={`text-sm mt-2 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost Trend Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Monthly Cost Trend</h3>
          <div className="space-y-4">
            {costData.map((item, index) => (
              <div key={item.month} className="flex items-center justify-between">
                <span className="text-gray-400">{item.month}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.cost / 3500) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium w-16 text-right">${item.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provider Usage */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Usage by Provider</h3>
          <div className="space-y-6">
            {usageData.map((provider) => (
              <div key={provider.provider} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{provider.provider}</span>
                  <span className="text-sm text-gray-400">{provider.usage}% usage</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      provider.provider === 'AWS' ? 'bg-orange-500' :
                      provider.provider === 'Azure' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${provider.usage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Cost: ${provider.cost}/month</span>
                  <span>{provider.usage}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-6">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-400">99.9%</span>
            </div>
            <h4 className="font-medium mb-2">Uptime</h4>
            <p className="text-sm text-gray-400">Average across all VMs</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-purple-400">1.2s</span>
            </div>
            <h4 className="font-medium mb-2">Response Time</h4>
            <p className="text-sm text-gray-400">Average API response</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-green-400">67%</span>
            </div>
            <h4 className="font-medium mb-2">Resource Utilization</h4>
            <p className="text-sm text-gray-400">CPU & Memory combined</p>
          </div>
        </div>
      </div>
    </div>
  );
};