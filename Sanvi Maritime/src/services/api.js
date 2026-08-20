const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const handleApiResponse = (response) => {
  return response;
};

export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('sanvi_auth_token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || data.message || `HTTP error ${res.status}`;
      
      // Auto-logout if unauthorized on admin endpoint
      if (res.status === 401 && endpoint.startsWith('/admin')) {
        localStorage.removeItem('sanvi_auth_token');
        localStorage.removeItem('sanvi_user');
      }

      return {
        success: false,
        error: errorMsg,
        status: res.status,
      };
    }

    return data;
  } catch (err) {
    console.error(`API Fetch Error [${endpoint}]:`, err);
    return {
      success: false,
      error: 'Network connection failed. Please ensure the backend server is running.',
    };
  }
};

// Auth API
export const loginUser = async (email, password) => {
  return await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getCurrentUser = async () => {
  return await fetchApi('/auth/me');
};

// Admin Dashboard API
export const getAdminDashboard = async () => {
  return await fetchApi('/admin/dashboard');
};

// Admin Users API
export const getAdminUsers = async () => {
  return await fetchApi('/admin/users');
};

export const deleteAdminUser = async (id) => {
  return await fetchApi(`/admin/users/${id}`, { method: 'DELETE' });
};

// Admin Products API
export const getAdminProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await fetchApi(`/products${query ? `?${query}` : ''}`);
};

export const createAdminProduct = async (productData) => {
  return await fetchApi('/admin/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

export const updateAdminProduct = async (id, productData) => {
  return await fetchApi(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

export const deleteAdminProduct = async (id) => {
  return await fetchApi(`/admin/products/${id}`, { method: 'DELETE' });
};

// Admin Categories API
export const getAdminCategories = async () => {
  return await fetchApi('/categories');
};

export const createAdminCategory = async (categoryData) => {
  return await fetchApi('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
};

export const updateAdminCategory = async (id, categoryData) => {
  return await fetchApi(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });
};

export const deleteAdminCategory = async (id) => {
  return await fetchApi(`/admin/categories/${id}`, { method: 'DELETE' });
};

// Admin Marine Services API
export const getAdminServices = async () => {
  return await fetchApi('/services');
};

export const createAdminService = async (serviceData) => {
  return await fetchApi('/admin/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });
};

export const updateAdminService = async (id, serviceData) => {
  return await fetchApi(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });
};

export const deleteAdminService = async (id) => {
  return await fetchApi(`/admin/services/${id}`, { method: 'DELETE' });
};

// Admin Blog Posts API
export const getAdminBlogs = async () => {
  return await fetchApi('/blogs');
};

export const createAdminBlog = async (blogData) => {
  return await fetchApi('/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  });
};

export const updateAdminBlog = async (id, blogData) => {
  return await fetchApi(`/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  });
};

export const deleteAdminBlog = async (id) => {
  return await fetchApi(`/admin/blogs/${id}`, { method: 'DELETE' });
};

// Admin RFQ Inquiries API
export const getAdminRfqs = async () => {
  return await fetchApi('/admin/rfqs');
};

export const updateAdminRfqStatus = async (id, status) => {
  return await fetchApi(`/admin/rfqs/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PUT',
  });
};

export const deleteAdminRfq = async (id) => {
  return await fetchApi(`/admin/rfqs/${id}`, { method: 'DELETE' });
};

// Company Settings API
export const getCompanySettings = async () => {
  return await fetchApi('/settings');
};

export const updateCompanySettings = async (settingsData) => {
  return await fetchApi('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  });
};
