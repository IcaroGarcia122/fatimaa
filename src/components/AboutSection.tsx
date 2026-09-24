import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_DATA } from '../data/canvaData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section id="sobre" className="pt-20 sm:pt-28 pb-0 bg-[#f0e8dc] relative -mt-[2px] z-0 overflow-x-clip border-t border-[#e2d7c7]">
      {/* Studio Lighting Setup: balanced softbox */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.9, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 sm:right-2 md:right-4 -bottom-4 sm:-bottom-6 md:-bottom-8 pointer-events-none z-0 select-none"
      >
        <img
          src="/images/softbox-right.png"
          alt="Equipamento de iluminação softbox de estúdio"
          className="w-44 sm:w-56 md:w-68 lg:w-80 xl:w-92 h-auto object-contain drop-shadow-lg select-none pointer-events-none opacity-85"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left Column: Authentic Story & Bio from Slide 3 with scroll animation */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center pb-6 sm:pb-10 lg:pb-20 relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-[#01590d] text-xs font-semibold tracking-wider uppercase mb-6 w-fit">
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
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#dfd5c5]">
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
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-20">
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
                className="px-6 py-3 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
              >
                CONVERSAR COM A FÁTIMA
              </button>
            </div>
          </motion.div>

          {/* Right Column: Fátima e Moldura com espaçamento seguro no mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-center justify-end mt-16 sm:mt-24 lg:mt-0 pt-10 sm:pt-14 lg:pt-0 relative z-10"
          >
            {/* Visual Stage */}
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] md:max-w-[540px] flex items-end justify-center select-none pt-12 sm:pt-16 lg:pt-8">
              
              {/* The Moldura (Background Frame / Card) */}
              <div
                className="relative w-[88%] sm:w-[350px] md:w-[390px] lg:w-[420px] h-[480px] sm:h-[530px] md:h-[570px] mb-2 sm:mb-3 rounded-[44px] sm:rounded-[52px] border border-[#d6c7b3] bg-gradient-to-b from-[#ffffff] via-[#f7f2ea] to-[#e8dccd] shadow-[0_22px_55px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col justify-end p-6"
              >
                {/* Internal ambient illumination highlights */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/60 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-black/5 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Fátima Cutout (Aumentada em harmonia com o card) */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pointer-events-none">
                <img
                  src={ABOUT_DATA.cutoutImage}
                  alt="Fátima Sampaio"
                  className="w-[104%] sm:w-[106%] md:w-[108%] max-w-[420px] sm:max-w-[460px] md:max-w-[490px] h-auto object-contain object-bottom drop-shadow-[0_18px_34px_rgba(0,0,0,0.24)] translate-x-1 sm:translate-x-2 block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

