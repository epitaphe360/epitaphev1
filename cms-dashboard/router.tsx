// ========================================
// CMS Dashboard - Router Configuration
// ========================================

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

// Import pages
import { DashboardLayout } from './layouts/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MediaLibrary } from './pages/MediaLibrary';
import { ArticlesList, ArticleForm } from './pages/articles';
import { EventsList, EventForm } from './pages/events';
import { PagesList, PageForm } from './pages/pages';

// Auth guard component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  loginPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  loginPath = '/admin/login',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }
  return <>{children}</>;
};

// Get dashboard routes
export const getDashboardRoutes = (
  basePath: string = '/admin',
  isAuthenticated: boolean = false
): RouteObject[] => {
  return [
    {
      path: `${basePath}/login`,
      element: <LoginPage />,
    },
    {
      path: basePath,
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        // Articles
        {
          path: 'articles',
          element: <ArticlesList />,
        },
        {
          path: 'articles/new',
          element: <ArticleForm />,
        },
        {
          path: 'articles/:id/edit',
          element: <ArticleForm />,
        },
        // Events
        {
          path: 'events',
          element: <EventsList />,
        },
        {
          path: 'events/new',
          element: <EventForm />,
        },
        {
          path: 'events/:id/edit',
          element: <EventForm />,
        },
        // Pages
        {
          path: 'pages',
          element: <PagesList />,
        },
        {
          path: 'pages/new',
          element: <PageForm />,
        },
        {
          path: 'pages/:id/edit',
          element: <PageForm />,
        },
        // Media
        {
          path: 'media',
          element: <MediaLibrary />,
        },
      ],
    },
  ];
};

export default getDashboardRoutes;
