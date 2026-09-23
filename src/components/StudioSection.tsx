import { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_DATA, BRAND } from '../data/canvaData';

interface StudioSectionProps {
  onOpenBooking: () => void;
}

interface StudioMediaItem {
  id: string;
  src: string;
}

export default function StudioSection({ onOpenBooking }: StudioSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMediaModal, setActiveMediaModal] = useState<StudioMediaItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const studioImages: StudioMediaItem[] = [
    {
      id: 'set-principal',
      src: STUDIO_DATA.mainImage,
    },
    {
      id: 'sala-recepcao',
      src: STUDIO_DATA.spaceImage1,
    },
    {
      id: 'camarim-producao',
      src: STUDIO_DATA.spaceImage2,
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const tryPlay = () => {
      video.play().catch(() => {
        const unlock = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchstart', unlock);
          window.removeEventListener('scroll', unlock);
          window.removeEventListener('click', unlock);
        };
        window.addEventListener('touchstart', unlock, { once: true, passive: true });
        window.addEventListener('scroll', unlock, { once: true, passive: true });
        window.addEventListener('click', unlock, { once: true, passive: true });
      });
    };
    tryPlay();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section id="espaco" className="py-24 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block mb-3">
            ESTÚDIO & AMBIENTE PRIVATIVO
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-neutral-900 leading-none">
            {STUDIO_DATA.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            {STUDIO_DATA.subtitle}
          </p>
        </motion.div>

        {/* Master Showcase: Vídeo Tour + 3 Imagens Limpas (sem descrições de texto) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column (5 Cols): The Live Video Tour Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl border border-neutral-200 group flex flex-col justify-between min-h-[480px] sm:min-h-[560px] lg:min-h-full"
          >
            {/* The Video */}
            <video
              ref={videoRef}
              src={STUDIO_DATA.videoTour}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              poster="/images/hero-video-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Top Bar inside Video: Tour Badge + Expand Button */}
            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>TOUR VIRTUAL</span>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                title="Assistir em tela cheia"
                aria-label="Expandir vídeo em tela cheia"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Controls inside Video Card */}
            <div className="relative z-10 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={togglePlay}
                    className="w-11 h-11 rounded-full bg-[#01590d] hover:bg-[#027513] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all duration-200 active:scale-95 cursor-pointer"
                    aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>

                <span className="text-[11px] font-medium text-white/80 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
                  {isMuted ? 'Ativar som' : 'Áudio ativado'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): The 3 Studio Ambientes Gallery (Apenas Imagens Limpas) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top Large Feature Photo: Set Principal de Ensaios */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveMediaModal(studioImages[0])}
              className="relative rounded-3xl overflow-hidden shadow-xl bg-neutral-900 border border-neutral-200 group cursor-pointer aspect-[16/9] sm:aspect-[21/10]"
            >
              <img
                src={studioImages[0].src}
                alt="Nosso Espaço - Estúdio Fotográfico"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
              />

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Bottom 2 Photos: Sala de Recepção & Camarim (Apenas Imagens Limpas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {studioImages.slice(1).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveMediaModal(item)}
                  className="relative rounded-3xl overflow-hidden shadow-lg bg-neutral-900 border border-neutral-200 group cursor-pointer aspect-[4/3]"
                >
                  <img
                    src={item.src}
                    alt="Ambiente do Estúdio"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Invitation Card: Visita com Hora Marcada & Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-[#f8f9f7] via-[#f4f6f2] to-[#eff3ec] p-8 sm:p-12 rounded-3xl border border-emerald-900/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xs"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estacionamento privativo e fácil acesso no Centro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Horários flexíveis sob agendamento prévio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ambiente climatizado e seguro para crianças</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>R. Maj. Gote, 696 - Centro, Patos de Minas</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto lg:w-full px-8 py-4 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              AGENDAR UMA VISITA
            </button>

            <a
              href="https://maps.google.com/?q=Fatima+Sampaio+Patos+de+Minas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto lg:w-full px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-medium tracking-wider uppercase border border-neutral-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs text-center"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span>COMO CHEGAR</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Studio Photos */}
      <AnimatePresence>
        {activeMediaModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveMediaModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setActiveMediaModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer"
                aria-label="Fechar visualização"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={activeMediaModal.src}
                  alt="Espaço Fotográfico"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 bg-neutral-900 text-white flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-300 font-light">
                  Espaço Fotográfico Fátima Sampaio
                </span>

                <button
                  onClick={() => {
                    setActiveMediaModal(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm shrink-0 cursor-pointer"
                >
                  Agendar Visita
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Fullscreen Video Tour */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer"
                aria-label="Fechar vídeo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[9/16] sm:aspect-[16/9] w-full max-h-[80vh] bg-black flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={STUDIO_DATA.videoTour}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-medium">
                    Tour Virtual pelo Espaço Fotográfico
                  </h3>
                  <p className="text-xs text-neutral-400 font-light">
                    R. Maj. Gote, 696 - Centro, Patos de Minas - MG
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer"
                >
                  Conhecer Pessoalmente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
