import React, { useState } from 'react';
import {COLORS} from '../../constants/colors.js';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
export default LumpsumCalculator;