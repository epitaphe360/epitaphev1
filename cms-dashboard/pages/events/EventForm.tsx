// ========================================
// CMS Dashboard - Création/Édition d'Événement
// ========================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input, Textarea, Select } from '../../components/Input';
import { RichTextEditor } from '../../components/RichTextEditor';
import { FileUpload } from '../../components/FileUpload';
import { useToast } from '../../components/Toast';
import { getApi } from '../../lib/api';
import { Event, EventFormData } from '../../types';

export const EventForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    featuredImage: '',
    startDate: '',
    endDate: '',
    location: '',
    address: '',
    capacity: undefined,
    price: undefined,
    status: 'DRAFT',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    if (isEditing) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    setLoading(true);
    try {
      const api = getApi();
      const event = await api.events.getById(id!);
      setFormData({
        title: event.title,
        slug: event.slug,
        description: event.description || '',
        content: event.content || '',
        featuredImage: event.featuredImage || '',
        startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
        location: event.location || '',
        address: event.address || '',
        capacity: event.capacity,
        price: event.price,
        status: event.status,
        metaTitle: event.metaTitle || '',
        metaDescription: event.metaDescription || '',
      });
    } catch (error) {
      toast.error('Erreur', 'Impossible de charger l\'événement');
      navigate('/admin/events');
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
      const data = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      if (isEditing) {
        await api.events.update(id!, data);
        toast.success('Succès', 'Événement mis à jour');
      } else {
        await api.events.create(data);
        toast.success('Succès', 'Événement créé');
      }
      navigate('/admin/events');
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
            onClick={() => navigate('/admin/events')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Modifier l\'événement' : 'Nouvel événement'}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && formData.slug && (
            <Button
              variant="secondary"
              onClick={() => window.open(`/evenements/${formData.slug}`, '_blank')}
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
                placeholder="Nom de l'événement"
                required
              />

              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-de-l-evenement"
              />

              <Textarea
                label="Description courte"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Résumé de l'événement..."
                rows={3}
              />

              <RichTextEditor
                label="Description complète"
                value={formData.content}
                onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              />
            </CardContent>
          </Card>

          {/* Lieu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Lieu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Nom du lieu"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Ex: Sofitel Casablanca"
              />

              <Textarea
                label="Adresse complète"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Adresse, ville, code postal..."
                rows={2}
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
                  { value: 'CANCELLED', label: 'Annulé' },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date & Heure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Début"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                required
              />

              <Input
                label="Fin"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Inscriptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Capacité max"
                type="number"
                value={formData.capacity || ''}
                onChange={(e) => setFormData((prev) => ({ 
                  ...prev, 
                  capacity: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="Illimité"
              />

              <Input
                label="Prix (MAD)"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData((prev) => ({ 
                  ...prev, 
                  price: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
                placeholder="Gratuit"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featuredImage ? (
                <div className="space-y-4">
                  <img
                    src={formData.featuredImage}
                    alt="Event"
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

export default EventForm;
