import { Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data/canvaData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section
      id="topo"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background Hero Image: High-res photograph with ambient lighting overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-bg.png"
          alt="Fatima Sampaio - Espaço Fotográfico"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
        />

        {/* Ambient gradient overlays for contrast, richness, and pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-neutral-950/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/25 via-transparent to-neutral-950/80" />
      </div>

      {/* Hero Content Container with smooth entrance animations */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 sm:pt-32 sm:pb-40 text-center flex flex-col items-center">
        {/* Subtle Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-neutral-200 text-xs tracking-widest uppercase mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{HERO_DATA.badge}</span>
        </motion.div>

        {/* The Famous Headline: "Histórias, que merecem ser Lembradas!" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light text-white tracking-tight leading-[1.25] sm:leading-[1.2] max-w-4xl mx-auto mb-8"
        >
          Histórias, que merecem ser{' '}
          <span className="font-editorial italic font-normal text-emerald-400 block sm:inline tracking-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl sm:ml-1">
            Lembradas!
          </span>
        </motion.h1>

        {/* Subtitle verbatim from Canva */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          {HERO_DATA.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenBooking}
            id="hero-cta-agendar"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-4 h-4" />
            <span>{HERO_DATA.ctaPrimary}</span>
          </button>

          <a
            href="#portfolio"
            id="hero-cta-portfolio"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/25 text-xs font-semibold tracking-widest uppercase transition-all duration-200 backdrop-blur-xs"
          >
            <span>{HERO_DATA.ctaSecondary}</span>
          </a>
        </motion.div>
      </div>

      {/* Subtle Disguised Golden Light Glow behind the wave transition */}
      <div
        className="absolute -bottom-6 sm:-bottom-10 inset-x-0 h-20 sm:h-28 bg-gradient-to-r from-transparent via-[#e6b84a]/25 sm:via-[#e6b84a]/30 to-transparent blur-2xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Non-straight Organic Section Transition with Dual Layer Wave and Golden Rim Light */}
      <div className="absolute -bottom-1 inset-x-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-12 sm:h-16 md:h-20 lg:h-24 translate-y-[2px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldenRimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
            </linearGradient>
            <filter id="goldenBlur" x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
            </filter>
          </defs>

          <path
            d="M0,28 C320,105 720,12 1080,68 C1240,94 1360,78 1440,54"
            stroke="url(#goldenRimGlow)"
            strokeWidth="8"
            filter="url(#goldenBlur)"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M0,28 C320,105 720,12 1080,68 C1240,94 1360,78 1440,54"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />

          <path
            d="M0,28 C320,105 720,12 1080,68 C1240,94 1360,78 1440,54 L1440,140 L0,140 Z"
            fill="#e5ded3"
            fillOpacity="0.85"
          />
          <path
            d="M0,52 C380,128 820,32 1180,80 C1320,98 1400,88 1440,74 L1440,140 L0,140 Z"
            fill="#fcfbf9"
          />
        </svg>
      </div>
    </section>
  );
}
