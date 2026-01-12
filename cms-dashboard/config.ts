// ========================================
// CMS Dashboard - Configuration
// ========================================

export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardConfig {
  // Branding
  appName: string;
  logo?: string;
  logoText?: string;
  
  // Colors (Tailwind classes ou hex)
  primaryColor: string;
  accentColor?: string;
  
  // API
  apiUrl: string;
  
  // Features - activer/désactiver les modules
  modules: {
    articles: boolean;
    events: boolean;
    pages: boolean;
    media: boolean;
    users?: boolean;
    settings?: boolean;
  };
  
  // Navigation personnalisée
  navigation: NavigationItem[];
  
  // Textes personnalisables
  texts?: {
    welcome?: string;
    dashboardTitle?: string;
    logoutText?: string;
  };
  
  // Callbacks personnalisés
  onLogout?: () => void;
  onError?: (error: Error) => void;
}

// Configuration par défaut
export const defaultConfig: DashboardConfig = {
  appName: 'CMS Dashboard',
  logoText: 'CMS',
  primaryColor: '#3B82F6', // blue-500
  accentColor: '#E63946',
  apiUrl: '/api',
  
  modules: {
    articles: true,
    events: true,
    pages: true,
    media: true,
    users: false,
    settings: false,
  },
  
  navigation: [
    { name: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
    { name: 'Articles', href: '/admin/articles', icon: 'FileText' },
    { name: 'Événements', href: '/admin/evenements', icon: 'Calendar' },
    { name: 'Pages', href: '/admin/pages', icon: 'FileEdit' },
    { name: 'Médias', href: '/admin/media', icon: 'Image' },
  ],
  
  texts: {
    welcome: 'Bienvenue',
    dashboardTitle: 'Dashboard',
    logoutText: 'Déconnexion',
  },
};

// Contexte pour partager la config
import { createContext, useContext } from 'react';

export const DashboardConfigContext = createContext<DashboardConfig>(defaultConfig);

export const useDashboardConfig = () => useContext(DashboardConfigContext);
