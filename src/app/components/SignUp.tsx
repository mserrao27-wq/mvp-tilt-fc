"use client";

import { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, Check } from 'lucide-react';

interface SignUpProps {
  onSignUpComplete: (userData: { name: string; email: string; username: string }) => void;
}

export default function SignUp({ onSignUpComplete }: SignUpProps) {
  const [step, setStep] = useState<'signup' | 'login'>('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9._]{3,20}$/.test(username);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (step === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome completo é obrigatório';
      }
      if (!validateEmail(formData.email)) {
        newErrors.email = 'E-mail inválido';
      }
      if (!validateUsername(formData.username)) {
        newErrors.username = 'Nome de usuário inválido (3-20 caracteres, apenas letras, números, . e _)';
      }
      if (formData.password.length < 6) {
        newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      }

      if (Object.keys(newErrors).length === 0) {
        // Cadastro completo, avança para escolha de time
        onSignUpComplete({
          name: formData.name,
          email: formData.email,
          username: formData.username
        });
      }
    } else {
      // Login
      if (!formData.username.trim()) {
        newErrors.username = 'Nome de usuário ou e-mail é obrigatório';
      }
      if (!formData.password) {
        newErrors.password = 'Senha é obrigatória';
      }

      if (Object.keys(newErrors).length === 0) {
        // Simula login bem-sucedido
        onSignUpComplete({
          name: formData.username,
          email: formData.username + '@tiltfc.com',
          username: formData.username
        });
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Tilt FC
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A rede social dos torcedores ⚽
          </p>
        </div>

        {/* Card de Cadastro/Login */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            {step === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {step === 'signup' ? 'Nome de Usuário' : 'Nome de usuário ou e-mail'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={step === 'signup' ? 'seu_usuario' : 'Usuário ou e-mail'}
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {step === 'signup' ? (
                <>
                  <Check className="w-5 h-5" />
                  Cadastrar
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                OU
              </span>
            </div>
          </div>

          {/* Toggle Login/Cadastro */}
          <div className="text-center">
            {step === 'signup' ? (
              <p className="text-gray-600 dark:text-gray-400">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                >
                  Entrar
                </button>
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setStep('signup')}
                  className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Ao se cadastrar, você concorda com nossos</p>
          <p>
            <a href="#" className="hover:underline">Termos de Uso</a> e{' '}
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}
