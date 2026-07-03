import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, BookOpen } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Admission', href: '/admission' },
    { name: 'Media Gallery', href: '/media' },
    { name: 'Homework Panel', href: '/tutorials' },
  ];

  return (
    <footer className="bg-primary text-slate-100 pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center group mb-6">
              <Image 
                src="/logo.jpg" 
                alt="Impact Institute Logo" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200" 
              />
            </Link>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Empowering students to achieve academic excellence and build bright futures. Based in Gwalior, MP, India, we offer dedicated guidance for Class 3–12 students.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-primary-dark/80 hover:bg-accent hover:text-white p-2.5 rounded-full transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href="#"
                className="bg-primary-dark/80 hover:bg-accent hover:text-white p-2.5 rounded-full transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="bg-primary-dark/80 hover:bg-accent hover:text-white p-2.5 rounded-full transition-all duration-200"
                aria-label="Youtube"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-accent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-accent hover:translate-x-1 transition-all duration-200 inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-accent">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Gayatri Vihar Colony, Pinto Park, Morar, Gwalior, MP, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:9425150096" className="hover:text-accent transition-colors">
                    9425150096
                  </a>
                  <a href="tel:7580945314" className="hover:text-accent transition-colors">
                    7580945314
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a
                  href="mailto:manvendrasingh7283@gmail.com"
                  className="hover:text-accent transition-colors break-all"
                >
                  manvendrasingh7283@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Impact Institute. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed for Excellence | Located in Gwalior, MP
          </p>
        </div>
      </div>
    </footer>
  );
}
