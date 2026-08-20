import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RfqProvider } from './context/RfqContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Components and Pages
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';
import { AdminRfqsPage } from './pages/admin/AdminRfqsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <DataProvider>
      <RfqProvider>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProductsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCategoriesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminServicesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBlogsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rfqs"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminRfqsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminUsersPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSettingsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Public Website Routes */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/blog" element={<BlogsPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </RfqProvider>
    </DataProvider>
  );
}
