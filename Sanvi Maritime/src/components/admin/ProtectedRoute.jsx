import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('sanvi_auth_token');
      if (!token) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const res = await getCurrentUser();
      if (res && res.success && res.data && res.data.role === 'ROLE_ADMIN') {
        localStorage.setItem('sanvi_user', JSON.stringify(res.data));
        setIsAuthorized(true);
      } else {
        localStorage.removeItem('sanvi_auth_token');
        localStorage.removeItem('sanvi_user');
        setIsAuthorized(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
