// import React, { useState } from 'react';
// import { Calculator, TrendingUp, PiggyBank, Wallet, BarChart3 } from 'lucide-react';
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const FinanceCalculator = () => {
//   const [activeTab, setActiveTab] = useState('nps');
//   const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

//   // ---------------- NPS Calculator ----------------
//   const NPSCalculator = () => {
//     const [age, setAge] = useState(30);
//     const [monthly, setMonthly] = useState(5000);
//     const [returns, setReturns] = useState(10);

//     const retirementAge = 60;
//     const years = retirementAge - age;
//     const months = years * 12;
//     const r = returns / 100 / 12;
//     const totalInvestment = monthly * months;
//     const maturityValue = monthly * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
//     const gains = maturityValue - totalInvestment;

//     const chartData = [];
//     for (let i = 0; i <= years; i += 5) {
//       const m = i * 12;
//       const val = m === 0 ? 0 : monthly * (((Math.pow(1 + r, m) - 1) / r) * (1 + r));
//       chartData.push({ year: age + i, invested: monthly * m, value: val });
//     }

//     return (
//       <div className="space-y-6">
//         <div className="grid md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Current Age</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(Number(e.target.value))}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               min="18"
//               max="59"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Monthly Investment (₹)</label>
//             <input
//               type="number"
//               value={monthly}
//               onChange={(e) => setMonthly(Number(e.target.value))}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               min="500"
//               step="500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Expected Returns (%)</label>
//             <input
//               type="number"
//               value={returns}
//               onChange={(e) => setReturns(Number(e.target.value))}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               min="1"
//               max="15"
//               step="0.5"
//             />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="bg-indigo-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600">Total Investment</p>
//             <p className="text-2xl font-bold text-indigo-600">
//               ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
//             </p>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600">Est. Returns</p>
//             <p className="text-2xl font-bold text-green-600">
//               ₹{gains.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
//             </p>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600">Maturity Value</p>
//             <p className="text-2xl font-bold text-purple-600">
//               ₹{maturityValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-md">
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip formatter={(value) => '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 })} />
//               <Legend />
//               <Line type="monotone" dataKey="invested" stroke="#4F46E5" name="Total Invested" strokeWidth={2} />
//               <Line type="monotone" dataKey="value" stroke="#10B981" name="Maturity Value" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     );
//   };

//   // ---------------- Tabs Configuration ----------------
//   const tabs = [
//     { id: 'nps', name: 'NPS', icon: TrendingUp },
//     { id: 'ppf', name: 'PPF', icon: PiggyBank },
//     { id: 'epf', name: 'EPF', icon: Wallet },
//     { id: 'sip', name: 'SIP', icon: BarChart3 },
//     { id: 'lumpsum', name: 'Lumpsum', icon: Calculator },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8 pt-6">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Finance Calculator Suite</h1>
//           <p className="text-gray-600">Plan your investments with comprehensive calculators</p>
//         </div>

//         {/* Tabs Container */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="flex flex-wrap border-b bg-gray-50">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
//                     activeTab === tab.id
//                       ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
//                       : 'text-gray-600 hover:bg-white hover:text-indigo-600'
//                   }`}
//                 >
//                   <Icon className="text-current" size={20} />
//                   {tab.name}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Active Calculator */}
//           <div className="p-6">
//             {activeTab === 'nps' && <NPSCalculator />}
//             {/* Add PPFCalculator, EPFCalculator, SIPCalculator, LumpsumCalculator here like NPSCalculator */}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-6 text-center text-sm text-gray-600">
//           <p>Note: All calculations are indicative and for educational purposes only.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinanceCalculator;




import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white p-6">
      Tailwind Test
    </div>
  );
};

export default App;