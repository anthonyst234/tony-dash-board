
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 h-96 flex flex-col">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="flex-grow h-full w-full">
        {children}
      </div>
    </div>
  );
};
