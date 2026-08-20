import React, { useState, useEffect } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ui/ProductCard';
import { Loader } from '../components/common/Loader';
import { Select } from '../components/common/Select';
import { brandList } from '../data/companyData';

export const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoading(true);
      try {
        const res = await productService.getAllProducts({ isNewArrival: true });
        let filtered = res.data;
        if (selectedBrand !== 'all') {
          filtered = filtered.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
        }
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, [selectedBrand]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recently Sourced Stock</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            NEW ARRIVALS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore recently dismantled and inspected marine spare parts directly received from Alang Ship Breaking Yard and OEM factory partners.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Brand Selector Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-800 font-heading flex items-center gap-2">
            <Filter className="w-4 h-4 text-maritime-blue" />
            <span>Filter New Arrivals by Engine Brand:</span>
          </div>
          <div className="w-full sm:w-64">
            <Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              placeholder="All Brands"
              options={brandList.map(b => ({ label: b, value: b }))}
            />
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <Loader label="Fetching new arrivals stock..." />
        ) : products.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
            No new arrivals found for selected brand.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
