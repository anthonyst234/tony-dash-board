import React from 'react';
import { ChartBarIcon } from './icons/ChartIcons';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm shadow-md z-20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
            <ChartBarIcon />
            <h1 className="text-xl font-bold text-white ml-3">
              Tony's Data Dashboard
            </h1>
        </div>
        {children && <div className="md:hidden">{children}</div>}
      </div>
    </header>
  );
};
