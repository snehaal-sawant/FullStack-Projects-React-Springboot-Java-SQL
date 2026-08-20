import { fetchApi } from './api';

export const blogService = {
  getAllBlogs: async () => {
    return await fetchApi('/blogs');
  },

  getBlogBySlug: async (slug) => {
    return await fetchApi(`/blogs/${slug}`);
  },
};
