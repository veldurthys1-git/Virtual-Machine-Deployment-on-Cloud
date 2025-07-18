import React, { useState } from 'react';
import { 
  Server, 
  MoreVertical, 
  Play, 
  Square, 
  RotateCcw,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react';

export const VMList: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const vms = [
    {
      id: 1,
      name: 'web-server-prod',
      status: 'running',
      provider: 'AWS',
      region: 'us-east-1',
      instanceType: 't3.medium',
      os: 'Ubuntu 22.04 LTS',
      ip: '54.123.45.67',
      cost: '$45.20/month',
      uptime: '15d 4h 23m',
      cpu: 45,
      memory: 62,
      storage: 35
    },
    {
      id: 2,
      name: 'database-replica',
      status: 'deploying',
      provider: 'Azure',
      region: 'East US',
      instanceType: 'Standard_D2s_v3',
      os: 'Windows Server 2022',
      ip: '20.98.123.45',
      cost: '$78.50/month',
      uptime: '0d 0h 12m',
      cpu: 0,
      memory: 0,
      storage: 0
    },
    {
      id: 3,
      name: 'ml-training-gpu',
      status: 'stopped',
      provider: 'GCP',
      region: 'us-central1',
      instanceType: 'n1-standard-4',
      os: 'Ubuntu 22.04 LTS',
      ip: '35.123.45.67',
      cost: '$120.00/month',
      uptime: '0d 0h 0m',
      cpu: 0,
      memory: 0,
      storage: 45
    },
    {
      id: 4,
      name: 'api-gateway',
      status: 'running',
      provider: 'AWS',
      region: 'us-west-2',
      instanceType: 'c5.large',
      os: 'Amazon Linux 2',
      ip: '54.234.56.78',
      cost: '$62.40/month',
      uptime: '8d 12h 45m',
      cpu: 32,
      memory: 48,
      storage: 28
    },
    {
      id: 5,
      name: 'cache-server',
      status: 'error',
      provider: 'Azure',
      region: 'West Europe',
      instanceType: 'Standard_B2s',
      os: 'CentOS 8',
      ip: '40.123.45.67',
      cost: '$38.90/month',
      uptime: '0d 0h 0m',
      cpu: 0,
      memory: 0,
      storage: 15
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'deploying':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      case 'stopped':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/20 text-green-400';
      case 'deploying':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'stopped':
        return 'bg-gray-500/20 text-gray-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredVMs = filter === 'all' ? vms : vms.filter(vm => vm.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Virtual Machines</h1>
          <p className="text-gray-400">Manage your cloud infrastructure</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Deploy New VM
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {['all', 'running', 'stopped', 'deploying', 'error'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* VM Cards */}
      <div className="grid gap-6">
        {filteredVMs.map(vm => (
          <div key={vm.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Server className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{vm.name}</h3>
                  <p className="text-gray-400">{vm.provider} • {vm.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(vm.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vm.status)}`}>
                    {vm.status}
                  </span>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-400">Instance Type</span>
                  <p className="font-medium">{vm.instanceType}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Operating System</span>
                  <p className="font-medium">{vm.os}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Public IP</span>
                  <p className="font-medium">{vm.ip}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-400">Monthly Cost</span>
                  <p className="font-medium text-green-400">{vm.cost}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Uptime</span>
                  <p className="font-medium">{vm.uptime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">CPU Usage</span>
                    <span className="text-sm font-medium">{vm.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vm.cpu}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Memory</span>
                    <span className="text-sm font-medium">{vm.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vm.memory}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Storage</span>
                    <span className="text-sm font-medium">{vm.storage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vm.storage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t border-gray-700">
              <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Play className="h-4 w-4" />
                Start
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Square className="h-4 w-4" />
                Stop
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <RotateCcw className="h-4 w-4" />
                Restart
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};