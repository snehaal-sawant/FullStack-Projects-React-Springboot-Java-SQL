import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { brandList } from '../../data/companyData';
import { useData } from '../../context/DataContext';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

export const ProductFilter = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  const { categories: productCategories } = useData();
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2 font-bold font-heading text-navy-950 text-base">
          <Filter className="w-4 h-4 text-maritime-blue" />
          <span>Filter Spares Catalog</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Bar */}
      <Input
        label="Search Part / Model / PN"
        icon={Search}
        placeholder="e.g. Yanmar 146623, Woodward..."
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
      />

      {/* Categories */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          Category
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === 'all' ? 'bg-maritime-blue text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {productCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onFilterChange('category', cat.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.id ? 'bg-maritime-blue text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="line-clamp-1">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Select */}
      <Select
        label="Engine / Equipment Brand"
        value={filters.brand}
        onChange={(e) => onFilterChange('brand', e.target.value)}
        placeholder="All Brands"
        options={brandList.map(b => ({ label: b, value: b }))}
      />

      {/* Condition Select */}
      <Select
        label="Condition Status"
        value={filters.condition}
        onChange={(e) => onFilterChange('condition', e.target.value)}
        placeholder="All Conditions"
        options={[
          { label: 'Brand New OEM', value: 'Brand New' },
          { label: 'Reconditioned / Overhauled', value: 'Reconditioned' }
        ]}
      />

    </div>
  );
};
