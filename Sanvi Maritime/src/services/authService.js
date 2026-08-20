import { fetchApi } from './api';

export const authService = {
  login: async (credentials) => {
    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.success && res.data?.token) {
      localStorage.setItem('sanvi_auth_token', res.data.token);
      localStorage.setItem('sanvi_user_info', JSON.stringify(res.data.user));
    }
    return res;
  },

  register: async (userData) => {
    const res = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.success && res.data?.token) {
      localStorage.setItem('sanvi_auth_token', res.data.token);
      localStorage.setItem('sanvi_user_info', JSON.stringify(res.data.user));
    }
    return res;
  },

  getCurrentUser: async () => {
    const res = await fetchApi('/auth/me');
    if (res.success && res.data) {
      localStorage.setItem('sanvi_user_info', JSON.stringify(res.data));
    }
    return res;
  },

  logout: () => {
    localStorage.removeItem('sanvi_auth_token');
    localStorage.removeItem('sanvi_user_info');
  },
};
