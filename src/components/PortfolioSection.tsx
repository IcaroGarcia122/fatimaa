import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart, Images } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { PORTFOLIO_DATA } from '../data/canvaData';
import type { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  onSelectPhoto: (item: PortfolioItem) => void;
  onOpenBooking: () => void;
  onOpenFullPortfolio: () => void;
}

export default function PortfolioSection({
  onSelectPhoto,
  onOpenBooking,
  onOpenFullPortfolio,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Ensaios' },
    { id: 'gestante', label: 'Gestante & Maternidade' },
    { id: 'familia', label: 'Família & Vínculos' },
    { id: 'casal', label: 'Casais' },
    { id: 'retratos', label: 'Retratos Autoriais' },
  ];

  const filteredItems =
    activeCategory === 'todos'
      ? PORTFOLIO_DATA.items
      : PORTFOLIO_DATA.items.filter((item) => {
          if (activeCategory === 'gestante') return item.categoryLabel.toLowerCase().includes('gestante');
          if (activeCategory === 'familia') return item.categoryLabel.toLowerCase().includes('família');
          if (activeCategory === 'casal') return item.categoryLabel.toLowerCase().includes('casal');
          if (activeCategory === 'retratos') return item.categoryLabel.toLowerCase().includes('retrato');
          return true;
        });

  // Duplicate items if needed for seamless loop
  const displayItems =
    filteredItems.length < 8
      ? [...filteredItems, ...filteredItems]
      : filteredItems;

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
              PORTFÓLIO & GALERIA
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-[#01590d] leading-none">
              {PORTFOLIO_DATA.sectionTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              {PORTFOLIO_DATA.sectionSubtitle}
            </p>
          </div>

          {/* Controls: Categories + Button + Navigation arrows for Swiper */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            {/* Scrollable Categories on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
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
                onClick={onOpenFullPortfolio}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 bg-[#01590d] hover:bg-[#027513] text-white flex items-center gap-1.5 sm:gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              >
                <Images className="w-3.5 h-3.5" />
                <span>Ver Portfólio Completo</span>
              </button>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  className="portfolio-prev w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  className="portfolio-next w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-width Carousel: fotos como sessão inteira uma do lado da outra passando como carrossel */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative px-4 sm:px-6 lg:px-8"
      >
        <Swiper
          modules={[Autoplay, Navigation, FreeMode]}
          slidesPerView={1.15}
          spaceBetween={16}
          centeredSlides={false}
          loop={true}
          speed={700}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: '.portfolio-prev',
            nextEl: '.portfolio-next',
          }}
          breakpoints={{
            540: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.4,
              spaceBetween: 24,
            },
            1400: {
              slidesPerView: 4.2,
              spaceBetween: 28,
            },
          }}
          className="w-full py-4 overflow-visible"
        >
          {displayItems.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="h-auto">
              <div
                onClick={() => onSelectPhoto(item)}
                className="group relative h-[460px] sm:h-[520px] md:h-[580px] lg:h-[620px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end"
              >
                {/* High Resolution Photography */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Ambient Vignette & Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Hover Maximize Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Minimalist Bottom Caption */}
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase mb-2 border border-white/20">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-medium text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-200 font-light mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
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
                Gostou do estilo acolhedor e atemporal?
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 font-light">
                Cada ensaio é personalizado de acordo com a essência e o ritmo de vocês.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenFullPortfolio}
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-200 cursor-pointer active:scale-95 text-center"
            >
              <Images className="w-3.5 h-3.5 text-neutral-600" />
              <span>Ver Portfólio Completo</span>
            </button>
            <button
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
