// ========================================
// CMS Dashboard - Création/Édition de Page
// ========================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input, Textarea, Select } from '../../components/Input';
import { RichTextEditor } from '../../components/RichTextEditor';
import { useToast } from '../../components/Toast';
import { getApi } from '../../lib/api';
import { Page, PageSection } from '../../types';

interface PageFormData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  template: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  sections: PageSection[];
}

const defaultSection: Partial<PageSection> = {
  type: 'text',
  title: '',
  content: '',
  order: 0,
};

const sectionTypes = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'text', label: 'Texte' },
  { value: 'image', label: 'Image' },
  { value: 'gallery', label: 'Galerie' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'features', label: 'Fonctionnalités' },
  { value: 'testimonials', label: 'Témoignages' },
  { value: 'contact', label: 'Contact' },
];

export const PageForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<PageFormData>({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    template: 'default',
    status: 'DRAFT',
    sections: [],
  });

  useEffect(() => {
    if (isEditing) {
      loadPage();
    }
  }, [id]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const api = getApi();
      const page = await api.pages.getById(id!);
      setFormData({
        title: page.title,
        slug: page.slug,
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        template: page.template || 'default',
        status: page.status,
        sections: page.sections || [],
      });
    } catch (error) {
      toast.error('Erreur', 'Impossible de charger la page');
      navigate('/admin/pages');
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

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          ...defaultSection,
          id: `temp-${Date.now()}`,
          order: prev.sections.length,
        } as PageSection,
      ],
    }));
  };

  const updateSection = (index: number, updates: Partial<PageSection>) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, ...updates } : section
      ),
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const api = getApi();
      if (isEditing) {
        await api.pages.update(id!, formData);
        toast.success('Succès', 'Page mise à jour');
      } else {
        await api.pages.create(formData);
        toast.success('Succès', 'Page créée');
      }
      navigate('/admin/pages');
    } catch (error: any) {
      toast.error('Erreur', error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
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
            onClick={() => navigate('/admin/pages')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Modifier la page' : 'Nouvelle page'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && formData.slug && (
            <Button
              variant="secondary"
              onClick={() => window.open(`/${formData.slug}`, '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir
            </Button>
          )}
          <Button onClick={handleSubmit} loading={saving}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Mettre à jour' : 'Créer'}
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
                placeholder="Titre de la page"
                required
              />

              <Input
                label="Slug (URL)"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-de-la-page"
              />
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sections</CardTitle>
              <Button variant="secondary" size="sm" onClick={addSection} type="button">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une section
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.sections.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune section. Cliquez sur "Ajouter une section" pour commencer.
                </div>
              ) : (
                formData.sections.map((section, index) => (
                  <div
                    key={section.id || index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                        <span className="font-medium">Section {index + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Type"
                        value={section.type}
                        onChange={(e) => updateSection(index, { type: e.target.value })}
                        options={sectionTypes}
                      />
                      <Input
                        label="Titre"
                        value={section.title || ''}
                        onChange={(e) => updateSection(index, { title: e.target.value })}
                        placeholder="Titre de la section"
                      />
                    </div>

                    <RichTextEditor
                      label="Contenu"
                      value={section.content || ''}
                      onChange={(content) => updateSection(index, { content })}
                      minHeight="150px"
                    />
                  </div>
                ))
              )}
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
                label="Template"
                value={formData.template}
                onChange={(e) => setFormData((prev) => ({ ...prev, template: e.target.value }))}
                options={[
                  { value: 'default', label: 'Par défaut' },
                  { value: 'full-width', label: 'Pleine largeur' },
                  { value: 'sidebar', label: 'Avec sidebar' },
                  { value: 'landing', label: 'Landing page' },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
