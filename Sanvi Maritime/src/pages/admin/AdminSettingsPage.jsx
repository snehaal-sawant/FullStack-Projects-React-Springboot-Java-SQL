import React, { useEffect, useState } from 'react';
import { getCompanySettings, updateCompanySettings } from '../../services/api';
import { useData } from '../../context/DataContext';
import {
  Settings,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building,
  Phone,
  Share2,
  BarChart3
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { refreshData } = useData();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    id: 'default',
    name: '',
    tagline: '',
    address: '',
    warehouseAddress: '',
    phone: '',
    altPhone: '',
    email: '',
    salesEmail: '',
    workingHours: '',
    facebook: '',
    linkedin: '',
    whatsapp: '',
    logo: '',
    statsJson: ''
  });

  const fetchSettings = async () => {
    setLoading(true);
    setError('');
    const res = await getCompanySettings();
    if (res && res.success && res.data) {
      const d = res.data;
      setFormData({
        id: 'default',
        name: d.name || '',
        tagline: d.tagline || '',
        address: d.address || '',
        warehouseAddress: d.warehouseAddress || '',
        phone: d.phone || '',
        altPhone: d.altPhone || '',
        email: d.email || '',
        salesEmail: d.salesEmail || '',
        workingHours: d.workingHours || '',
        facebook: d.facebook || '',
        linkedin: d.linkedin || '',
        whatsapp: d.whatsapp || '',
        logo: d.logo || '',
        statsJson: d.statsJson || ''
      });
    } else {
      setError(res?.error || 'Failed to load settings.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await updateCompanySettings(formData);
      if (res && res.success) {
        setSuccessMsg('Settings updated successfully!');
        refreshData();
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setError(res?.error || 'Failed to update settings.');
      }
    } catch (err) {
      setError('An error occurred while updating settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="w-7 h-7 text-indigo-400" />
            Company & Site Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage company information, contact details, social links, and statistics displayed on the website.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building className="w-5 h-5 text-indigo-400" />
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Logo URL</label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline / Header Description</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-5 h-5 text-indigo-400" />
            Contact & Location Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Alternative Phone</label>
              <input
                type="text"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">General Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Sales Email</label>
              <input
                type="email"
                name="salesEmail"
                value={formData.salesEmail}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Main Head Office Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Alang Warehouse Address</label>
              <textarea
                name="warehouseAddress"
                rows="3"
                value={formData.warehouseAddress}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Share2 className="w-5 h-5 text-indigo-400" />
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Facebook URL</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp URL</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Statistics JSON */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Homepage Key Performance Statistics (JSON)
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Stats JSON Config</label>
            <textarea
              name="statsJson"
              rows="4"
              value={formData.statsJson}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
