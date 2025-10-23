import React, {useState} from "react";
import {COLORS} from '../../constants/colors.js';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
export default NPSCalculator;
