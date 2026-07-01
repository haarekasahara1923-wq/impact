'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Admission', href: '/admission' },
    { name: 'Media', href: '/media' },
    { name: 'Homework Panel', href: '/tutorials' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 md:bg-transparent backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-primary flex items-center">
              Impact Institute
              <span className="text-accent ml-0.5 text-3xl font-black">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 relative py-1 hover:text-accent ${
                    isActive ? 'text-accent font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Register Now CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/admission"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden bg-white border-t border-slate-100`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-accent font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 px-3">
            <Link
              href="/admission"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-md transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
