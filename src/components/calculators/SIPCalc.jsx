import React, { useState } from 'react';
import {COLORS} from '../../constants/colors.js';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
export default SIPCalculator;

