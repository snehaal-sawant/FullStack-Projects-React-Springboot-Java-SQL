import React from 'react';

export const Badge = ({
  children,
  variant = 'blue',
  size = 'md',
  className = ''
}) => {
  const variants = {
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    navy: 'bg-navy-900 text-amber-300 border-navy-800',
    gold: 'bg-amber-50 text-amber-800 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
