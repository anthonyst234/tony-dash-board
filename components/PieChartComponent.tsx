
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ProductCategoryData } from '../types';

interface PieChartProps {
  data: ProductCategoryData[];
}

const COLORS = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = <T extends { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number; index: number }>({ cx, cy, midAngle, innerRadius, outerRadius, percent }: T) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null; // Don't render label for small slices

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#38bdf8',
            color: '#e2e8f0'
          }}
          formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "14px"}}/>
        <Pie
          data={data}
          cx="40%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
