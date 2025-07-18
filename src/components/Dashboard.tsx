import React from 'react';
import { 
  Server, 
  Activity, 
  DollarSign, 
  TrendingUp,
  Cloud,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: 'Active VMs', 
      value: '24', 
      change: '+12%', 
      icon: Server,
      color: 'text-blue-500'
    },
    { 
      title: 'Monthly Cost', 
      value: '$2,847', 
      change: '-8%', 
      icon: DollarSign,
      color: 'text-green-500'
    },
    { 
      title: 'CPU Usage', 
      value: '67%', 
      change: '+5%', 
      icon: Activity,
      color: 'text-purple-500'
    },
    { 
      title: 'Uptime', 
      value: '99.9%', 
      change: '+0.1%', 
      icon: TrendingUp,
      color: 'text-emerald-500'
    },
  ];

  const recentDeployments = [
    { id: 1, name: 'web-server-prod', status: 'running', provider: 'AWS', created: '2h ago' },
    { id: 2, name: 'database-replica', status: 'deploying', provider: 'Azure', created: '4h ago' },
    { id: 3, name: 'ml-training-gpu', status: 'stopped', provider: 'GCP', created: '1d ago' },
    { id: 4, name: 'api-gateway', status: 'running', provider: 'AWS', created: '2d ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'deploying':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'stopped':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your cloud infrastructure</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-700 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Deployments */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Recent Deployments</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentDeployments.map((deployment) => (
              <div key={deployment.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(deployment.status)}
                  <div>
                    <h3 className="font-medium">{deployment.name}</h3>
                    <p className="text-sm text-gray-400">{deployment.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    deployment.status === 'running' 
                      ? 'bg-green-500/20 text-green-400'
                      : deployment.status === 'deploying'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {deployment.status}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">{deployment.created}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Deploy New VM</h3>
          <p className="text-blue-100 mb-4">Launch a new virtual machine in minutes</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Scale Resources</h3>
          <p className="text-purple-100 mb-4">Automatically scale based on demand</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Configure
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Monitor Performance</h3>
          <p className="text-green-100 mb-4">Real-time metrics and alerts</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};