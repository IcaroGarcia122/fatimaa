import { useState, useEffect } from 'react';
import { X, Search, Sparkles, Heart, Maximize2, Calendar, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/canvaData';
import type { PortfolioItem } from '../types';

interface FullPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PortfolioItem) => void;
  onOpenBooking: () => void;
}

export default function FullPortfolioModal({
  isOpen,
  onClose,
  onSelectPhoto,
  onOpenBooking,
}: FullPortfolioModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'gestante', label: 'Gestante' },
    { id: 'familia', label: 'Família' },
    { id: 'casal', label: 'Casais' },
    { id: 'retrato', label: 'Retratos' },
  ];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = PORTFOLIO_DATA.items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      item.category === selectedCategory ||
      item.categoryLabel.toLowerCase().includes(selectedCategory);
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-portfolio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-7xl h-[94vh] sm:h-auto sm:max-h-[92vh] bg-[#fcfbf9] rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
      >
        {/* Modal Header - Responsive Mobile Layout */}
        <div className="p-4 sm:p-6 md:p-7 border-b border-neutral-200 bg-white flex items-start justify-between gap-3 shrink-0">
          <div className="flex-1 min-w-0 pr-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#01590d] uppercase mb-0.5">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>GALERIA COMPLETA</span>
            </div>
            <h2 id="full-portfolio-title" className="text-xl sm:text-2xl md:text-3xl font-display font-light text-neutral-900 truncate">
              Portfólio Fátima Sampaio
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-0.5 hidden sm:block">
              Explore nossa curadoria de ensaios afetivos e retratos atemporais ({filteredItems.length} fotografias).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Fechar portfólio completo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar - Mobile Optimized */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[#f7f6f2] border-b border-neutral-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          {/* Categories: Horizontal scrollable on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#01590d] text-white shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-56 md:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar ensaio..."
              className="w-full pl-8 pr-7 py-1.5 rounded-full bg-white border border-neutral-200 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-[#01590d]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs w-4 h-4 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid - Responsive for mobile: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-7">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-neutral-500 text-sm font-light">
                Nenhuma fotografia encontrada para "{searchTerm}".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchTerm('');
                }}
                className="mt-3 text-xs text-[#01590d] font-semibold underline hover:no-underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onSelectPhoto(item);
                  }}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-[3/4] sm:aspect-[4/5]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Zoom indicator icon */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>

                  {/* Caption adjusted for mobile readability */}
                  <div className="relative z-10 p-2.5 sm:p-4">
                    <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-white/25 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase mb-1 border border-white/20">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-xs sm:text-sm font-display font-medium text-white leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-neutral-300 font-light mt-0.5 line-clamp-1 hidden sm:block">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Callout - Mobile Optimized */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#01590d]/10 text-[#01590d] flex items-center justify-center shrink-0 hidden sm:flex">
              <Heart className="w-3.5 h-3.5 text-[#01590d]" />
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-600 font-light">
              Gostou das fotos? Agende uma conversa acolhedora com a Fátima.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-sm shrink-0 cursor-pointer text-center"
          >
            QUERO AGENDAR
          </button>
        </div>
      </motion.div>
    </div>
  );
}
