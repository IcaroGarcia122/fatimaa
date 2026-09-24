import { useState, useEffect } from 'react';
import { X, Search, Sparkles, Heart, Maximize2, Calendar, Layers, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { Ensaio, PortfolioItem } from '../types';

interface FullPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  ensaios: Ensaio[];
  onSelectEnsaio: (ensaio: Ensaio) => void;
  onSelectPhoto: (photo: PortfolioItem) => void;
  onOpenBooking: () => void;
}

export default function FullPortfolioModal({
  isOpen,
  onClose,
  ensaios,
  onSelectEnsaio,
  onSelectPhoto,
  onOpenBooking,
}: FullPortfolioModalProps) {
  const [viewMode, setViewMode] = useState<'ensaios' | 'fotos'>('ensaios');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'gestante', label: 'Gestante' },
    { id: 'familia', label: 'Família' },
    { id: 'casal', label: 'Casais' },
    { id: 'retratos', label: 'Retratos' },
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

  // Filter Ensaios
  const filteredEnsaios = ensaios.filter((ensaio) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      ensaio.category === selectedCategory ||
      ensaio.categoryLabel.toLowerCase().includes(selectedCategory);
    const matchesSearch =
      searchTerm.trim() === '' ||
      ensaio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ensaio.subtitle && ensaio.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ensaio.description && ensaio.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ensaio.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract all individual photos across all ensaios for "fotos" view
  const allPhotos: PortfolioItem[] = [];
  ensaios.forEach((ensaio) => {
    ensaio.photos.forEach((photoUrl, pIdx) => {
      allPhotos.push({
        id: `${ensaio.id}-photo-${pIdx}`,
        title: ensaio.title,
        subtitle: ensaio.subtitle,
        category: ensaio.category,
        categoryLabel: ensaio.categoryLabel,
        image: photoUrl,
        ensaioId: ensaio.id,
      });
    });
  });

  const filteredPhotos = allPhotos.filter((item) => {
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
        {/* Modal Header */}
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
              {viewMode === 'ensaios'
                ? `Explore as histórias completas organizadas por ensaio (${filteredEnsaios.length} sessões).`
                : `Exibindo todas as fotografias autorais (${filteredPhotos.length} fotos).`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle: Ensaios vs Fotos */}
            <div className="hidden md:flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('ensaios')}
                className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
                  viewMode === 'ensaios'
                    ? 'bg-[#01590d] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Por Ensaios</span>
              </button>
              <button
                onClick={() => setViewMode('fotos')}
                className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
                  viewMode === 'fotos'
                    ? 'bg-[#01590d] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Todas as Fotos</span>
              </button>
            </div>

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

        {/* Filter and Search Bar */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[#f7f6f2] border-b border-neutral-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          {/* Categories: Horizontal scrollable */}
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
              placeholder="Buscar ensaio ou tema..."
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

        {/* Mobile View Toggle */}
        <div className="flex md:hidden items-center justify-center bg-[#f0ede6] px-3 py-2 border-b border-neutral-200 gap-2">
          <button
            onClick={() => setViewMode('ensaios')}
            className={`flex-1 py-1 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1 ${
              viewMode === 'ensaios'
                ? 'bg-[#01590d] text-white shadow-xs'
                : 'text-neutral-600 bg-white/60'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Por Ensaios ({filteredEnsaios.length})</span>
          </button>
          <button
            onClick={() => setViewMode('fotos')}
            className={`flex-1 py-1 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1 ${
              viewMode === 'fotos'
                ? 'bg-[#01590d] text-white shadow-xs'
                : 'text-neutral-600 bg-white/60'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Fotos ({filteredPhotos.length})</span>
          </button>
        </div>

        {/* Gallery Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-7">
          {viewMode === 'ensaios' ? (
            /* ENSAIOS VIEW: Cards with multiple photo previews */
            filteredEnsaios.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-neutral-500 text-sm font-light">
                  Nenhum ensaio encontrado para "{searchTerm}".
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredEnsaios.map((ensaio) => (
                  <div
                    key={ensaio.id}
                    onClick={() => {
                      onClose();
                      onSelectEnsaio(ensaio);
                    }}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Cover Image & Count - Portrait 3:4 aspect-ratio and object-top to always frame faces */}
                    <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                      <img
                        src={ensaio.coverImage || ensaio.photos[0]}
                        alt={ensaio.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Photo count tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1.5 border border-white/20">
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span>{ensaio.photos.length} Fotos</span>
                      </div>

                      {/* Category tag */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[#01590d] text-[10px] font-semibold uppercase tracking-wider">
                        {ensaio.categoryLabel}
                      </div>

                      {/* Bottom mini thumbnail preview inside the cover */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-lg">
                        {ensaio.photos.slice(0, 4).map((p, idx) => (
                          <div
                            key={idx}
                            className="w-7 h-7 rounded border border-white/40 overflow-hidden shrink-0"
                          >
                            <img src={p} alt="" className="w-full h-full object-cover object-top" />
                          </div>
                        ))}
                        {ensaio.photos.length > 4 && (
                          <span className="text-[10px] text-white font-semibold px-1">
                            +{ensaio.photos.length - 4} fotos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ensaio Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-display font-medium text-neutral-900 leading-snug group-hover:text-[#01590d] transition-colors">
                          {ensaio.title}
                        </h3>
                        {ensaio.subtitle && (
                          <p className="text-xs text-neutral-500 font-light mt-1 line-clamp-1">
                            {ensaio.subtitle}
                          </p>
                        )}
                        {ensaio.description && (
                          <p className="text-xs text-neutral-600 font-light mt-2 line-clamp-2 leading-relaxed">
                            {ensaio.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#01590d] tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Explorar Ensaio →
                        </span>
                        <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-[#01590d] group-hover:text-white flex items-center justify-center text-neutral-600 transition-colors">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* ALL PHOTOS VIEW: Grid of individual photographs */
            filteredPhotos.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-neutral-500 text-sm font-light">
                  Nenhuma fotografia encontrada para "{searchTerm}".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                {filteredPhotos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectPhoto(item);
                    }}
                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-[3/4]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle gradient only at bottom so faces at top/center are crystal clear and bright */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md">
                        <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    </div>

                    <div className="relative z-10 p-2.5 sm:p-4">
                      <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded bg-white/25 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase mb-1 border border-white/20">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-xs sm:text-sm font-display font-medium text-white leading-tight line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Modal Footer Callout */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#01590d]/10 text-[#01590d] flex items-center justify-center shrink-0 hidden sm:flex">
              <Heart className="w-3.5 h-3.5 text-[#01590d]" />
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-600 font-light">
              Gostou dos ensaios? Agende uma conversa acolhedora com a Fátima e reserve sua data.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-sm shrink-0 cursor-pointer text-center"
          >
            QUERO AGENDAR MEU ENSAIO
          </button>
        </div>
      </motion.div>
    </div>
  );
}
