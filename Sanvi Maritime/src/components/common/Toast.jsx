import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useRfq } from '../../context/RfqContext';

export const Toast = () => {
  const { toast } = useRfq();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-navy-950 text-white rounded-xl shadow-2xl p-4 border border-navy-800 flex items-start gap-3 animate-slideDown">
      <div className="flex-shrink-0 mt-0.5">
        {icons[toast.type] || icons.info}
      </div>
      <div className="flex-1 text-sm font-medium">
        {toast.message}
      </div>
    </div>
  );
};
