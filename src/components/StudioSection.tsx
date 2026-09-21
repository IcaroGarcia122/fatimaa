import { SunMedium, Sparkles, Coffee, Camera, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_DATA, BRAND } from '../data/canvaData';

interface StudioSectionProps {
  onOpenBooking: () => void;
}

export default function StudioSection({ onOpenBooking }: StudioSectionProps) {
  const iconMap: Record<string, typeof SunMedium> = {
    SunMedium,
    Sparkles,
    Coffee,
    Camera,
  };

  return (
    <section id="espaco" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block mb-3">
            ESTÚDIO & AMBIENTE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-neutral-900 leading-none">
            {STUDIO_DATA.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            {STUDIO_DATA.subtitle}
          </p>
        </motion.div>

        {/* Studio Showcase: Large Visual Hero from Slide 4 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 mb-16 group border border-neutral-200"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative">
            <img
              src={STUDIO_DATA.mainImage}
              alt="Nosso Espaço Fotográfico - Ambiente e Iluminação"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Floating detail tag on image */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/40 max-w-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#01590d] tracking-wider uppercase mb-1">
              <MapPin className="w-4 h-4" />
              <span>{BRAND.address}</span>
            </div>
            <p className="text-sm font-medium text-neutral-800">
              Ambiente privativo preparado para acolher você e sua família com total privacidade e aconchego.
            </p>
          </div>
        </motion.div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {STUDIO_DATA.features.map((feat, idx) => {
            const Icon = iconMap[feat.iconName] || Camera;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[#fcfbf9] p-6 rounded-2xl border border-neutral-200/80 hover:border-[#01590d]/30 hover:bg-emerald-50/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#01590d]/10 text-[#01590d] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Card: Visita com Hora Marcada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#f7f8f6] p-8 sm:p-12 rounded-3xl border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs"
        >
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block">
              VISITA COM HORA MARCADA
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-neutral-900 leading-tight">
              Quer conhecer nosso espaço antes de fechar seu ensaio?
            </h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Recebemos você com um bom café para conversar sobre o que você deseja,
              olhar referências e planejar os looks com calma e sem pressa.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estacionamento privativo e fácil acesso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Horários flexíveis aos fins de semana sob agendamento</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#01590d] hover:bg-[#01450a] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              AGENDAR UMA VISITA
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
