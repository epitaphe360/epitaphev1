// ========================================
// CMS Dashboard - Liste des Articles
// ========================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/Input';
import { Table, Column, Pagination } from '../../components/Table';
import { StatusBadge } from '../../components/Badge';
import { ConfirmDialog } from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { getApi } from '../../lib/api';
import { usePagination, useDebounce } from '../../hooks/useApi';
import { Article } from '../../types';

export const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const debouncedSearch = useDebounce(search, 300);
  const { page, setPage, limit, totalPages } = usePagination(total);

  useEffect(() => {
    loadArticles();
  }, [page, debouncedSearch]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const api = getApi();
      const response = await api.articles.getAll({
        page,
        limit,
        search: debouncedSearch || undefined,
      });
      setArticles(response.data);
      setTotal(response.total);
    } catch (error) {
      toast.error('Erreur', 'Impossible de charger les articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const api = getApi();
      await api.articles.delete(deleteId);
      toast.success('Succès', 'Article supprimé');
      loadArticles();
    } catch (error) {
      toast.error('Erreur', 'Impossible de supprimer l\'article');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: Column<Article>[] = [
    {
      key: 'title',
      header: 'Titre',
      render: (article) => (
        <div>
          <p className="font-medium text-gray-900">{article.title}</p>
          <p className="text-sm text-gray-500 truncate max-w-xs">{article.excerpt}</p>
        </div>
      ),
    },
    {
      key: 'category.name',
      header: 'Catégorie',
      render: (article) => article.category?.name || '-',
    },
    {
      key: 'status',
      header: 'Statut',
      render: (article) => <StatusBadge status={article.status} />,
    },
    {
      key: 'author.name',
      header: 'Auteur',
      render: (article) => article.author?.name || '-',
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (article) => new Date(article.createdAt).toLocaleDateString('fr-FR'),
    },
    {
      key: 'actions',
      header: '',
      width: '120px',
      render: (article) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            title="Voir"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/admin/articles/${article.id}/edit`)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(article.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-600">Gérez vos articles de blog</p>
        </div>
        <Link to="/admin/articles/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un article..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={articles}
          loading={loading}
          emptyMessage="Aucun article trouvé"
          onRowClick={(article) => navigate(`/admin/articles/${article.id}/edit`)}
        />
        {total > limit && (
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={setPage}
          />
        )}
      </Card>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer l'article"
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
        confirmText="Supprimer"
        loading={deleting}
      />
    </div>
  );
};

export default ArticlesList;
