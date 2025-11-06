
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BarChartComponent } from './components/BarChartComponent';
import { LineChartComponent } from './components/LineChartComponent';
import { PieChartComponent } from './components/PieChartComponent';
import { ChartCard } from './components/ChartCard';
import { GeminiInsight } from './components/GeminiInsight';
import { SkeletonLoader } from './components/SkeletonLoader';
import { fetchData, DataPeriod } from './services/dataService';
import type { MonthlyData, ProductCategoryData } from './types';
import { MenuIcon, XIcon } from './components/icons/MenuIcons';

const App: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<ProductCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<DataPeriod>('12m');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadData = useCallback(async (selectedPeriod: DataPeriod) => {
    setLoading(true);
    try {
      const { monthlyData, categoryData } = await fetchData(selectedPeriod);
      setMonthlyData(monthlyData);
      setCategoryData(categoryData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      // Simulate network latency for a better UX
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    loadData(period);
  }, [period, loadData]);

  const handlePeriodChange = (newPeriod: DataPeriod) => {
    setPeriod(newPeriod);
  };

  const fullDataSet = { monthlyData, categoryData };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar 
        currentPeriod={period} 
        onPeriodChange={handlePeriodChange} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
            >
              <span className="sr-only">Open sidebar</span>
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
        </Header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            
            <div className="lg:col-span-2">
              <ChartCard title="Monthly Revenue vs. Expenses">
                {loading ? <SkeletonLoader /> : <LineChartComponent data={monthlyData} />}
              </ChartCard>
            </div>

            <ChartCard title="Sales by Product Category">
              {loading ? <SkeletonLoader /> : <PieChartComponent data={categoryData} />}
            </ChartCard>

            <ChartCard title="Quarterly Profit">
               {loading ? <SkeletonLoader /> : <BarChartComponent data={monthlyData} />}
            </ChartCard>
            
            <div className="lg:col-span-2">
              <GeminiInsight data={fullDataSet} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
