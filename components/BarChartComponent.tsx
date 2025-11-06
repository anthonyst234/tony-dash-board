
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyData } from '../types';

interface BarChartProps {
  data: MonthlyData[];
}

const processDataForQuarterly = (data: MonthlyData[]): { name: string; profit: number }[] => {
    if (!data.length) return [];

    const quarterlyProfit: { [key: string]: number } = {};
    data.forEach(item => {
        const date = new Date(item.month.replace(/(\w{3}) (\d{2})/, '$1 1, 20$2'));
        const year = date.getFullYear();
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        const key = `Q${quarter} '${String(year).slice(-2)}`;
        if (!quarterlyProfit[key]) {
            quarterlyProfit[key] = 0;
        }
        quarterlyProfit[key] += item.profit;
    });

    return Object.keys(quarterlyProfit).map(key => ({
        name: key,
        profit: Math.round(quarterlyProfit[key] / 1000) // profit in thousands
    }));
};

export const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  const quarterlyData = processDataForQuarterly(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={quarterlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} fontSize={12} />
        <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} unit="k" />
        <Tooltip
          cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#38bdf8',
            color: '#e2e8f0'
          }}
          formatter={(value) => [`$${value}k`, 'Profit']}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Bar dataKey="profit" fill="#0ea5e9" name="Profit (in $1,000s)" />
      </BarChart>
    </ResponsiveContainer>
  );
};
