import React, { useState } from 'react';
import {COLORS} from '../../constants/colors.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
export default PPFCalculator;

