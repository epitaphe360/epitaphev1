// ========================================
// CMS Dashboard - Layout Principal
// ========================================

import React from 'react';
import { useLocation } from 'wouter';
import { Sidebar } from '../components/Sidebar';
import { ToastProvider } from '../components/Toast';
import { useAuthStore } from '../store/authStore';
import { DashboardConfigProvider, defaultConfig, DashboardConfig } from '../config';

interface DashboardLayoutProps {
  config?: Partial<DashboardConfig>;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ config, children }) => {
  const { user, logout } = useAuthStore();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/admin/login');
  };

  if (!user) {
    setLocation('/admin/login');
    return null;
  }

  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <DashboardConfigProvider config={mergedConfig}>
      <ToastProvider>
        <div data-admin-page className="admin-dashboard flex h-screen overflow-hidden" style={{ backgroundColor: '#0f172a', color: '#e2e8f0' }}>
          <Sidebar
            user={{
              name: user.name,
              email: user.email,
              avatar: undefined,
            }}
            onLogout={handleLogout}
          />

          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative" style={{ backgroundColor: '#0f172a' }}>
            {/* Content Area - Full screen pour le dashboard */}
                   <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pt-16 md:pt-1 px-1 pb-1">
              <div className="min-h-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </ToastProvider>
    </DashboardConfigProvider>
  );
};

export default DashboardLayout;
