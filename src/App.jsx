// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App






import React, { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Wallet, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinanceCalculator = () => {
  const [activeTab, setActiveTab] = useState('nps');
  
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const NPSCalculator = () => {
    const [age, setAge] = useState(30);
    const [monthly, setMonthly] = useState(5000);
    const [returns, setReturns] = useState(10);
    
    const retirementAge = 60;
    const years = retirementAge - age;
    const months = years * 12;
    
    const r = returns / 100 / 12;
    const totalInvestment = monthly * months;
    const maturityValue = monthly * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
    const gains = maturityValue - totalInvestment;
    
    const chartData = [];
    for (let i = 0; i <= years; i += 5) {
      const m = i * 12;
      const val = m === 0 ? 0 : monthly * (((Math.pow(1 + r, m) - 1) / r) * (1 + r));
      chartData.push({
        year: age + i,
        invested: monthly * m,
        value: val
      });
    }
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Age</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="18" max="59" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Investment (₹)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="500" step="500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expected Returns (%)</label>
            <input type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="15" step="0.5" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-indigo-600">₹{totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Est. Returns</p>
            <p className="text-2xl font-bold text-green-600">₹{gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Maturity Value</p>
            <p className="text-2xl font-bold text-purple-600">₹{maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
            <Legend />
            <Line type="monotone" dataKey="invested" stroke="#4F46E5" name="Total Invested" strokeWidth={2} />
            <Line type="monotone" dataKey="value" stroke="#10B981" name="Maturity Value" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const PPFCalculator = () => {
    const [yearly, setYearly] = useState(50000);
    const [years, setYears] = useState(15);
    const [rate, setRate] = useState(7.1);
    // const rate = 7.1;
    
    let totalInvestment = yearly * years;
    let maturityValue = 0;
    
    for (let i = 1; i <= years; i++) {
      maturityValue = (maturityValue + yearly) * (1 + rate / 100);
    }
    
    const gains = maturityValue - totalInvestment;
    
    const chartData = [];
    let runningValue = 0;
    for (let i = 1; i <= years; i++) {
      runningValue = (runningValue + yearly) * (1 + rate / 100);
      chartData.push({
        year: i,
        invested: yearly * i,
        value: runningValue
      });
    }
    
    const pieData = [
      { name: 'Principal', value: totalInvestment },
      { name: 'Interest', value: gains }
    ];
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Yearly Investment (₹)</label>
            <input type="number" value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="500" max="150000" step="1000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="15" max="50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expected Rate of Interest (%)</label>
            <input type="number" value={rate} onChange = {(e) =>{
              const value = e.target.value;
              if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                setRate(value);
              }
            }}
            onBlur={() => {
              let numericValue = parseFloat(rate);
              if (isNaN(numericValue) || numericValue < 2) numericValue = 2;
              if (numericValue > 30) numericValue = 30;
              setRate(numericValue);
            }}
            className="w-full p-2 border rounded-lg" min="2" max="30" step="0.1" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-blue-600">₹{totalInvestment.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Interest Earned</p>
            <p className="text-2xl font-bold text-green-600">₹{gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Maturity Value</p>
            <p className="text-2xl font-bold text-purple-600">₹{maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
              <Legend />
              <Bar dataKey="invested" fill="#4F46E5" name="Invested" />
              <Bar dataKey="value" fill="#10B981" name="Total Value" />
            </BarChart>
          </ResponsiveContainer>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${((entry.value / maturityValue) * 100).toFixed(1)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const EPFCalculator = () => {
    const [basicSalary, setBasicSalary] = useState(50000);
    const [years, setYears] = useState(20);
    const [age, setAge] = useState(30);
    const rate = 8.15;
    
    const employeeContribution = basicSalary * 0.12;
    const employerContribution = basicSalary * 0.0367;
    const monthlyContribution = employeeContribution + employerContribution;
    const months = years * 12;
    
    const r = rate / 100 / 12;
    const totalInvestment = monthlyContribution * months;
    const maturityValue = monthlyContribution * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
    const gains = maturityValue - totalInvestment;
    
    const chartData = [];
    for (let i = 0; i <= years; i += 2) {
      const m = i * 12;
      const val = m === 0 ? 0 : monthlyContribution * (((Math.pow(1 + r, m) - 1) / r) * (1 + r));
      chartData.push({
        year: age + i,
        invested: monthlyContribution * m,
        value: val
      });
    }
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Basic Salary (₹/month)</label>
            <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="10000" step="1000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Current Age</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="18" max="58" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Employee Contribution (12%)</p>
              <p className="font-semibold">₹{employeeContribution.toLocaleString('en-IN')}/month</p>
            </div>
            <div>
              <p className="text-gray-600">Employer Contribution (3.67%)</p>
              <p className="font-semibold">₹{employerContribution.toLocaleString('en-IN', {maximumFractionDigits: 0})}/month</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Contribution</p>
            <p className="text-2xl font-bold text-indigo-600">₹{totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Interest Earned</p>
            <p className="text-2xl font-bold text-green-600">₹{gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Maturity Amount</p>
            <p className="text-2xl font-bold text-purple-600">₹{maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
            <Legend />
            <Line type="monotone" dataKey="invested" stroke="#4F46E5" name="Total Contributed" strokeWidth={2} />
            <Line type="monotone" dataKey="value" stroke="#10B981" name="Corpus Value" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const SIPCalculator = () => {
    const [monthly, setMonthly] = useState(5000);
    const [years, setYears] = useState(10);
    const [returns, setReturns] = useState(12);
    
    const months = years * 12;
    const r = returns / 100 / 12;
    const totalInvestment = monthly * months;
    const maturityValue = monthly * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
    const gains = maturityValue - totalInvestment;
    
    const chartData = [];
    for (let i = 0; i <= years; i++) {
      const m = i * 12;
      const val = m === 0 ? 0 : monthly * (((Math.pow(1 + r, m) - 1) / r) * (1 + r));
      chartData.push({
        year: i,
        invested: monthly * m,
        value: val
      });
    }
    
    const pieData = [
      { name: 'Invested', value: totalInvestment },
      { name: 'Returns', value: gains }
    ];
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Investment (₹)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="500" step="500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expected Returns (%)</label>
            <input type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="30" step="0.5" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Invested Amount</p>
            <p className="text-2xl font-bold text-blue-600">₹{totalInvestment.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Est. Returns</p>
            <p className="text-2xl font-bold text-green-600">₹{gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-purple-600">₹{maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis />
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
              <Legend />
              <Line type="monotone" dataKey="invested" stroke="#4F46E5" name="Invested" strokeWidth={2} />
              <Line type="monotone" dataKey="value" stroke="#10B981" name="Total Value" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ₹${(entry.value / 100000).toFixed(1)}L`} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const LumpsumCalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [years, setYears] = useState(10);
    const [returns, setReturns] = useState(12);
    
    const maturityValue = amount * Math.pow(1 + returns / 100, years);
    const gains = maturityValue - amount;
    
    const chartData = [];
    for (let i = 0; i <= years; i++) {
      const val = amount * Math.pow(1 + returns / 100, i);
      chartData.push({
        year: i,
        value: val
      });
    }
    
    const pieData = [
      { name: 'Principal', value: amount },
      { name: 'Returns', value: gains }
    ];
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Investment Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="10000" step="10000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expected Returns (%)</label>
            <input type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))} className="w-full p-2 border rounded-lg" min="1" max="30" step="0.5" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Initial Investment</p>
            <p className="text-2xl font-bold text-blue-600">₹{amount.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Returns</p>
            <p className="text-2xl font-bold text-green-600">₹{gains.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Maturity Value</p>
            <p className="text-2xl font-bold text-purple-600">₹{maturityValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis />
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10B981" name="Investment Growth" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ₹${(entry.value / 100000).toFixed(1)}L`} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 0})} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

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
            {activeTab === 'nps' && <NPSCalculator />}
            {activeTab === 'ppf' && <PPFCalculator />}
            {activeTab === 'epf' && <EPFCalculator />}
            {activeTab === 'sip' && <SIPCalculator />}
            {activeTab === 'lumpsum' && <LumpsumCalculator />}
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