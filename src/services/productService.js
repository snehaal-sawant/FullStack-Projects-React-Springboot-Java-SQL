import { fetchApi } from './api';

const parseSpecs = (product) => {
  if (!product) return product;
  let specsObj = product.specs || {};
  if (product.specsJson && typeof product.specsJson === 'string') {
    try {
      specsObj = JSON.parse(product.specsJson);
    } catch (e) {
      console.warn('Failed to parse specsJson:', e);
    }
  }
  return {
    ...product,
    specs: specsObj,
  };
};

export const productService = {
  getAllProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.brand && filters.brand !== 'all') params.append('brand', filters.brand);
    if (filters.condition && filters.condition !== 'all') params.append('condition', filters.condition);
    if (filters.search) params.append('search', filters.search);
    if (filters.isNewArrival) params.append('isNewArrival', 'true');
    if (filters.isFeatured) params.append('isFeatured', 'true');

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetchApi(`/products${queryString}`);
    
    if (res.success && Array.isArray(res.data)) {
      return {
        ...res,
        data: res.data.map(parseSpecs),
      };
    }
    return res;
  },

  getProductById: async (id) => {
    const res = await fetchApi(`/products/${id}`);
    if (res.success && res.data) {
      return {
        ...res,
        data: parseSpecs(res.data),
      };
    }
    return res;
  },

  getRelatedProducts: async (categoryId, currentId) => {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (currentId) params.append('currentId', currentId);

    const res = await fetchApi(`/products/related?${params.toString()}`);
    if (res.success && Array.isArray(res.data)) {
      return {
        ...res,
        data: res.data.map(parseSpecs),
      };
    }
    return res;
  },

  getAllCategories: async () => {
    return await fetchApi('/categories');
  }
};
