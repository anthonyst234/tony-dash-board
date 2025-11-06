
import type { MonthlyData, ProductCategoryData } from '../types';

export type DataPeriod = '6m' | '12m' | '24m';

const generateMonthlyData = (months: number): MonthlyData[] => {
  const data: MonthlyData[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const revenue = Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000;
    const expenses = Math.floor(Math.random() * (revenue * 0.8 - 10000 + 1)) + 10000;
    const profit = revenue - expenses;
    data.push({ month, revenue, expenses, profit });
  }
  return data;
};

const generateCategoryData = (): ProductCategoryData[] => {
  return [
    { name: 'Electronics', value: Math.floor(Math.random() * 50000) + 20000 },
    { name: 'Apparel', value: Math.floor(Math.random() * 40000) + 15000 },
    { name: 'Home Goods', value: Math.floor(Math.random() * 60000) + 25000 },
    { name: 'Books', value: Math.floor(Math.random() * 30000) + 10000 },
    { name: 'Groceries', value: Math.floor(Math.random() * 70000) + 30000 },
  ];
};

export const fetchData = (
  period: DataPeriod
): Promise<{ monthlyData: MonthlyData[]; categoryData: ProductCategoryData[] }> => {
  return new Promise((resolve) => {
    const months = period === '6m' ? 6 : period === '12m' ? 12 : 24;
    setTimeout(() => {
      resolve({
        monthlyData: generateMonthlyData(months),
        categoryData: generateCategoryData(),
      });
    }, 300); // Simulate network delay
  });
};
