import { useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import StudioSection from './components/StudioSection';
import PhotoStripCarousel from './components/PhotoStripCarousel';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';
import FullPortfolioModal from './components/FullPortfolioModal';
import CanvaSlidesViewer from './components/CanvaSlidesViewer';
import { PORTFOLIO_DATA, BRAND } from './data/canvaData';
import type { AppViewMode, PortfolioItem } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('website');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFullPortfolioOpen, setIsFullPortfolioOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  // Direct WhatsApp contact URL
  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      'Olá Fátima Sampaio! Vi seu site e gostaria de saber mais informações sobre os ensaios fotográficos.'
    );
    window.open(`https://wa.me/${BRAND.phoneClean}?text=${message}`, '_blank');
  };

  if (viewMode === 'slides') {
    return (
      <CanvaSlidesViewer onBackToWebsite={() => setViewMode('website')} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-neutral-900 selection:bg-[#01590d] selection:text-white overflow-x-hidden">
      {/* Primary Navigation Bar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* Main Page Sections matching the 5 Canva Slides */}
      <main className="flex-1">
        {/* 1ª Sessão: Hero Section */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2ª Sessão: Portfólio Carrossel Inteiro de Ponta a Ponta (Fotos 1 a 11) */}
        <PortfolioSection
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenFullPortfolio={() => setIsFullPortfolioOpen(true)}
        />

        {/* 3ª Sessão: Sobre Fátima Sampaio */}
        <AboutSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 4ª Sessão: Nosso Espaço & Estúdio */}
        <StudioSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Carrossel Automático de Fotos Lado a Lado (sem legendas ou cards) */}
        <PhotoStripCarousel onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        {/* 5ª Sessão: Agendamento & Contato */}
        <BookingSection />
      </main>

      {/* Footer matching Slide 5 bottom */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Full Portfolio Modal Gallery */}
      <FullPortfolioModal
        isOpen={isFullPortfolioOpen}
        onClose={() => setIsFullPortfolioOpen(false)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        onOpenBooking={() => {
          setIsFullPortfolioOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Full-screen Photo Lightbox */}
      <LightboxModal
        item={selectedPhoto}
        items={PORTFOLIO_DATA.items}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(newPhoto) => setSelectedPhoto(newPhoto)}
        onOpenBooking={() => {
          setSelectedPhoto(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Ações rápidas de contato" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={handleOpenWhatsApp}
          id="btn-whatsapp-floating"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          aria-label="Falar no WhatsApp com Fátima Sampaio"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase pr-1">
            Falar no WhatsApp
          </span>
        </button>
      </aside>
    </div>
  );
}
