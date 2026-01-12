// ========================================
// CMS Dashboard - Layout Principal
// ========================================

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { ToastProvider } from '../components/Toast';
import { useAuthStore } from '../store/authStore';
import { DashboardConfigProvider, defaultConfig, DashboardConfig } from '../config';

interface DashboardLayoutProps {
  config?: Partial<DashboardConfig>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ config }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <DashboardConfigProvider config={mergedConfig}>
      <ToastProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar
            user={{
              name: user.name,
              email: user.email,
              avatar: undefined,
            }}
            onLogout={handleLogout}
          />

          <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  {/* Breadcrumb ou titre de page */}
                </div>
                <div className="flex items-center gap-4">
                  {/* Actions globales */}
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </ToastProvider>
    </DashboardConfigProvider>
  );
};

export default DashboardLayout;
