import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ label = "Loading marine spares inventory..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-maritime-blue animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
};
