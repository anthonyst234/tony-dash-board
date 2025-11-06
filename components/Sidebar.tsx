
import React, { Fragment } from 'react';
import type { DataPeriod } from '../services/dataService';
import { ChartBarIcon } from './icons/ChartIcons';

interface SidebarProps {
  currentPeriod: DataPeriod;
  onPeriodChange: (period: DataPeriod) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const periods: { value: DataPeriod; label: string }[] = [
  { value: '6m', label: 'Last 6 Months' },
  { value: '12m', label: 'Last 12 Months' },
  { value: '24m', label: 'Last 24 Months' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPeriod, onPeriodChange, isOpen, setIsOpen }) => {
  const content = (
    <>
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center">
            <ChartBarIcon />
            <span className="text-white text-lg font-semibold ml-2">Filters</span>
        </div>
      </div>
      <div className="flex-1 mt-5 flex flex-col">
        <nav className="flex-1 px-2 space-y-4">
          <div>
            <h3 className="px-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Time Range
            </h3>
            <div className="mt-2 space-y-1">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => {
                    onPeriodChange(period.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    currentPeriod === period.value
                      ? 'bg-sky-500/20 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );

  return (
    <>
        {/* Mobile sidebar with overlay */}
        <div 
            className={`fixed inset-0 z-40 flex md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            role="dialog" 
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" onClick={() => setIsOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800">
                {content}
            </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col h-0 flex-1 bg-slate-800 border-r border-slate-700/50">
                    {content}
                </div>
            </div>
        </div>
    </>
  );
};
