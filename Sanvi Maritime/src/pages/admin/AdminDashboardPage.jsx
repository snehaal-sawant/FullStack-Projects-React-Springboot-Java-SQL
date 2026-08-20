import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboard } from '../../services/api';
import {
  Package,
  FolderTree,
  Wrench,
  FileText,
  MessageSquare,
  Users,
  TrendingUp,
  ArrowRight,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      const res = await getAdminDashboard();
      if (res && res.success && res.data) {
        setStats(res.data);
      } else {
        setError(res?.error || 'Failed to load dashboard metrics.');
      }
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading admin dashboard statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-base">Error Loading Dashboard</h4>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Products', count: stats?.totalProducts || 0, icon: Package, link: '/admin/products', color: 'from-blue-500 to-cyan-500' },
    { title: 'Categories', count: stats?.totalCategories || 0, icon: FolderTree, link: '/admin/categories', color: 'from-indigo-500 to-purple-500' },
    { title: 'Services', count: stats?.totalServices || 0, icon: Wrench, link: '/admin/services', color: 'from-cyan-500 to-teal-500' },
    { title: 'Blog Posts', count: stats?.totalBlogs || 0, icon: FileText, link: '/admin/blogs', color: 'from-amber-500 to-orange-500' },
    { title: 'Inquiries', count: stats?.totalRfqs || 0, icon: MessageSquare, link: '/admin/rfqs', color: 'from-emerald-500 to-green-500' },
    { title: 'Registered Users', count: stats?.totalUsers || 0, icon: Users, link: '/admin/users', color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Welcome to Sanvi Maritime Administrative Control Panel. Real-time statistics, requests, and catalog management.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 text-cyan-400 pointer-events-none">
          <TrendingUp className="w-48 h-48" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
                  <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{card.count}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
                <span>Manage {card.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent RFQ Inquiries Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Recent Inquiries</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest quotations submitted by customers</p>
          </div>
          <Link
            to="/admin/rfqs"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentRfqs && stats.recentRfqs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Reference #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Company / Vessel</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {stats.recentRfqs.map((rfq) => (
                  <tr key={rfq.id || rfq.referenceNumber} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-cyan-400 font-semibold">{rfq.referenceNumber}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-100">{rfq.name || 'N/A'}</div>
                      <div className="text-xs text-slate-400">{rfq.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-slate-200">{rfq.company || 'Direct Client'}</div>
                      {rfq.vesselName && <div className="text-xs text-slate-400">Vessel: {rfq.vesselName}</div>}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400">
                      {rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${rfq.status === 'Received' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        rfq.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}>
                        {rfq.status === 'Received' ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        {rfq.status || 'Received'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        to="/admin/rfqs"
                        className="text-xs font-medium text-cyan-400 hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <p className="text-sm">No RFQ inquiries submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
