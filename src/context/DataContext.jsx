import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAdminCategories, getCompanySettings } from '../services/api';
import { companyInfo as fallbackCompanyInfo, companyStats as fallbackStats, productCategories as fallbackCategories } from '../data/companyData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(fallbackCategories);
  const [companyInfo, setCompanyInfo] = useState(fallbackCompanyInfo);
  const [companyStats, setCompanyStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  const fetchLiveData = useCallback(async () => {
    try {
      // 1. Fetch Categories
      const catRes = await getAdminCategories();
      if (catRes && catRes.success && Array.isArray(catRes.data) && catRes.data.length > 0) {
        setCategories(catRes.data);
      }

      // 2. Fetch Settings
      const setRes = await getCompanySettings();
      if (setRes && setRes.success && setRes.data) {
        const d = setRes.data;
        setCompanyInfo({
          name: d.name || fallbackCompanyInfo.name,
          tagline: d.tagline || fallbackCompanyInfo.tagline,
          address: d.address || fallbackCompanyInfo.address,
          warehouseAddress: d.warehouseAddress || fallbackCompanyInfo.warehouseAddress,
          phone: d.phone || fallbackCompanyInfo.phone,
          altPhone: d.altPhone || fallbackCompanyInfo.altPhone,
          email: d.email || fallbackCompanyInfo.email,
          salesEmail: d.salesEmail || fallbackCompanyInfo.salesEmail,
          workingHours: d.workingHours || fallbackCompanyInfo.workingHours,
          socials: {
            facebook: d.facebook || fallbackCompanyInfo.socials.facebook,
            linkedin: d.linkedin || fallbackCompanyInfo.socials.linkedin,
            whatsapp: d.whatsapp || fallbackCompanyInfo.socials.whatsapp,
          },
          logo: d.logo || fallbackCompanyInfo.logo
        });

        if (d.statsJson) {
          try {
            const parsedStats = JSON.parse(d.statsJson);
            if (Array.isArray(parsedStats) && parsedStats.length > 0) {
              setCompanyStats(parsedStats);
            }
          } catch (e) {
            console.error('Failed to parse statsJson:', e);
          }
        }
      }
    } catch (err) {
      console.error('Error loading live data in DataContext:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  return (
    <DataContext.Provider value={{
      categories,
      companyInfo,
      companyStats,
      loading,
      refreshData: fetchLiveData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
