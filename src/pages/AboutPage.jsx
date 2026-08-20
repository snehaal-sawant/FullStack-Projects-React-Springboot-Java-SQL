import React from 'react';
import { Anchor, ShieldCheck, Globe, Award, CheckCircle, MapPin, Building, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Button } from '../components/common/Button';
import { useRfq } from '../context/RfqContext';
import { TestimonialSlider } from '../components/ui/TestimonialSlider';

export const AboutPage = () => {
  const { companyInfo, companyStats } = useData();
  const { openQuoteModalForProduct } = useRfq();

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-16 border-b border-navy-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5" />
            <span>Company Profile</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            ABOUT SANVI MARITIME
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Asia's leading ship spare parts supplier, specialized in brand new, used, and reconditioned marine engine & auxiliary machinery components.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading">
              Trusted Partner to Shipowners & Technical Managers Globally
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Sanvi Maritime is a prominent ship spare parts supplier, based in Kalyan (Mumbai), specializing in the trading of both brand new and used – reconditioned marine spare parts. Sanvi Maritime has positioned itself as one of the leading marine spare parts traders globally, offering quality services to ship owners and ship management companies.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our success is rooted in a robust network that positions Sanvi Maritime as a crucial intermediary between spare parts manufacturers, suppliers, and esteemed OEM suppliers globally. This strategic positioning allows us to offer a diverse range of high-quality products to meet the dynamic needs of the maritime sector.
            </p>

            <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
              <div className="flex items-center gap-2 text-maritime-blue font-bold text-sm font-heading">
                <Anchor className="w-4 h-4 text-amber-500" />
                <span>Alang Ship Breaking Yard Advantage</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                A key strength lies in our direct association with Asia’s largest ship breaking yard in Alang, Gujarat, enhancing our inventory and enabling the provision of top-notch used and reconditioned spare parts directly from ships undergoing demolition and renowned scrap yards.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://www.sanvimaritime.com/images/Aboutus/04.png"
              alt="Alang Shipyard Sourcing"
              className="rounded-2xl shadow-lg border border-slate-200 object-cover w-full h-64"
            />
            <img
              src="https://www.sanvimaritime.com/images/Aboutus/05.png"
              alt="Warehouse Inspection"
              className="rounded-2xl shadow-lg border border-slate-200 object-cover w-full h-64 mt-6"
            />
          </div>

        </div>
      </section>

      {/* Core Mission & Vision */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-maritime-blue flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 font-heading">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Sanvi Maritime, as a trusted partner in the maritime industry, our unwavering mission is to deliver reliable, sustainable, and cutting-edge marine spare parts solutions globally. We aim to keep commercial vessels sailing safely with zero unexpected downtime.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 font-heading">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be recognized as the premier global benchmark for ship spare parts supply chain efficiency, quality control certification, and customer-first technical support across all major international bunkering ports.
            </p>
          </div>

        </div>
      </section>

      {/* Quality Control Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 space-y-8">
          
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Quality Assurance Standards</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
              RECONDITIONED PARTS INSPECTION PROTOCOL
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Every reconditioned part from Alang Shipyard or OEM stock undergoes rigorous testing prior to packaging:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-heading">NDT Crack Detection</h4>
              <p className="text-xs text-slate-400">Magnetic particle and dye-penetrant test on all cylinder heads & pistons.</p>
            </div>
            <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="text-sm font-bold text-white font-heading">Pressure Testing</h4>
              <p className="text-xs text-slate-400">Hydraulic pressure test up to 1.5x working rating on fuel pumps & heat exchangers.</p>
            </div>
            <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2">
              <Users className="w-6 h-6 text-sky-400" />
              <h4 className="text-sm font-bold text-white font-heading">Dynamic Balancing</h4>
              <p className="text-xs text-slate-400">Rotor shaft balancing grade G 2.5 ISO 1940 for all turbochargers.</p>
            </div>
            <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2">
              <MapPin className="w-6 h-6 text-rose-400" />
              <h4 className="text-sm font-bold text-white font-heading">Class Certificate</h4>
              <p className="text-xs text-slate-400">Supplied with DNV, GL, or ABS class inspection report upon customer request.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Client Endorsements</span>
          <h2 className="text-2xl font-bold text-navy-950 font-heading">
            REVIEWS FROM CHIEF ENGINEERS & MANAGERS
          </h2>
        </div>
        <TestimonialSlider />
      </section>

    </div>
  );
};
