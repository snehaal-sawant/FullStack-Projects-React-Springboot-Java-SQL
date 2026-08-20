import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3 bg-white shadow-sm transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:text-maritime-blue bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-base font-heading">{title}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-maritime-blue' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-slate-600 text-sm leading-relaxed animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question || item.title}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        >
          {item.answer || item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
