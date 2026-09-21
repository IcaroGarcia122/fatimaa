import { useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import StudioSection from './components/StudioSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';
import CanvaSlidesViewer from './components/CanvaSlidesViewer';
import { PORTFOLIO_DATA, BRAND } from './data/canvaData';
import type { AppViewMode, PortfolioItem } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('website');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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
        {/* Slide 1: Hero Section */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Transitional Experience Breakdown */}
        <ExperienceSection />

        {/* Half-Moon Logo Emblem flush against the left edge of the page between the two sections */}
        <div className="relative w-full h-0 z-20 pointer-events-none">
          <div
            className="absolute left-0 -top-24 sm:-top-32 md:-top-40 lg:-top-48 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
            aria-hidden="true"
          >
            <img
              src="/images/logo.png"
              alt="Fatima Sampaio - Selo Meia Lua"
              className="w-full h-full object-contain select-none drop-shadow-lg filter blur-[2px] sm:blur-[2.5px]"
            />
          </div>
        </div>

        {/* Slide 2: Nossa história & Portfolio Gallery */}
        <PortfolioSection
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Slide 3: Sobre Fátima Sampaio */}
        <AboutSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Slide 4: Nosso Espaço & Estúdio */}
        <StudioSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Slide 5: Agendamento & Contato */}
        <BookingSection />
      </main>

      {/* Footer matching Slide 5 bottom */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
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
