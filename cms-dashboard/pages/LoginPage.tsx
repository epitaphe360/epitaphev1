// ========================================
// CMS Dashboard - Page de Connexion
// ========================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Input, PasswordInput } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useAuthStore } from '../store/authStore';
import { getApi } from '../lib/api';
import { useDashboardConfig } from '../config';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const config = useDashboardConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const api = getApi();
      const response = await api.auth.login(email, password);
      
      login(response.user, response.token);
      navigate(config.routes?.dashboard || '/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {config.branding.logo ? (
            <img
              src={config.branding.logo}
              alt={config.branding.name}
              className="h-12 mx-auto mb-4"
            />
          ) : (
            <div className="w-12 h-12 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {config.branding.name.charAt(0)}
              </span>
            </div>
          )}
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Accédez au tableau de bord d'administration
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />

            <PasswordInput
              label="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
