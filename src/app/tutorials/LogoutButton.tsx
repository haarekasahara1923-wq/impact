'use client';

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        window.location.href = '/tutorials';
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center space-x-2 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-sm"
    >
      <LogOut className="h-4 w-4" />
      <span>Log Out</span>
    </button>
  );
}
