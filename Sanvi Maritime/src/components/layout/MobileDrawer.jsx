import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronDown, Phone, Mail, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useRfq } from '../../context/RfqContext';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { companyInfo, categories: productCategories } = useData();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { openQuoteModalForProduct } = useRfq();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto custom-scrollbar animate-slideDown">

        {/* Drawer Header */}
        <div className="p-4 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-2">
            <img src={companyInfo.logo} alt="Logo" className="h-8 w-auto bg-white p-1 rounded" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="p-4 flex-1 space-y-1">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            About Us
          </NavLink>

          {/* Products Collapsible */}
          <div>
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Our Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180 text-maritime-blue' : ''}`} />
            </button>
            {isProductsOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg my-1">
                <Link
                  to="/products"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-maritime-blue hover:underline"
                >
                  View All Products Catalog →
                </Link>
                {productCategories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={onClose}
                    className="block px-3 py-2 text-xs text-slate-600 hover:text-maritime-blue font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/new-arrivals"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            New Arrivals
          </NavLink>

          <NavLink
            to="/services"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Our Services
          </NavLink>

          <NavLink
            to="/blog"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/contact"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-sky-50 text-maritime-blue' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Drawer Footer Contact */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <button
            onClick={() => {
              onClose();
              openQuoteModalForProduct(null);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-maritime-gold text-navy-950 font-bold text-sm rounded-lg shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Request Quick Quote</span>
          </button>

          <div className="text-xs text-slate-600 space-y-2 pt-2">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-maritime-blue">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{companyInfo.phone}</span>
            </a>
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-maritime-blue">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
