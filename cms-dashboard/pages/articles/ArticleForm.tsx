// ========================================
// CMS Dashboard - Création/Édition d'Article
// ========================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input, Textarea, Select } from '../../components/Input';
import { RichTextEditor } from '../../components/RichTextEditor';
import { FileUpload, ImagePreview } from '../../components/FileUpload';
import { useToast } from '../../components/Toast';
import { getApi } from '../../lib/api';
import { Article, ArticleFormData } from '../../types';

export const ArticleForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    status: 'DRAFT',
    categoryId: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadArticle();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const api = getApi();
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const loadArticle = async () => {
    setLoading(true);
    try {
      const api = getApi();
      const article = await api.articles.getById(id!);
      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || '',
        content: article.content,
        featuredImage: article.featuredImage || '',
        status: article.status,
        categoryId: article.categoryId || '',
        tags: article.tags || [],
        metaTitle: article.metaTitle || '',
        metaDescription: article.metaDescription || '',
      });
    } catch (error) {
      toast.error('Erreur', 'Impossible de charger l\'article');
      navigate('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const api = getApi();
      if (isEditing) {
        await api.articles.update(id!, formData);
        toast.success('Succès', 'Article mis à jour');
      } else {
        await api.articles.create(formData);
        toast.success('Succès', 'Article créé');
      }
      navigate('/admin/articles');
    } catch (error: any) {
      toast.error('Erreur', error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (files: File[]) => {
    try {
      const api = getApi();
      const formDataUpload = new FormData();
      formDataUpload.append('file', files[0]);
      
      const response = await api.media.upload(formDataUpload);
      setFormData((prev) => ({ ...prev, featuredImage: response.url }));
      toast.success('Succès', 'Image uploadée');
    } catch (error) {
      toast.error('Erreur', 'Impossible d\'uploader l\'image');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/articles')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && formData.slug && (
            <Button
              variant="secondary"
              onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir
            </Button>
          )}
          <Button onClick={handleSubmit} loading={saving}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Mettre à jour' : 'Publier'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Input
                label="Titre"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Titre de l'article"
                required
              />

              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-de-l-article"
              />

              <Textarea
                label="Extrait"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Résumé court de l'article..."
                rows={3}
              />

              <RichTextEditor
                label="Contenu"
                value={formData.content}
                onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="Titre pour les moteurs de recherche"
              />

              <Textarea
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Description pour les moteurs de recherche..."
                rows={2}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Statut"
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                options={[
                  { value: 'DRAFT', label: 'Brouillon' },
                  { value: 'PUBLISHED', label: 'Publié' },
                  { value: 'ARCHIVED', label: 'Archivé' },
                ]}
              />

              <Select
                label="Catégorie"
                value={formData.categoryId}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                options={[
                  { value: '', label: 'Sélectionner...' },
                  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image à la une</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featuredImage ? (
                <div className="space-y-4">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setFormData((prev) => ({ ...prev, featuredImage: '' }))}
                  >
                    Supprimer l'image
                  </Button>
                </div>
              ) : (
                <FileUpload
                  onUpload={handleImageUpload}
                  accept="image/*"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
