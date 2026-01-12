// ========================================
// CMS Dashboard - API Client
// ========================================

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  onUnauthorized?: () => void;
  onError?: (error: AxiosError) => void;
}

export const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Ajouter le token
  client.interceptors.request.use(
    (requestConfig) => {
      const token = useAuthStore.getState().token;
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Gérer les erreurs
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        config.onUnauthorized?.();
      }
      
      config.onError?.(error);
      return Promise.reject(error);
    }
  );

  return client;
};

// API Helper functions
export const apiHelpers = {
  // Articles
  articles: (client: AxiosInstance) => ({
    getAll: (params?: { page?: number; limit?: number; status?: string }) =>
      client.get('/articles', { params }),
    getById: (id: string) => client.get(`/articles/${id}`),
    getBySlug: (slug: string) => client.get(`/articles/slug/${slug}`),
    create: (data: any) => client.post('/articles', data),
    update: (id: string, data: any) => client.put(`/articles/${id}`, data),
    delete: (id: string) => client.delete(`/articles/${id}`),
  }),

  // Events
  events: (client: AxiosInstance) => ({
    getAll: (params?: { page?: number; limit?: number; status?: string }) =>
      client.get('/events', { params }),
    getById: (id: string) => client.get(`/events/${id}`),
    getBySlug: (slug: string) => client.get(`/events/slug/${slug}`),
    create: (data: any) => client.post('/events', data),
    update: (id: string, data: any) => client.put(`/events/${id}`, data),
    delete: (id: string) => client.delete(`/events/${id}`),
  }),

  // Pages
  pages: (client: AxiosInstance) => ({
    getAll: (params?: { status?: string }) =>
      client.get('/pages', { params }),
    getById: (id: string) => client.get(`/pages/${id}`),
    getBySlug: (slug: string) => client.get(`/pages/slug/${slug}`),
    create: (data: any) => client.post('/pages', data),
    update: (id: string, data: any) => client.put(`/pages/${id}`, data),
    delete: (id: string) => client.delete(`/pages/${id}`),
  }),

  // Media
  media: (client: AxiosInstance) => ({
    getAll: (params?: { page?: number; limit?: number; type?: string }) =>
      client.get('/media', { params }),
    getById: (id: string) => client.get(`/media/${id}`),
    upload: (file: File, onProgress?: (progress: number) => void) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return client.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.total) {
            const progress = Math.round((event.loaded * 100) / event.total);
            onProgress?.(progress);
          }
        },
      });
    },
    delete: (id: string) => client.delete(`/media/${id}`),
    updateMeta: (id: string, data: { alt?: string; caption?: string }) =>
      client.patch(`/media/${id}`, data),
  }),

  // Auth
  auth: (client: AxiosInstance) => ({
    login: (email: string, password: string) =>
      client.post('/auth/login', { email, password }),
    register: (data: { name: string; email: string; password: string }) =>
      client.post('/auth/register', data),
    me: () => client.get('/auth/me'),
    updateProfile: (data: { name?: string; email?: string }) =>
      client.patch('/auth/profile', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      client.post('/auth/change-password', data),
  }),

  // Stats
  stats: (client: AxiosInstance) => ({
    getDashboard: () => client.get('/stats/dashboard'),
  }),
};

// Export default instance
let defaultClient: AxiosInstance | null = null;

export const initializeApi = (config: ApiClientConfig) => {
  defaultClient = createApiClient(config);
  return defaultClient;
};

export const getApi = () => {
  if (!defaultClient) {
    throw new Error('API client not initialized. Call initializeApi() first.');
  }
  return defaultClient;
};

export default { createApiClient, apiHelpers, initializeApi, getApi };
