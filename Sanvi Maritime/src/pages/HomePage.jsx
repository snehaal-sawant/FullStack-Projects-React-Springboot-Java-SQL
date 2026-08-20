import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ShieldCheck, ArrowRight, Award, PackageCheck, Ship, Globe, Cpu, Zap, Wind, Droplets, Flame, Gauge, Waves, Snowflake, Compass } from 'lucide-react';
import { HeroSlider } from '../components/ui/HeroSlider';
import { ProductCard } from '../components/ui/ProductCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { BlogCard } from '../components/ui/BlogCard';
import { TestimonialSlider } from '../components/ui/TestimonialSlider';
import { Button } from '../components/common/Button';
import { productService } from '../services/productService';
import { marineService } from '../services/marineService';
import { blogService } from '../services/blogService';
import { servicesData as fallbackServices } from '../data/servicesData';
import { blogsData as fallbackBlogs } from '../data/blogsData';
import { useData } from '../context/DataContext';
import { useRfq } from '../context/RfqContext';

const catIconMap = {
  Cpu: Cpu,
  Zap: Zap,
  Wind: Wind,
  Droplets: Droplets,
  Flame: Flame,
  Gauge: Gauge,
  Waves: Waves,
  Snowflake: Snowflake,
  Anchor: Anchor,
  Compass: Compass
};

export const HomePage = () => {
  const { categories: productCategories, companyInfo, companyStats } = useData();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState(fallbackServices);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [isLoading, setIsLoading] = useState(true);
  const { openQuoteModalForProduct } = useRfq();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, srvRes, blogRes] = await Promise.allSettled([
          productService.getAllProducts({ isFeatured: true }),
          marineService.getAllServices(),
          blogService.getAllBlogs(),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value?.success && Array.isArray(prodRes.value.data)) {
          setFeaturedProducts(prodRes.value.data.slice(0, 8));
        }
        if (srvRes.status === 'fulfilled' && srvRes.value?.success && Array.isArray(srvRes.value.data) && srvRes.value.data.length > 0) {
          setServices(srvRes.value.data);
        }
        if (blogRes.status === 'fulfilled' && blogRes.value?.success && Array.isArray(blogRes.value.data) && blogRes.value.data.length > 0) {
          setBlogs(blogRes.value.data);
        }
      } catch (err) {
        console.error('Error fetching home page data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Stats & Trust Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {companyStats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-maritime-blue flex items-center justify-center font-bold text-xl flex-shrink-0 border border-sky-100">
                {idx === 0 && <PackageCheck className="w-6 h-6" />}
                {idx === 1 && <Ship className="w-6 h-6" />}
                {idx === 2 && <Globe className="w-6 h-6" />}
                {idx === 3 && <Award className="w-6 h-6 text-amber-500" />}
              </div>
              <div>
                <div className="text-2xl font-black text-navy-950 font-heading">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About Us Snippet Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://www.sanvimaritime.com/images/Aboutus/01.png"
                alt="Sanvi Maritime Kalyan Warehouse"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-navy-950 text-white p-6 rounded-2xl shadow-xl max-w-xs border border-navy-800 hidden sm:block">
              <div className="flex items-center gap-3">
                <Anchor className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold font-heading text-white">Alang Yard Connection</h4>
                  <p className="text-[11px] text-slate-300">Direct sourcing from vessel breaking in Gujarat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-maritime-blue rounded-full text-xs font-bold uppercase tracking-wider">
              <span>About Sanvi Maritime</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-heading leading-tight">
              Prominent Ship Spare Parts Supplier in Kalyan (Mumbai)
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {companyInfo.description}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {companyInfo.alangHighlight}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2 text-xs text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Brand New & Reconditioned Spares</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>OEM Certified Class Inspection</span>
              </div>
            </div>

            <div className="pt-3">
              <Link to="/about">
                <Button variant="primary" icon={ArrowRight} iconPosition="right">
                  Read More About Us
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Product Categories Grid */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading">
              EXPLORE OUR PRODUCT CATEGORIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We stock complete machinery units, overhauling spare parts, and electrical components for major vessel engine brands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productCategories.map((cat) => {
              const IconComp = catIconMap[cat.icon] || Cpu;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-maritime-blue transition-all group flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-maritime-blue group-hover:bg-maritime-blue group-hover:text-white transition-colors flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-navy-950 group-hover:text-maritime-blue line-clamp-2">
                    {cat.name}
                  </h3>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Featured Products Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Ready for Dispatch</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading mt-1">
              FEATURED MARINE SPARES
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View Entire Inventory
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Services Grid */}
      <section className="bg-navy-950 text-white py-16 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Expertise & Logistics</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              OUR MARINE SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              End-to-end maritime support from spare parts export to emergency afloat overhauling and port delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Global Trust</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading">
            WHAT SHIPOWNERS SAY ABOUT US
          </h2>
        </div>
        <TestimonialSlider />
      </section>

      {/* 8. Latest Blogs */}
      <section className="bg-slate-100 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Industry Knowledge</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading mt-1">
                LATEST BLOGS & TECHNICAL INSIGHTS
              </h2>
            </div>
            <Link to="/blog">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Articles
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

        </div>
      </section>

      {/* 9. Bottom RFQ Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-maritime-dark to-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Need Emergency Spare Parts for Your Vessel?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Send us your required part numbers or engine serials. Our Kalyan (Mumbai) office will provide a competitive quotation and delivery timeline within hours.
            </p>
          </div>
          <Button
            onClick={() => openQuoteModalForProduct(null)}
            variant="gold"
            size="lg"
            className="flex-shrink-0"
          >
            Get Immediate Quote
          </Button>
        </div>
      </section>

    </div>
  );
};
