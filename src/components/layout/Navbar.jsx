import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Send, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useRfq } from '../../context/RfqContext';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { categories: productCategories, companyInfo } = useData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openQuoteModalForProduct } = useRfq();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Products', path: '/products', hasDropdown: true },
    { label: 'New Arrivals', path: '/new-arrivals', badge: 'NEW' },
    { label: 'Our Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-2.5' : 'py-4'} border-b border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={companyInfo.logo}
            alt="Sanvi Maritime Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <div key={item.path} className="relative group/nav" onMouseLeave={() => item.hasDropdown && setIsDropdownOpen(false)}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${location.pathname.startsWith('/products')
                      ? 'text-maritime-blue bg-sky-50'
                      : 'text-slate-700 hover:text-maritime-blue hover:bg-slate-50'
                      }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-maritime-blue' : ''}`} />
                  </button>

                  {/* Products Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 z-50 animate-fadeIn"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                    >
                      <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                        <span>Categories</span>
                        <Link to="/products" className="text-maritime-blue hover:underline lowercase font-normal">
                          view all
                        </Link>
                      </div>
                      <div className="max-h-[380px] overflow-y-auto custom-scrollbar py-1">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.id}`}
                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group/cat"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-maritime-blue flex items-center justify-center font-bold text-xs group-hover/cat:bg-maritime-blue group-hover/cat:text-white transition-colors flex-shrink-0 mt-0.5">
                              {cat.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover/cat:text-maritime-blue transition-colors">
                                {cat.name}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                {cat.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${isActive
                      ? 'text-maritime-blue bg-sky-50'
                      : 'text-slate-700 hover:text-maritime-blue hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-400 text-navy-950 text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-sm animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* CTA Quote Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuoteModalForProduct(null)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-maritime-gold hover:bg-amber-500 text-navy-950 font-bold text-sm rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Request Quote</span>
          </button>

          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-700 hover:text-maritime-blue hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </nav>
  );
};
