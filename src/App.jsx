
import React, { useState, Suspense } from 'react';
import { Calculator, TrendingUp, PiggyBank, Wallet, BarChart3 } from 'lucide-react';

const NPSCalculator = React.lazy(() => import('./components/calculators/NPSCalc'));
const PPFCalculator = React.lazy(() => import('./components/calculators/PPFCalc'));
const EPFCalculator = React.lazy(() => import('./components/calculators/EPFCalc'));
const SIPCalculator = React.lazy(() => import('./components/calculators/SIPCalc'));
const LumpsumCalculator = React.lazy(() => import('./components/calculators/LumpsumCalc'));

const FinanceCalculator = () => {
  const [activeTab, setActiveTab] = useState('nps');

  const tabs = [
    { id: 'nps', name: 'NPS', icon: TrendingUp },
    { id: 'ppf', name: 'PPF', icon: PiggyBank },
    { id: 'epf', name: 'EPF', icon: Wallet },
    { id: 'sip', name: 'SIP', icon: BarChart3 },
    { id: 'lumpsum', name: 'Lumpsum', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Financial Calculator</h1>
          <p className="text-gray-600">Plan your investments with comprehensive calculators</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-wrap border-b bg-gray-50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-white hover:text-indigo-600'
                  }`}
                >
                  <Icon size={20} />
                  {tab.name}
                </button>
              );
            })}
          </div>
          
          <div className="p-6">
            <Suspense fallback={<div className="text-center text-gray-500">Loading Calculator ...</div>}>
            {activeTab === 'nps' && <NPSCalculator />}
            {activeTab === 'ppf' && <PPFCalculator />}
            {activeTab === 'epf' && <EPFCalculator />}
            {activeTab === 'sip' && <SIPCalculator />}
            {activeTab === 'lumpsum' && <LumpsumCalculator />}
            </Suspense>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Note: All calculations are indicative and for educational purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;