import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Cloud, Server, Settings, CreditCard } from 'lucide-react';

export const DeploymentWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    provider: '',
    region: '',
    instanceType: '',
    name: '',
    os: '',
    storage: '20',
    memory: '4',
    vcpus: '2'
  });

  const steps = [
    { id: 0, title: 'Cloud Provider', icon: Cloud },
    { id: 1, title: 'Configuration', icon: Server },
    { id: 2, title: 'Settings', icon: Settings },
    { id: 3, title: 'Review & Deploy', icon: CreditCard }
  ];

  const providers = [
    { id: 'aws', name: 'Amazon Web Services', logo: '🟠' },
    { id: 'azure', name: 'Microsoft Azure', logo: '🔵' },
    { id: 'gcp', name: 'Google Cloud Platform', logo: '🟡' }
  ];

  const regions = {
    aws: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    azure: ['East US', 'West US 2', 'West Europe', 'Southeast Asia'],
    gcp: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1']
  };

  const instanceTypes = {
    aws: ['t3.micro', 't3.small', 't3.medium', 'c5.large', 'r5.large'],
    azure: ['Standard_B1s', 'Standard_B2s', 'Standard_D2s_v3', 'Standard_F4s'],
    gcp: ['e2-micro', 'e2-small', 'e2-medium', 'n1-standard-2']
  };

  const operatingSystems = [
    'Ubuntu 22.04 LTS',
    'Amazon Linux 2',
    'Windows Server 2022',
    'CentOS 8',
    'Red Hat Enterprise Linux 8'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Cloud Provider</h3>
              <div className="grid gap-4">
                {providers.map(provider => (
                  <button
                    key={provider.id}
                    onClick={() => handleInputChange('provider', provider.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.provider === provider.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <span className="font-medium">{provider.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {formData.provider && (
              <div>
                <h4 className="text-lg font-medium mb-3">Select Region</h4>
                <select
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="">Choose a region</option>
                  {regions[formData.provider as keyof typeof regions]?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">VM Configuration</h3>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instance Type</label>
                  <select
                    value={formData.instanceType}
                    onChange={(e) => handleInputChange('instanceType', e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  >
                    <option value="">Select instance type</option>
                    {instanceTypes[formData.provider as keyof typeof instanceTypes]?.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Operating System</label>
                  <select
                    value={formData.os}
                    onChange={(e) => handleInputChange('os', e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  >
                    <option value="">Select OS</option>
                    {operatingSystems.map(os => (
                      <option key={os} value={os}>{os}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">vCPUs</label>
                    <input
                      type="number"
                      value={formData.vcpus}
                      onChange={(e) => handleInputChange('vcpus', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                      min="1"
                      max="16"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Memory (GB)</label>
                    <input
                      type="number"
                      value={formData.memory}
                      onChange={(e) => handleInputChange('memory', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                      min="1"
                      max="64"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Storage (GB)</label>
                    <input
                      type="number"
                      value={formData.storage}
                      onChange={(e) => handleInputChange('storage', e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                      min="10"
                      max="1000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">VM Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">VM Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter VM name"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  />
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Security Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Enable SSH access</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Enable monitoring</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Auto-backup enabled</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Review & Deploy</h3>
              
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400">Provider:</span>
                    <p className="font-medium">{formData.provider?.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Region:</span>
                    <p className="font-medium">{formData.region}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Instance Type:</span>
                    <p className="font-medium">{formData.instanceType}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Operating System:</span>
                    <p className="font-medium">{formData.os}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="font-medium mb-3">Resource Allocation</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-400">vCPUs:</span>
                      <p className="font-medium">{formData.vcpus}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Memory:</span>
                      <p className="font-medium">{formData.memory} GB</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Storage:</span>
                      <p className="font-medium">{formData.storage} GB</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Estimated Monthly Cost:</span>
                    <span className="text-2xl font-bold text-green-400">$127.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Deploy Virtual Machine</h1>
        <p className="text-gray-400">Create and configure your cloud VM in a few simple steps</p>
      </div>

      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  index <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`ml-3 font-medium ${
                  index <= currentStep ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-500 mx-8" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-gray-800 rounded-xl p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentStep === 0
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Deploy VM' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};