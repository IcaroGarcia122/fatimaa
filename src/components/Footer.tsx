import { ArrowUp, Phone, Mail, Instagram, MessageCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND } from '../data/canvaData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#041a0b] text-white pt-20 pb-0 border-t border-emerald-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-16"
        >
          {/* Logo Redonda Oficial & Identidade */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#fcfbf9] p-2 shadow-lg border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Fatima Sampaio - Selo Circular Oficial"
                  className="w-full h-full object-contain select-none"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-script text-3xl sm:text-4xl text-white leading-none tracking-normal">
                  Fatima Sampaio
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] font-semibold text-emerald-300 uppercase mt-1">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 font-light max-w-sm leading-relaxed mt-2">
              Fotografia autoral de afeto, casais e famílias. Momentos que se
              tornam parte da história de uma vida inteira.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-col sm:flex-row gap-6 sm:gap-12 text-xs font-semibold tracking-wider uppercase text-emerald-200/90 pt-1">
            <div className="flex flex-col space-y-3">
              <a href="#portfolio" className="hover:text-white transition-colors">
                PORTFÓLIO
              </a>
              <a href="#sobre" className="hover:text-white transition-colors">
                SOBRE A FÁTIMA
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <a href="#espaco" className="hover:text-white transition-colors">
                O ESPAÇO
              </a>
              <a href="#agendamento" className="hover:text-white transition-colors">
                AGENDAR ENSAIO
              </a>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left font-semibold text-xs tracking-wider uppercase pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PAINEL ADMIN</span>
                </button>
              )}
            </div>
          </div>

          {/* Direct Contact from Canva */}
          <div className="md:col-span-4 flex flex-col md:items-end text-left md:text-right text-xs text-emerald-100/80 space-y-2.5 pt-1">
            <p className="font-semibold text-white tracking-wider uppercase text-sm mb-1">
              Dúvidas? Entre em contato!
            </p>
            <a
              href={`tel:${BRAND.phoneClean}`}
              className="flex md:justify-end items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telefone: {BRAND.phone}</span>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex md:justify-end items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>E-mail: {BRAND.email}</span>
            </a>
            <div className="pt-2 flex items-center md:justify-end gap-3 text-white">
              <a
                href={`https://wa.me/${BRAND.phoneClean}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider bar matching the reference image */}
        <div className="border-t border-white/10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-emerald-200/60 uppercase tracking-wider gap-4">
          <p>© 2026 FATIMA SAMPAIO ESPAÇO FOTOGRÁFICO. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-emerald-950/80 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                title="Acessar painel para gerenciar ensaios e fotos"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Painel Administrativo</span>
              </button>
            )}
            <span className="text-[10px] text-emerald-300/60 tracking-widest hidden sm:inline">
              DIREÇÃO ARTÍSTICA & FOTOGRAFIA AUTORAL
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white text-emerald-200 text-xs transition-colors p-1 cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Massive Bold "FÁTIMA SAMPAIO" watermark spanning edge-to-edge */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-2 sm:-mb-4 md:-mb-8 lg:-mb-12 pt-4 leading-none">
        <svg
          viewBox="0 0 1200 130"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <text
            x="600"
            y="110"
            textAnchor="middle"
            textLength="1200"
            lengthAdjust="spacingAndGlyphs"
            className="font-sans uppercase fill-white/[0.08]"
            style={{ fontWeight: 900, fontSize: '130px' }}
          >
            FÁTIMA SAMPAIO
          </text>
        </svg>
      </div>
    </footer>
  );
}
