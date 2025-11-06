
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyData } from '../types';

interface LineChartProps {
  data: MonthlyData[];
}

export const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} fontSize={12} />
        <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#38bdf8',
            color: '#e2e8f0'
          }}
          formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Line type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
