import { useState, useEffect } from 'react';
import { Menu, X, Calendar, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND } from '../data/canvaData';
import type { AppViewMode } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  viewMode: AppViewMode;
  onToggleViewMode: (mode: AppViewMode) => void;
}

export default function Navbar({
  onOpenBooking,
  viewMode,
  onToggleViewMode,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'EXPERIÊNCIA', href: '#experiencia' },
    { label: 'PORTFÓLIO', href: '#portfolio' },
    { label: 'SOBRE', href: '#sobre' },
    { label: 'O ESPAÇO', href: '#espaco' },
  ];

  return (
    <>
      {/* Floating Transparent Rounded Navbar */}
      <header
        id="main-navbar"
        className="fixed top-3 sm:top-5 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 transition-all duration-300"
      >
        <div
          className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled
              ? 'bg-white/45 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/10'
              : 'bg-white border border-neutral-200/80 shadow-md shadow-black/5'
          }`}
        >
          {/* Logo brand */}
          <a
            href="#topo"
            className="group flex flex-col focus:outline-hidden"
            aria-label="Fatima Sampaio - Página inicial"
          >
            <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#01590d] leading-none tracking-normal group-hover:opacity-90 transition-opacity drop-shadow-xs">
              Fatima Sampaio
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold text-neutral-800 uppercase mt-0.5">
              {BRAND.tagline}
            </span>
          </a>

          {/* Desktop navigation links */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-neutral-800"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#01590d] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#01590d] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              id="btn-nav-agendar"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#01590d]/90 hover:bg-[#01590d] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>AGENDAR ENSAIO</span>
            </button>

            {/* Mobile menu button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-800 hover:text-[#01590d] hover:bg-white/40 rounded-full transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown with transparent frosted rounded container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto lg:hidden max-w-7xl mx-auto mt-2 rounded-3xl p-5 space-y-4 shadow-2xl transition-all duration-300 ${
                scrolled
                  ? 'bg-white/75 backdrop-blur-2xl border border-white/60'
                  : 'bg-white border border-neutral-200/90'
              }`}
            >
              <div className="flex flex-col space-y-2 text-sm font-semibold tracking-wider text-neutral-800">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl hover:bg-white/50 hover:text-[#01590d] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-200/60 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#01590d] text-white text-xs font-semibold tracking-wider uppercase shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>AGENDAR ENSAIO</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleViewMode(
                      viewMode === 'website' ? 'slides' : 'website'
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/50 text-neutral-800 hover:bg-white/80 text-xs font-medium transition-colors"
                >
                  <MonitorPlay className="w-4 h-4 text-cyan-600" />
                  <span>
                    {viewMode === 'website'
                      ? 'Ver Slides Originais do Canva'
                      : 'Voltar ao Site'}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
