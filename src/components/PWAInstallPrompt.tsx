'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Check if already dismissed
    const dismissed = sessionStorage.getItem('pwa-banner-dismissed');
    if (dismissed) return;

    // Listen for Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS banner after 3 seconds (no native prompt on iOS)
    if (ios && !standalone) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  };

  // Don't show if already installed or not triggered
  if (isStandalone || !showBanner) return null;

  return (
    <div className="fixed bottom-24 left-3 right-3 z-[60] md:hidden animate-slide-up">
      <div className="bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 p-4 flex items-center gap-3 border border-white/10">
        {/* App Icon */}
        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/10 flex items-center justify-center">
          <Image src="/logo.jpg" alt="Impact" width={48} height={48} className="object-cover" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-sm leading-tight">Install App</p>
          {isIOS ? (
            <p className="text-white/70 text-[11px] mt-0.5 leading-snug">
              Tap <span className="font-bold">Share</span> → <span className="font-bold">Add to Home Screen</span>
            </p>
          ) : (
            <p className="text-white/70 text-[11px] mt-0.5">
              Impact Institute — install on your phone
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="bg-accent hover:bg-accent-dark text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
