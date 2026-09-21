import { useState } from 'react';
import { Calendar, Phone, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKING_DATA, BRAND } from '../data/canvaData';
import type { BookingFormData } from '../types';

export default function BookingSection() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    sessionType: BOOKING_DATA.sessionTypes[0],
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate reliable booking submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá Fátima Sampaio! Meu nome é ${formData.name || 'um visitante'}. Gostaria de agendar um ${formData.sessionType}.`
    );
    window.open(`https://wa.me/${BRAND.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <section id="agendamento" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verbatim Headline Banner from Slide 5 of Canva */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block mb-3">
            RESERVE SUA DATA
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-neutral-900 leading-tight uppercase">
            {BOOKING_DATA.headlineTop}{' '}
            <span className="text-[#01590d] font-normal block">
              {BOOKING_DATA.headlineMiddle}
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans font-medium text-neutral-600 tracking-wider uppercase mt-4">
            {BOOKING_DATA.headlineBottom}
          </p>
        </motion.div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Authentic couple photo from Slide 5 (MAGpRXordp0.jpg) & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl overflow-hidden bg-neutral-950 text-white relative shadow-xl"
          >
            {/* The Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={BOOKING_DATA.featuredImage}
                alt="Casal apaixonado em ensaio fotográfico por Fátima Sampaio"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase border border-white/20">
                Atendimento Personalizado
              </div>
            </div>

            {/* Direct Contact Card embedded inside */}
            <div className="p-6 sm:p-8 bg-neutral-900 border-t border-neutral-800">
              <h3 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase mb-4">
                Dúvidas? Entre em contato direto:
              </h3>

              <div className="space-y-3 text-xs text-neutral-300">
                <a
                  href={`tel:${BRAND.phoneClean}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400">Telefone / WhatsApp</p>
                    <p className="font-medium text-sm">{BRAND.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400">E-mail</p>
                    <p className="font-medium text-sm">{BRAND.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/50">
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400">Horário</p>
                    <p className="font-light text-xs text-neutral-300">{BRAND.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Interactive Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#fcfbf9] rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm flex flex-col justify-center"
          >
            {submitted ? (
              <div className="text-center py-12 px-4 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#01590d] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-display font-light text-neutral-900">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto font-light">
                    Obrigado, <strong className="font-semibold text-neutral-900">{formData.name}</strong>. Fátima Sampaio ou nossa equipe entrará em contato em breve pelo telefone <strong>{formData.phone}</strong> para confirmar sua data e enviar o guia de preparação.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Abrir WhatsApp Agora</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        sessionType: BOOKING_DATA.sessionTypes[0],
                        preferredDate: '',
                        notes: '',
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-neutral-200 pb-4 mb-6">
                  <h3 className="text-xl font-display font-medium text-neutral-900">
                    Preencha os dados do seu ensaio
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    Responderemos em até poucas horas com disponibilidade e valores detalhados.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="input-name"
                      className="text-xs font-medium text-neutral-700"
                    >
                      Seu Nome Completo *
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Mariana & Lucas"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Telefone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="input-phone"
                      className="text-xs font-medium text-neutral-700"
                    >
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(11) 98765-4321"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="input-email"
                      className="text-xs font-medium text-neutral-700"
                    >
                      E-mail para Contato
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Data pretendida */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="input-date"
                      className="text-xs font-medium text-neutral-700"
                    >
                      Data Pretendida (Aproximada)
                    </label>
                    <input
                      id="input-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Tipo de ensaio */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="select-type"
                    className="text-xs font-medium text-neutral-700"
                  >
                    Tipo de Ensaio Desejado
                  </label>
                  <select
                    id="select-type"
                    value={formData.sessionType}
                    onChange={(e) =>
                      setFormData({ ...formData, sessionType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all"
                  >
                    {BOOKING_DATA.sessionTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Observações */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="input-notes"
                    className="text-xs font-medium text-neutral-700"
                  >
                    Conte um pouco sobre vocês (ocasião especial, ideias ou dúvidas)
                  </label>
                  <textarea
                    id="input-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Ex: É comemoração de aniversário de casamento / Gostamos de fotos ao ar livre e no estúdio..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#01590d] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="btn-submit-booking"
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#01590d] hover:bg-[#01450a] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Enviando...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SOLICITAR AGENDAMENTO</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
