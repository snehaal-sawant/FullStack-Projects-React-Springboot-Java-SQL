import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageCheck, Grid, List, SlidersHorizontal } from 'lucide-react';
import { ProductFilter } from '../components/ui/ProductFilter';
import { ProductCard } from '../components/ui/ProductCard';
import { Loader } from '../components/common/Loader';
import { Pagination } from '../components/common/Pagination';
import { productService } from '../services/productService';
import { useData } from '../context/DataContext';

export const ProductsPage = () => {
  const { categories: productCategories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState({
    category: initialCategory,
    brand: 'all',
    condition: 'all',
    search: ''
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Sync query params when url category changes
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const res = await productService.getAllProducts(filters);
        setProducts(res.data);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') {
      if (value === 'all') {
        searchParams.delete('category');
        setSearchParams(searchParams);
      } else {
        setSearchParams({ category: value });
      }
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      condition: 'all',
      search: ''
    });
    setSearchParams({});
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeCategoryObj = productCategories.find(c => c.id === filters.category);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-400/20 text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Spare Parts Inventory Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            {activeCategoryObj ? activeCategoryObj.name : "OUR PRODUCTS & MARINE SPARES"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {activeCategoryObj ? activeCategoryObj.description : "Browse over 15,000 brand new OEM & reconditioned ship spare parts available in our Kalyan warehouse and Alang stockyard."}
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Catalog Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="font-semibold text-slate-700">
                Showing <span className="text-maritime-blue font-bold">{products.length}</span> matching spare parts
              </div>

              {(filters.category !== 'all' || filters.brand !== 'all' || filters.condition !== 'all' || filters.search) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

            {/* Product Cards */}
            {isLoading ? (
              <Loader label="Searching marine spare parts database..." />
            ) : paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 font-heading">No Spare Parts Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any items matching your filter criteria. Try adjusting your brand or category selection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-maritime-blue text-white text-xs font-bold rounded-lg hover:bg-navy-900 transition-colors mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
