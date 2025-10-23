import React, { useState } from 'react';
import {COLORS} from '../../constants/colors.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
export default EPFCalculator;

