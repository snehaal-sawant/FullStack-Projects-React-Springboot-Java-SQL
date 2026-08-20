import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm';
  
  const variants = {
    primary: 'bg-maritime-blue hover:bg-navy-900 text-white focus:ring-maritime-accent border border-transparent active:scale-[0.99]',
    secondary: 'bg-maritime-dark hover:bg-navy-950 text-white focus:ring-maritime-blue border border-transparent',
    gold: 'bg-maritime-gold hover:bg-amber-600 text-slate-900 font-semibold focus:ring-amber-500 border border-transparent shadow-md hover:shadow-lg',
    outline: 'border border-slate-300 hover:border-maritime-blue text-slate-700 hover:text-maritime-blue bg-white focus:ring-maritime-blue',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-navy-900 shadow-none focus:ring-slate-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};
