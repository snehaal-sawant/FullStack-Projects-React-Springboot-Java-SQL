import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Anchor, ChevronRight, Facebook, Linkedin, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Footer = () => {
  const { companyInfo, categories: productCategories } = useData();
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-maritime-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-800">
          
          {/* Col 1: Company Profile & Alang Highlight */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={companyInfo.logo} alt="Sanvi Maritime" className="h-10 bg-white p-1 rounded" />
              <span className="text-xl font-bold text-white font-heading tracking-tight">SANVI MARITIME</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="bg-navy-900/90 border border-navy-800 p-3 rounded-xl flex items-start gap-2.5">
              <Anchor className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-normal">
                <strong className="text-amber-300">Alang Shipyard Partnership:</strong> Direct access to Asia's largest ship breaking yard in Gujarat for high-grade reconditioned OEM spares.
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 pb-2 border-b border-navy-800">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Our Products</span>
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>New Arrivals</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Blogs & Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Product Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 pb-2 border-b border-navy-800">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {productCategories.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.id}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                    <ChevronRight className="w-3 h-3 text-amber-400" />
                    <span className="line-clamp-1">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 pb-2 border-b border-navy-800">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-tight">
                  {companyInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-amber-400 transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-amber-400 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-3 border-t border-navy-800 flex items-center gap-3">
              <span className="text-xs text-slate-400">Connect:</span>
              <a href={companyInfo.socials.facebook} target="_blank" rel="noreferrer" className="p-1.5 bg-navy-900 rounded-lg hover:text-amber-400 hover:bg-navy-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={companyInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-1.5 bg-navy-900 rounded-lg hover:text-amber-400 hover:bg-navy-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sanvi Marine Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DNV / GL / ABS Class Inspection Verified</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
