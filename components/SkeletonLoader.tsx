
import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-full animate-pulse">
      <div className="h-full w-full bg-slate-700/50 rounded-md"></div>
    </div>
  );
};
