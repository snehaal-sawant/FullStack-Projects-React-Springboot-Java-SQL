import { fetchApi } from './api';

const parseFeatures = (service) => {
  if (!service) return service;
  let featuresArr = service.features || [];
  if (service.featuresJson && typeof service.featuresJson === 'string') {
    try {
      featuresArr = JSON.parse(service.featuresJson);
    } catch (e) {
      console.warn('Failed to parse featuresJson:', e);
    }
  }
  return {
    ...service,
    features: featuresArr,
  };
};

export const marineService = {
  getAllServices: async () => {
    const res = await fetchApi('/services');
    if (res.success && Array.isArray(res.data)) {
      return {
        ...res,
        data: res.data.map(parseFeatures),
      };
    }
    return res;
  },

  getServiceById: async (id) => {
    const res = await fetchApi(`/services/${id}`);
    if (res.success && res.data) {
      return {
        ...res,
        data: parseFeatures(res.data),
      };
    }
    return res;
  },
};
