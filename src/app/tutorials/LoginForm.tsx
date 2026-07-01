'use client';

import { useState } from 'react';
import { Mail, Lock, AlertCircle, BookOpen } from 'lucide-react';

interface LoginFormProps {
  isAdmin?: boolean;
}

export default function LoginForm({ isAdmin = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.role === 'admin') {
          window.location.href = '/tutorials/admin';
        } else {
          window.location.href = '/tutorials';
        }
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-10">
      <div className="text-center mb-8">
        <div className="bg-orange-50 text-accent p-3 rounded-2xl inline-flex mb-4">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-primary">
          {isAdmin ? 'Admin Portal Login' : 'Student Portal Login'}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {isAdmin
            ? 'Access teacher tools & post updates'
            : 'Access your homework and class notices'}
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-4 flex items-start space-x-3 mb-6">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-500/25 active:scale-98 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      {!isAdmin && (
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Students: Login with credentials provided by your teacher.
          </p>
          <div className="mt-3">
            <a
              href="/tutorials/admin"
              className="text-xs text-primary hover:text-accent font-bold underline transition-colors"
            >
              Are you an Admin? Login here
            </a>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="mt-6 text-center">
          <a
            href="/tutorials"
            className="text-xs text-slate-500 hover:text-primary font-semibold transition-colors"
          >
            ← Back to Student Login
          </a>
        </div>
      )}
    </div>
  );
}
