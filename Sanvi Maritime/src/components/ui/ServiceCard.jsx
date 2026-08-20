import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Ship, Wrench, Anchor, ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '../common/Card';

const iconMap = {
  Globe: Globe,
  Ship: Ship,
  Wrench: Wrench,
  Anchor: Anchor
};

export const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Ship;

  return (
    <Card className="flex flex-col h-full group hover:border-maritime-blue transition-all duration-300">

      {/* Image */}
      <div className="relative aspect-video bg-slate-100 rounded-t-xl overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 p-2.5 bg-navy-950/80 backdrop-blur text-amber-400 rounded-xl shadow-lg border border-navy-800">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-maritime-blue transition-colors font-heading">
            {service.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="pt-3 space-y-1.5 border-t border-slate-100">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-maritime-blue hover:text-navy-950 transition-colors"
          >
            <span>Learn More & Request Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </Card>
  );
};
