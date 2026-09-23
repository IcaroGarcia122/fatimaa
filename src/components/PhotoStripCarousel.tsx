import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/canvaData';
import type { PortfolioItem } from '../types';

interface PhotoStripCarouselProps {
  onSelectPhoto?: (photo: PortfolioItem) => void;
}

export default function PhotoStripCarousel({ onSelectPhoto }: PhotoStripCarouselProps) {
  // Use all 11 photos from portfolio data
  const photos = PORTFOLIO_DATA.items;

  // Duplicate list twice for seamless continuous infinite marquee
  const loopedPhotos = [...photos, ...photos];

  return (
    <div className="w-full py-6 sm:py-10 bg-[#fcfbf9] overflow-hidden border-y border-neutral-200/60 relative select-none">
      {/* Infinite Scrolling Track */}
      <div className="flex w-fit group">
        <motion.div
          className="flex shrink-0 gap-4 sm:gap-6 items-center pr-4 sm:pr-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {loopedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              onClick={() => onSelectPhoto && onSelectPhoto(photo)}
              className="relative shrink-0 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group/item bg-neutral-100"
            >
              <img
                src={photo.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover/item:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
