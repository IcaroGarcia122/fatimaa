import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { PORTFOLIO_DATA } from '../data/canvaData';
import type { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  onSelectPhoto: (item: PortfolioItem) => void;
  onOpenBooking: () => void;
}

export default function PortfolioSection({
  onSelectPhoto,
  onOpenBooking,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Ensaios' },
    { id: 'casal', label: 'Casais & Conexão' },
    { id: 'detalhes', label: 'Retratos & Espontâneos' },
  ];

  const filteredItems =
    activeCategory === 'todos'
      ? PORTFOLIO_DATA.items
      : PORTFOLIO_DATA.items.filter((item) => item.category === activeCategory);

  // Ensure enough slides for seamless Coverflow loop
  const displayItems =
    filteredItems.length < 6
      ? [...filteredItems, ...filteredItems, ...filteredItems]
      : filteredItems;

  const customSwiperStyles = `
    .portfolio-coverflow-swiper {
      padding-top: 20px !important;
      padding-bottom: 60px !important;
      overflow: visible !important;
    }
    .portfolio-coverflow-swiper .swiper-pagination-bullet {
      background: #737373;
      opacity: 0.35;
      transition: all 0.3s ease;
      width: 8px;
      height: 8px;
    }
    .portfolio-coverflow-swiper .swiper-pagination-bullet-active {
      background: #01590d !important;
      opacity: 1;
      width: 24px !important;
      border-radius: 9999px !important;
    }
    .portfolio-coverflow-swiper .swiper-slide {
      transition: transform 0.4s ease, opacity 0.4s ease;
      border-radius: 1.5rem;
    }
    .portfolio-coverflow-swiper .swiper-slide-active {
      z-index: 10;
    }
  `;

  return (
    <section id="portfolio" className="py-24 bg-[#fcfbf9] relative overflow-hidden">
      <style>{customSwiperStyles}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
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

          {/* Controls: Categories + Navigation arrows for Swiper */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#01590d] text-white shadow-xs'
                      : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Custom Navigation Arrows */}
            <div className="flex items-center gap-2 ml-auto sm:ml-2">
              <button
                className="portfolio-prev w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="portfolio-next w-10 h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-[#01590d] hover:text-white hover:border-[#01590d] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coverflow Carousel Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <Swiper
            key={activeCategory}
            spaceBetween={32}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.3}
            breakpoints={{
              640: {
                slidesPerView: 1.8,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 2.43,
                spaceBetween: 40,
              },
            }}
            coverflowEffect={{
              rotate: 0,
              slideShadows: false,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: '.portfolio-next',
              prevEl: '.portfolio-prev',
            }}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            className="portfolio-coverflow-swiper"
          >
            {displayItems.map((item, index) => (
              <SwiperSlide
                key={`${item.id}-${index}`}
                className="!h-[380px] sm:!h-[440px] md:!h-[480px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-neutral-200/90 bg-white relative group select-none"
                onClick={() => onSelectPhoto(item)}
              >
                {/* Thin Frame Inner Padding */}
                <div className="p-2 sm:p-2.5 h-full w-full flex flex-col justify-between">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase border border-white/20">
                      {item.categoryLabel}
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Hover Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="text-xl font-display font-medium leading-tight text-white drop-shadow-sm">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs text-neutral-200 mt-1 font-light line-clamp-2 drop-shadow-xs">
                          {item.subtitle}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mt-3">
                        <span>Ampliar fotografia</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Subtitle bottom caption inside the frame */}
                  <div className="pt-2.5 px-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium text-neutral-800 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider shrink-0 pl-2">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom CTA prompt in Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 p-8 rounded-3xl bg-white border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#01590d]/10 text-[#01590d] flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-[#01590d]" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-neutral-900">
                Gostou do estilo acolhedor e atemporal?
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5 font-light">
                Cada ensaio é personalizado de acordo com a essência e o ritmo de vocês.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#01590d] hover:bg-[#01450a] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 shadow-sm cursor-pointer"
          >
            AGENDAR MEU ENSAIO
          </button>
        </motion.div>
      </div>
    </section>
  );
}
