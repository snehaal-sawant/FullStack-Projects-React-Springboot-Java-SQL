import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  padding = 'p-5',
  bordered = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl ${bordered ? 'border border-slate-200/80' : ''} ${
        hoverEffect ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : 'shadow-sm'
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
