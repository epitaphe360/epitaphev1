// ========================================
// CMS Dashboard - Page de Connexion
// ========================================

import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === 'admin@epitaph.ma' && password === 'admin123') {
        const mockUser = {
          id: 1,
          name: 'Administrateur',
          email: 'admin@epitaph.ma',
          role: 'admin'
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        login(mockToken, mockUser);
        setLocation('/admin');
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (err: any) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm px-8">
        {/* Logo & Header */}
        <div className="mb-16 text-center">
          <div className="text-4xl font-light text-white mb-2">Epitaphe</div>
          <div className="text-xs text-gray-500 tracking-widest uppercase">Administration</div>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Demo Info */}
            <div className="text-center pt-2 pb-4">
              <p className="text-xs text-gray-400">
                admin@epitaph.ma / admin123
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-white text-black font-medium text-sm rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>Connexion</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">© 2026 Epitaphe</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
