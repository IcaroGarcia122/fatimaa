import { useState } from 'react';
import { X, Calendar, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { BOOKING_DATA, BRAND } from '../data/canvaData';
import type { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    sessionType: BOOKING_DATA.sessionTypes[0],
    preferredDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá Fátima Sampaio! Gostaria de agendar um ensaio (${formData.sessionType}). Meu nome é ${formData.name}.`
    );
    window.open(`https://wa.me/${BRAND.phoneClean}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#fcfbf9] rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#01590d] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-light text-neutral-900">
              Solicitação Enviada!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light">
              Entraremos em contato com você pelo WhatsApp <strong>{formData.phone}</strong> para confirmar a disponibilidade da data.
            </p>
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-neutral-500 hover:text-neutral-800"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <img
                src={BRAND.logo}
                alt="Fatima Sampaio"
                className="h-10 w-auto object-contain mb-2.5"
              />
              <h3 className="text-2xl sm:text-3xl font-display font-light text-neutral-900">
                Agendar seu Ensaio
              </h3>
              <p className="text-xs text-neutral-500 font-light mt-1">
                Preencha os campos abaixo e entraremos em contato rapidamente.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nome completo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:ring-2 focus:ring-[#01590d] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:ring-2 focus:ring-[#01590d] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">
                    Data Pretendida
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredDate: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:ring-2 focus:ring-[#01590d] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Tipo de Ensaio
                </label>
                <select
                  value={formData.sessionType}
                  onChange={(e) =>
                    setFormData({ ...formData, sessionType: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:ring-2 focus:ring-[#01590d] focus:outline-hidden"
                >
                  {BOOKING_DATA.sessionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Mensagem ou Preferências (opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Conte um pouco sobre o momento que deseja celebrar..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:ring-2 focus:ring-[#01590d] focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#01590d] hover:bg-[#01450a] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-sm disabled:opacity-60"
                >
                  {loading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirmar Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
