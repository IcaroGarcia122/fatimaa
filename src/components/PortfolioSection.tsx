import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart, Images, Layers, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import { PORTFOLIO_DATA } from '../data/canvaData';
import type { Ensaio, PortfolioItem } from '../types';

interface PortfolioSectionProps {
  ensaios: Ensaio[];
  onSelectEnsaio: (ensaio: Ensaio) => void;
  onSelectPhoto: (item: PortfolioItem) => void;
  onOpenBooking: () => void;
  onOpenFullPortfolio: () => void;
}

export default function PortfolioSection({
  ensaios,
  onSelectEnsaio,
  onOpenBooking,
  onOpenFullPortfolio,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Ensaios' },
    { id: 'gestante', label: 'Gestante & Maternidade' },
    { id: 'familia', label: 'Família & Vínculos' },
    { id: 'casal', label: 'Casais' },
    { id: 'retratos', label: 'Retratos Autorais' },
  ];

  const filteredEnsaios =
    activeCategory === 'todos'
      ? ensaios
      : ensaios.filter((ensaio) => {
          if (activeCategory === 'gestante') {
            return (
              ensaio.category === 'gestante' ||
              ensaio.categoryLabel.toLowerCase().includes('gestante')
            );
          }
          if (activeCategory === 'familia') {
            return (
              ensaio.category === 'familia' ||
              ensaio.categoryLabel.toLowerCase().includes('família')
            );
          }
          if (activeCategory === 'casal') {
            return (
              ensaio.category === 'casal' ||
              ensaio.categoryLabel.toLowerCase().includes('casal')
            );
          }
          if (activeCategory === 'retratos') {
            return (
              ensaio.category === 'retratos' ||
              ensaio.categoryLabel.toLowerCase().includes('retrato')
            );
          }
          return true;
        });

  // Duplicate ensaios if needed for seamless loop
  const displayEnsaios =
    filteredEnsaios.length < 5 && filteredEnsaios.length > 0
      ? [...filteredEnsaios, ...filteredEnsaios]
      : filteredEnsaios;

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    if (swiperInstance) {
      try {
        swiperInstance.slideTo(0);
      } catch (err) {
        // ignore
      }
    }
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#fcfbf9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block mb-3">
              PORTFÓLIO DE ENSAIOS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-[#01590d] leading-none">
              {PORTFOLIO_DATA.sectionTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              Explore cada ensaio como uma história completa com múltiplos registros, alma e sensibilidade.
            </p>
          </div>

          {/* Controls: Filter Tabs + Full Portfolio Button + Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto flex-wrap">
            {/* Scrollable Categories on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#01590d] text-white shadow-xs'
                      : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 justify-between sm:justify-start">
              {/* Button to open full portfolio */}
              <button
                type="button"
                onClick={onOpenFullPortfolio}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 bg-[#01590d] hover:bg-[#027513] text-white flex items-center gap-1.5 sm:gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              >
                <Images className="w-3.5 h-3.5" />
                <span>Ver Portfólio Completo</span>
              </button>

              {/* Navigation Arrows with Direct Swiper Instance Handlers */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => swiperInstance?.slidePrev()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Ensaio anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => swiperInstance?.slideNext()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Próximo ensaio"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Swiper Carousel of Complete Ensaios */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative px-4 sm:px-6 lg:px-8"
      >
        <Swiper
          key={activeCategory}
          onSwiper={setSwiperInstance}
          modules={[Autoplay, FreeMode]}
          slidesPerView={1.15}
          spaceBetween={16}
          centeredSlides={false}
          loop={displayEnsaios.length > 2}
          speed={700}
          preventClicks={false}
          preventClicksPropagation={false}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            540: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.1,
              spaceBetween: 24,
            },
            1400: {
              slidesPerView: 3.8,
              spaceBetween: 28,
            },
          }}
          className="w-full py-4 overflow-visible"
        >
          {displayEnsaios.map((ensaio, index) => (
            <SwiperSlide key={`${ensaio.id}-${index}`} className="h-auto">
              <div
                onClick={() => onSelectEnsaio(ensaio)}
                className="group relative h-[480px] sm:h-[530px] md:h-[590px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end"
              >
                {/* Cover Image */}
                <img
                  src={ensaio.coverImage || ensaio.photos[0]}
                  alt={ensaio.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Vignette & Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge: Photo count + Category */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                    <Layers className="w-3 h-3 text-emerald-400" />
                    <span>{ensaio.photos.length} Fotos</span>
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content: Session Info + Thumbnails Preview + Direct Button */}
                <div className="relative z-10 p-5 sm:p-6">
                  {/* Category label */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-300 text-[10px] font-semibold tracking-wider uppercase mb-2 border border-white/15">
                    {ensaio.categoryLabel}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-white leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                    {ensaio.title}
                  </h3>

                  {/* Subtitle / Description */}
                  {ensaio.subtitle && (
                    <p className="text-xs text-neutral-300 font-light line-clamp-1 mb-3">
                      {ensaio.subtitle}
                    </p>
                  )}

                  {/* Mini thumbnails preview strip of photos in this session */}
                  <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {ensaio.photos.slice(0, 3).map((thumb, tIdx) => (
                        <div
                          key={tIdx}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-white/40 overflow-hidden shrink-0 shadow-xs"
                        >
                          <img src={thumb} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {ensaio.photos.length > 3 && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-[10px] text-white font-medium border border-white/30">
                          +{ensaio.photos.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Explicit Button: Ver Ensaio */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEnsaio(ensaio);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-[#01590d] text-white text-[11px] font-semibold tracking-wider uppercase transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Ver Ensaio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Bottom CTA prompt in Portfolio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 w-full">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#01590d]/10 text-[#01590d] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#01590d]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                Gostou do estilo acolhedor e atemporal dos ensaios?
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 font-light">
                Cada ensaio é único e personalizado de acordo com a história e o ritmo da sua família.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenFullPortfolio}
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-200 cursor-pointer active:scale-95 text-center"
            >
              <Images className="w-3.5 h-3.5 text-neutral-600" />
              <span>Ver Portfólio Completo</span>
            </button>
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer active:scale-95 text-center"
            >
              AGENDAR MEU ENSAIO
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
