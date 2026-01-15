import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  FileText, Calendar, Image, TrendingUp, Plus, 
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Users, Settings, Zap
} from 'lucide-react';

interface Stats {
  articles: number;
  events: number;
  media: number;
  pages: number;
  users: number;
  recentActivity: Array<{ type: string; title: string; date: string }>;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    articles: 24,
    events: 8,
    media: 156,
    pages: 12,
    users: 5,
    recentActivity: [
      { type: 'article', title: 'Nouvel article: Guide React', date: '5 min' },
      { type: 'event', title: 'Événement créé: Webinaire', date: '2h' },
      { type: 'page', title: 'Page modifiée: À propos', date: '1 jour' },
      { type: 'user', title: 'Nouvel utilisateur: Marie', date: '2 jours' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const statCards = [
    {
      title: 'Articles',
      value: stats.articles,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      bgGradient: 'from-blue-50 to-blue-100',
      link: '/admin/articles',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Événements',
      value: stats.events,
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-50',
      bgGradient: 'from-green-50 to-green-100',
      link: '/admin/events',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Médias',
      value: stats.media,
      icon: Image,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      bgGradient: 'from-purple-50 to-purple-100',
      link: '/admin/media',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Pages',
      value: stats.pages,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      bgGradient: 'from-orange-50 to-orange-100',
      link: '/admin/pages',
      trend: '-2%',
      trendUp: false,
    },
  ];

  const quickActions = [
    {
      title: 'Nouvel Article',
      description: 'Créer un article avec un template',
      icon: FileText,
      link: '/admin/articles/new',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Nouvel Événement',
      description: 'Créer un événement',
      icon: Calendar,
      link: '/admin/events/new',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Uploader des Médias',
      description: 'Ajouter des images et fichiers',
      icon: Image,
      link: '/admin/media',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Bienvenue, Admin ! 👋</h1>
          <p className="text-blue-100">Vue d'ensemble de votre tableau de bord</p>
        </div>
        <div className="absolute right-0 top-0 opacity-10">
          <BarChart3 className="w-64 h-64" />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.link}>
              <a className="block group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className={`bg-gradient-to-br ${stat.bgGradient} p-6 h-full`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trendUp ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </Card>
              </a>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Actions Rapides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.link}>
                  <a className="block group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`${action.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </a>
                </Link>
              );
            })}
            
            {/* Settings Card */}
            <Link href="/admin/settings/general">
              <a className="block group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-600 hover:bg-slate-700 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                        <Settings className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          Paramètres
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Configurer votre site
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Activité Récente
          </h2>
          <Card className="h-full">
            <div className="p-6">
              <div className="space-y-4">
                {stats.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Top Contenus
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Article: Guide React', views: 1234 },
                { name: 'Article: Dashboard Design', views: 892 },
                { name: 'Événement: Webinaire', views: 654 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${(item.views / 1234) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.views}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Team Stats
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Utilisateurs Actifs', value: stats.users, color: 'text-green-600' },
                { name: 'Contenu Total', value: stats.articles + stats.events + stats.pages, color: 'text-blue-600' },
                { name: 'Stockage Utilisé', value: '2.3 GB', color: 'text-orange-600' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
