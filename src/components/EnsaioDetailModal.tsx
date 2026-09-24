import { useEffect } from 'react';
import { X, Calendar, Sparkles, Maximize2, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import type { Ensaio } from '../types';
import { BRAND } from '../data/canvaData';

interface EnsaioDetailModalProps {
  ensaio: Ensaio | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photoUrl: string, index: number) => void;
  onOpenBooking: () => void;
}

export default function EnsaioDetailModal({
  ensaio,
  isOpen,
  onClose,
  onSelectPhoto,
  onOpenBooking,
}: EnsaioDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  if (!isOpen || !ensaio) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá Fátima! Vi o ensaio "${ensaio.title}" no seu site e gostaria de saber sobre valores e datas disponíveis!`
    );
    window.open(`https://wa.me/${BRAND.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ensaio-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-[94vh] sm:h-auto sm:max-h-[92vh] bg-[#fcfbf9] rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden text-neutral-900"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 bg-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#01590d] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ensaio.categoryLabel}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-normal">
                {ensaio.photos.length} fotografias
              </span>
            </div>
            <h2
              id="ensaio-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-display font-light text-neutral-900 truncate"
            >
              {ensaio.title}
            </h2>
            {ensaio.subtitle && (
              <p className="text-xs sm:text-sm text-neutral-600 font-light mt-0.5 truncate">
                {ensaio.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Ensaio</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label="Fechar ensaio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Description + Photo Gallery */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* Story / Description Callout */}
          {ensaio.description && (
            <div className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-4 sm:p-6 max-w-3xl">
              <span className="text-[11px] font-semibold text-[#01590d] uppercase tracking-wider block mb-1">
                A HISTÓRIA DESTE ENSAIO
              </span>
              <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed italic font-serif">
                "{ensaio.description}"
              </p>
              {ensaio.clientName && (
                <p className="text-xs text-neutral-500 mt-2 font-medium">
                  — {ensaio.clientName}
                </p>
              )}
            </div>
          )}

          {/* Grid of All Photos in this Ensaio */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-700">
                Galeria Completa da Sessão ({ensaio.photos.length} fotos)
              </h3>
              <span className="text-xs text-neutral-500 font-light hidden sm:inline">
                Toque em qualquer foto para ampliar em tela cheia
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {ensaio.photos.map((photoUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => onSelectPhoto(photoUrl, index)}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-200/70"
                >
                  <img
                    src={photoUrl}
                    alt={`${ensaio.title} - Foto ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="text-xs text-white/90 font-medium">
                      Foto {index + 1} de {ensaio.photos.length}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-600 font-light text-center sm:text-left">
            Gostou desta atmosfera? Reserve sua data com a Fátima e viva essa experiência.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full border border-emerald-600 text-[#01590d] hover:bg-emerald-50 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Tirar Dúvidas via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Este Ensaio</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
