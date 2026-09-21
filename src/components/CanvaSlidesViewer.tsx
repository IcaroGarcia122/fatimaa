import { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, ArrowLeft, RefreshCw } from 'lucide-react';

interface CanvaSlidesViewerProps {
  onBackToWebsite: () => void;
}

export default function CanvaSlidesViewer({
  onBackToWebsite,
}: CanvaSlidesViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  const canvaUrl =
    'https://www.canva.com/design/DAHVfUij0tE/Pe7jMvO35b7B2kssxNb-wg/view?embed';
  const directCanvaUrl =
    'https://www.canva.com/design/DAHVfUij0tE/Pe7jMvO35b7B2kssxNb-wg/view';

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Top control bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Site Funcional</span>
          </button>

          <span className="hidden md:inline-block text-xs text-neutral-400">
            Visualizando apresentação original do Canva
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            title="Recarregar apresentação"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            title="Alternar tela cheia"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <a
            href={directCanvaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
          >
            <span>Abrir no Canva</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main presentation canvas */}
      <div className="flex-1 w-full relative flex items-center justify-center bg-black">
        <iframe
          key={key}
          src={canvaUrl}
          title="Apresentação Canva - Fátima Sampaio Espaço Fotográfico"
          className="w-full h-full border-0 absolute inset-0"
          allow="fullscreen"
          loading="eager"
        />
      </div>
    </div>
  );
}
