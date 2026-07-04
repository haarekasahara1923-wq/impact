'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, BookOpen, Image, ClipboardList } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Homework', href: '/tutorials', icon: BookOpen },
  { name: 'Media', href: '/media', icon: Image },
  { name: 'Admission', href: '/admission', icon: ClipboardList },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname.startsWith('/tutorials/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Frosted glass background */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl shadow-slate-900/20">
        {/* Safe area padding for iOS home indicator */}
        <div className="flex items-stretch justify-around px-1 pt-2 pb-safe" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-1 min-w-0 group"
              >
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
                      : 'group-active:bg-slate-100 group-active:scale-95'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-semibold tracking-wide transition-colors duration-200 truncate max-w-full px-0.5 ${
                    isActive ? 'text-primary' : 'text-slate-400'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
