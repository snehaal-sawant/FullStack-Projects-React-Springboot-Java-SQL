import React from 'react';
import { Phone, Mail, MapPin, Facebook, Linkedin, ShoppingBag } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useRfq } from '../../context/RfqContext';

export const Header = () => {
  const { companyInfo } = useData();
  const { basketItems, setIsBasketOpen } = useRfq();
  const totalBasketCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.phone}</span>
          </a>
          <span className="hidden sm:inline text-navy-800">|</span>
          <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.email}</span>
          </a>
          <span className="hidden lg:inline text-navy-800">|</span>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>610, Lodha Signet Palava, Thane, Kalyan</span>
          </div>
        </div>

        {/* Social Links & RFQ Basket Trigger */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={companyInfo.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-navy-800">|</span>

          <button
            onClick={() => setIsBasketOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 bg-navy-800 hover:bg-maritime-blue text-amber-300 font-semibold rounded-md border border-navy-700 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Basket</span>
            {totalBasketCount > 0 && (
              <span className="bg-amber-400 text-navy-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                {totalBasketCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
