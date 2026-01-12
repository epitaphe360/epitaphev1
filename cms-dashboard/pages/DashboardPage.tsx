// ========================================
// CMS Dashboard - Page Dashboard (Accueil)
// ========================================

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Files,
  Image,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { getApi } from '../lib/api';
import { useDashboardConfig } from '../config';

interface Stats {
  articles: number;
  events: number;
  pages: number;
  media: number;
  views?: number;
  growth?: number;
}

interface RecentItem {
  id: string;
  title: string;
  type: 'article' | 'event' | 'page';
  date: string;
  status: string;
}

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const config = useDashboardConfig();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const api = getApi();
      
      // Charger les stats
      const [articlesRes, eventsRes, pagesRes] = await Promise.all([
        api.articles.getAll({ limit: 1 }),
        api.events.getAll({ limit: 1 }),
        api.pages.getAll({ limit: 1 }),
      ]);

      setStats({
        articles: articlesRes.total || 0,
        events: eventsRes.total || 0,
        pages: pagesRes.total || 0,
        media: 0,
      });

      // Charger les éléments récents
      const [articles, events, pages] = await Promise.all([
        api.articles.getAll({ limit: 5 }),
        api.events.getAll({ limit: 5 }),
        api.pages.getAll({ limit: 5 }),
      ]);

      const items: RecentItem[] = [
        ...articles.data.map((a: any) => ({
          id: a.id,
          title: a.title,
          type: 'article' as const,
          date: a.createdAt,
          status: a.status,
        })),
        ...events.data.map((e: any) => ({
          id: e.id,
          title: e.title,
          type: 'event' as const,
          date: e.createdAt,
          status: e.status,
        })),
        ...pages.data.map((p: any) => ({
          id: p.id,
          title: p.title,
          type: 'page' as const,
          date: p.createdAt,
          status: p.status,
        })),
      ];

      // Trier par date
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecentItems(items.slice(0, 10));
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Articles',
      value: stats?.articles || 0,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/articles',
    },
    {
      title: 'Événements',
      value: stats?.events || 0,
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/admin/events',
    },
    {
      title: 'Pages',
      value: stats?.pages || 0,
      icon: Files,
      color: 'bg-green-500',
      link: '/admin/pages',
    },
    {
      title: 'Médias',
      value: stats?.media || 0,
      icon: Image,
      color: 'bg-orange-500',
      link: '/admin/media',
    },
  ];

  const quickActions = [
    { label: 'Nouvel article', icon: FileText, link: '/admin/articles/new', color: 'text-blue-600' },
    { label: 'Nouvel événement', icon: Calendar, link: '/admin/events/new', color: 'text-purple-600' },
    { label: 'Nouvelle page', icon: Files, link: '/admin/pages/new', color: 'text-green-600' },
    { label: 'Uploader média', icon: Image, link: '/admin/media', color: 'text-orange-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.link}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 bg-gray-100 rounded-lg ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
                <Plus className="w-4 h-4 ml-auto text-gray-400" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Activité récente</CardTitle>
            <Link to="/admin/articles" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune activité récente</p>
              ) : (
                recentItems.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'article' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'event' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {item.type === 'article' ? <FileText className="w-4 h-4" /> :
                         item.type === 'event' ? <Calendar className="w-4 h-4" /> :
                         <Files className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
