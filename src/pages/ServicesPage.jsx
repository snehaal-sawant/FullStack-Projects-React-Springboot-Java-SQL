import React, { useState, useEffect } from 'react';
import { Ship, CheckCircle, Send } from 'lucide-react';
import { servicesData as fallbackServices } from '../data/servicesData';
import { Button } from '../components/common/Button';
import { useRfq } from '../context/RfqContext';
import { TestimonialSlider } from '../components/ui/TestimonialSlider';
import { marineService } from '../services/marineService';
import { Loader } from '../components/common/Loader';

export const ServicesPage = () => {
  const { openQuoteModalForProduct } = useRfq();
  const [services, setServices] = useState(fallbackServices);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await marineService.getAllServices();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching marine services:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-16 border-b border-navy-800 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Ship className="w-3.5 h-3.5" />
            <span>Maritime Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-2">
            OUR MARINE SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mt-2">
            Providing end-to-end support for shipowners, technical superintendents, and vessel managers worldwide.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {isLoading ? (
          <Loader label="Loading marine services..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-video bg-slate-100 relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-navy-950 font-heading">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.fullDescription}
                    </p>
                    
                    {Array.isArray(service.features) && service.features.length > 0 && (
                      <div className="pt-3 border-t space-y-2">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Service Key Benefits</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => openQuoteModalForProduct(null)}
                      variant="gold"
                      size="sm"
                      className="w-full"
                      icon={Send}
                    >
                      Inquire About This Service
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Service Feedback</span>
          <h2 className="text-2xl font-bold text-navy-950 font-heading">
            WHAT OUR MARITIME CLIENTS SAY
          </h2>
        </div>
        <TestimonialSlider />
      </section>

    </div>
  );
};
