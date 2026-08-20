import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Wrench,
  FileText,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Settings
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('sanvi_user') || '{}');

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Blog Posts', path: '/admin/blogs', icon: FileText },
    { name: 'Inquiries', path: '/admin/rfqs', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sanvi_auth_token');
    localStorage.removeItem('sanvi_user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-white leading-tight">SANVI MARITIME</h1>
              <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">Admin Portal</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-inner'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Website Link */}
        <div className="p-4 border-t border-slate-800/80">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-cyan-300 transition-colors border border-slate-700/50">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Go to Live Website</span>
          </Link>
        </div>

        {/* Admin User Footer Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{user.name || 'Admin User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email || 'admin@sanvimaritime.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {navItems.find((item) => item.path === location.pathname)?.name || 'Admin Panel'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Live</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
