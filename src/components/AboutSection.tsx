import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_DATA } from '../data/canvaData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section id="sobre" className="pt-20 sm:pt-28 pb-0 bg-[#fcfbf9] relative -mt-[2px] z-0 overflow-x-clip">
      {/* Studio Lighting Setup: animated entrance on scroll */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 0.95, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 sm:-right-8 md:-right-12 lg:-right-14 -bottom-8 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 pointer-events-none z-0 select-none"
      >
        <img
          src="/images/softbox-right.png"
          alt="Equipamento de iluminação softbox de estúdio"
          className="w-64 sm:w-80 md:w-96 lg:w-[440px] xl:w-[480px] h-auto object-contain drop-shadow-xl select-none pointer-events-none opacity-95"
        />
      </motion.div>

      {/* Watermark moved to the top-left corner of this section */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-10 select-none pointer-events-none opacity-[0.035] font-script text-[180px] sm:text-[240px] md:text-[280px] text-neutral-900 leading-none">
        Fatima
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left Column: Authentic Story & Bio from Slide 3 with scroll animation */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center pb-12 sm:pb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-300/40 text-[#01590d] text-xs font-semibold tracking-wider uppercase mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A FOTÓGRAFA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-neutral-900 leading-tight">
              {ABOUT_DATA.title}
            </h2>

            {/* The famous quote from Slide 3 */}
            <p className="font-display italic text-2xl sm:text-3xl text-[#01590d] mt-4 mb-8 font-normal">
              "{ABOUT_DATA.quote}"
            </p>

            {/* Verbatim Paragraphs from Canva */}
            <div className="space-y-4 text-base text-neutral-700 font-light leading-relaxed">
              {ABOUT_DATA.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-neutral-200">
              {ABOUT_DATA.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-3xl sm:text-4xl font-normal text-[#01590d]">
                    {stat.number}
                  </span>
                  <span className="text-xs text-neutral-600 mt-1 font-light leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Fatima Sampaio Signature & CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <span className="font-script text-4xl text-[#01590d] block">
                  Fatima Sampaio
                </span>
                <span className="text-[10px] tracking-[0.2em] font-semibold text-neutral-500 uppercase">
                  FOTÓGRAFA & FUNDADORA
                </span>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#01590d] hover:bg-[#01450a] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm"
              >
                CONVERSAR COM A FÁTIMA
              </button>
            </div>
          </motion.div>

          {/* Right Column: Fátima "Saindo da Moldura" with scroll animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-center justify-end"
          >
            {/* Visual Stage with larger dimensions */}
            <div className="relative w-full max-w-[480px] sm:max-w-[540px] md:max-w-[580px] lg:max-w-[620px] flex items-end justify-center select-none">
              
              {/* The Moldura (Background Frame) */}
              <div
                className="relative w-[88%] sm:w-[380px] md:w-[420px] lg:w-[460px] h-[490px] sm:h-[550px] md:h-[600px] lg:h-[640px] mb-2 sm:mb-4 rounded-[48px] sm:rounded-[56px] border border-[#dfd4c5] bg-gradient-to-b from-[#f7f3ec] via-[#ede6dc] to-[#e4dcce] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col justify-end p-6"
              >
                {/* Internal ambient illumination highlights */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Fátima Cutout ("Saindo da Moldura") */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pointer-events-none">
                <img
                  src={ABOUT_DATA.cutoutImage}
                  alt="Fátima Sampaio saindo da moldura"
                  className="w-[120%] sm:w-[130%] md:w-[138%] lg:w-[145%] max-w-[580px] sm:max-w-[640px] lg:max-w-[700px] h-auto object-contain object-bottom drop-shadow-[0_22px_38px_rgba(0,0,0,0.25)] translate-x-3 sm:translate-x-5 block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

