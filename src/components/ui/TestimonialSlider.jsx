import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/companyData';
import { Card } from '../common/Card';

export const TestimonialSlider = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonialsData.map((item) => (
        <Card key={item.id} className="relative p-6 flex flex-col justify-between border-slate-200 hover:border-amber-300">
          <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-200 pointer-events-none" />
          
          <div className="space-y-3 z-10">
            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            <p className="text-xs text-slate-600 italic leading-relaxed">
              "{item.text}"
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
            <img
              src={item.avatar}
              alt={item.client}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h5 className="text-xs font-bold text-slate-900 font-heading">{item.client}</h5>
              <p className="text-[11px] text-slate-500">{item.company}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
