import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
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
import EnsaioDetailModal from './components/EnsaioDetailModal';
import CanvaSlidesViewer from './components/CanvaSlidesViewer';
import AdminPage from './pages/AdminPage';
import { PORTFOLIO_DATA, BRAND } from './data/canvaData';
import { getSavedEnsaios, subscribeEnsaios } from './services/ensaioStorage';
import type { AppViewMode, PortfolioItem, Ensaio } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('website');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFullPortfolioOpen, setIsFullPortfolioOpen] = useState(false);
  const [selectedEnsaio, setSelectedEnsaio] = useState<Ensaio | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);
  const [lightboxItems, setLightboxItems] = useState<PortfolioItem[]>(PORTFOLIO_DATA.items);

  // Dynamic Ensaios State with real-time subscription
  const [ensaios, setEnsaios] = useState<Ensaio[]>(() => getSavedEnsaios());

  useEffect(() => {
    const unsubscribe = subscribeEnsaios((updatedEnsaios) => {
      setEnsaios(updatedEnsaios);
    });
    return () => unsubscribe();
  }, []);

  // Listen to hash changes for deep linking to admin (#admin)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Direct WhatsApp contact URL
  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      'Olá Fátima Sampaio! Vi seu site e gostaria de saber mais informações sobre os ensaios fotográficos.'
    );
    window.open(`https://wa.me/${BRAND.phoneClean}?text=${message}`, '_blank');
  };

  // Open photo in lightbox from an Ensaio
  const handleSelectEnsaioPhoto = (ensaio: Ensaio, photoUrl: string, index: number) => {
    const sessionPhotos: PortfolioItem[] = ensaio.photos.map((url, idx) => ({
      id: `${ensaio.id}-p-${idx}`,
      title: ensaio.title,
      subtitle: `${ensaio.categoryLabel} • Foto ${idx + 1} de ${ensaio.photos.length}`,
      category: ensaio.category,
      categoryLabel: ensaio.categoryLabel,
      image: url,
      ensaioId: ensaio.id,
    }));

    setLightboxItems(sessionPhotos);
    setSelectedPhoto(sessionPhotos[index] || sessionPhotos[0]);
  };

  // Open individual photo in lightbox
  const handleSelectPhoto = (photo: PortfolioItem) => {
    setLightboxItems(PORTFOLIO_DATA.items);
    setSelectedPhoto(photo);
  };

  // 1. FULL PAGE: Slides Viewer
  if (viewMode === 'slides') {
    return (
      <CanvaSlidesViewer onBackToWebsite={() => setViewMode('website')} />
    );
  }

  // 2. FULL PAGE: Admin Dashboard
  if (viewMode === 'admin') {
    return (
      <AdminPage
        ensaios={ensaios}
        onBackToWebsite={() => {
          setViewMode('website');
          if (window.location.hash === '#admin') {
            window.history.pushState(null, '', window.location.pathname);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPreviewEnsaio={(ensaio) => {
          setViewMode('website');
          setSelectedEnsaio(ensaio);
        }}
      />
    );
  }

  // 3. FULL PAGE: Main Website
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-neutral-900 selection:bg-[#01590d] selection:text-white overflow-x-hidden">
      {/* Primary Navigation Bar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1ª Sessão: Hero Section com Slogan Elegante */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2ª Sessão: Portfólio Carrossel organizado por Ensaios (com múltiplas fotos cada) */}
        <PortfolioSection
          ensaios={ensaios}
          onSelectEnsaio={(ensaio) => setSelectedEnsaio(ensaio)}
          onSelectPhoto={handleSelectPhoto}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenFullPortfolio={() => setIsFullPortfolioOpen(true)}
        />

        {/* 3ª Sessão: Sobre Fátima Sampaio com layout sem sobreposição no mobile */}
        <AboutSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 4ª Sessão: Nosso Espaço & Estúdio */}
        <StudioSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Carrossel Contínuo de Fotos */}
        <PhotoStripCarousel onSelectPhoto={handleSelectPhoto} />

        {/* 5ª Sessão: Agendamento & Contato */}
        <BookingSection />
      </main>

      {/* Footer com Botão de Acesso ao Painel Administrativo em Página Inteira */}
      <Footer
        onOpenAdmin={() => {
          setViewMode('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Full Portfolio Modal Gallery (Ensaios & Todas as Fotos) */}
      <FullPortfolioModal
        isOpen={isFullPortfolioOpen}
        onClose={() => setIsFullPortfolioOpen(false)}
        ensaios={ensaios}
        onSelectEnsaio={(ensaio) => setSelectedEnsaio(ensaio)}
        onSelectPhoto={handleSelectPhoto}
        onOpenBooking={() => {
          setIsFullPortfolioOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* Ensaio Detail Modal: Displays all photos in the photoshoot session */}
      <EnsaioDetailModal
        ensaio={selectedEnsaio}
        isOpen={!!selectedEnsaio}
        onClose={() => setSelectedEnsaio(null)}
        onSelectPhoto={(photoUrl, index) => {
          if (selectedEnsaio) {
            handleSelectEnsaioPhoto(selectedEnsaio, photoUrl, index);
          }
        }}
        onOpenBooking={() => {
          setSelectedEnsaio(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Full-screen Photo Lightbox */}
      <LightboxModal
        item={selectedPhoto}
        items={lightboxItems}
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
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
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
