import { useState, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Upload,
  Trash2,
  Check,
  Star,
  Image as ImageIcon,
  FolderPlus,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Eye,
  Edit3,
  Search,
  Filter,
  Layers,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Heart,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Ensaio } from '../types';
import {
  compressImageFile,
  saveEnsaio,
  deleteEnsaio,
  resetEnsaiosToDefault,
  STUDIO_PRESET_IMAGES,
} from '../services/ensaioStorage';
import { BRAND } from '../data/canvaData';

interface AdminPageProps {
  ensaios: Ensaio[];
  onBackToWebsite: () => void;
  onPreviewEnsaio?: (ensaio: Ensaio) => void;
}

export default function AdminPage({
  ensaios,
  onBackToWebsite,
  onPreviewEnsaio,
}: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'settings'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'gestante' | 'familia' | 'casal' | 'retratos' | 'geral'>('gestante');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('Ensaio Recente');
  const [photos, setPhotos] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>('');

  // UI helpers
  const [isUploading, setIsUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ensaioToDelete, setEnsaioToDelete] = useState<Ensaio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalPhotosCount = ensaios.reduce((acc, curr) => acc + curr.photos.length, 0);

  const startNewEnsaio = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setCategory('gestante');
    setDescription('');
    setClientName('');
    setDate('Ensaio Recente');
    setPhotos([]);
    setCoverImage('');
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditEnsaio = (ensaio: Ensaio) => {
    setEditingId(ensaio.id);
    setTitle(ensaio.title);
    setSubtitle(ensaio.subtitle || '');
    setCategory(ensaio.category);
    setDescription(ensaio.description || '');
    setClientName(ensaio.clientName || '');
    setDate(ensaio.date || 'Ensaio Recente');
    setPhotos([...ensaio.photos]);
    setCoverImage(ensaio.coverImage || ensaio.photos[0] || '');
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newPhotos: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImageFile(files[i]);
        newPhotos.push(compressed);
      } catch (err) {
        console.error('Erro ao processar imagem:', err);
      }
    }

    if (newPhotos.length > 0) {
      setPhotos((prev) => {
        const updated = [...prev, ...newPhotos];
        if (!coverImage && updated.length > 0) {
          setCoverImage(updated[0]);
        }
        return updated;
      });
      showToast(`${newPhotos.length} foto(s) anexada(s) com sucesso!`);
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrl = () => {
    if (!customUrl.trim()) return;
    const url = customUrl.trim();
    setPhotos((prev) => {
      const updated = [...prev, url];
      if (!coverImage) setCoverImage(url);
      return updated;
    });
    setCustomUrl('');
    setShowUrlInput(false);
    showToast('Foto adicionada por URL!');
  };

  const handleAddPreset = (url: string) => {
    if (photos.includes(url)) {
      showToast('Esta foto já foi adicionada ao ensaio.');
      return;
    }
    setPhotos((prev) => {
      const updated = [...prev, url];
      if (!coverImage) setCoverImage(url);
      return updated;
    });
    showToast('Foto da galeria anexada!');
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const photoToRemove = photos[indexToRemove];
    const updated = photos.filter((_, idx) => idx !== indexToRemove);
    setPhotos(updated);

    if (coverImage === photoToRemove) {
      setCoverImage(updated[0] || '');
    }
  };

  const handleSetCover = (url: string) => {
    setCoverImage(url);
    showToast('Capa do ensaio definida!');
  };

  const categoryLabels: Record<string, string> = {
    gestante: 'Gestante & Maternidade',
    familia: 'Família & Vínculos',
    casal: 'Casais',
    retratos: 'Retratos Autorais',
    geral: 'Ensaio Autoral',
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Por favor, informe o título do ensaio.');
      return;
    }

    if (photos.length === 0) {
      showToast('Por favor, anexe ao menos 1 foto para este ensaio.');
      return;
    }

    const currentCover = coverImage || photos[0];

    saveEnsaio({
      id: editingId || undefined,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      category,
      categoryLabel: categoryLabels[category] || 'Ensaio Especial',
      coverImage: currentCover,
      photos,
      description: description.trim() || undefined,
      clientName: clientName.trim() || undefined,
      date: date.trim() || 'Ensaio Autoral',
    });

    showToast(editingId ? 'Ensaio atualizado com sucesso!' : 'Novo ensaio publicado com sucesso!');
    setActiveTab('list');
    setEditingId(null);
  };

  const promptDeleteEnsaio = (ensaio: Ensaio) => {
    setEnsaioToDelete(ensaio);
  };

  const confirmDeleteEnsaio = () => {
    if (!ensaioToDelete) return;
    setIsDeleting(true);
    const targetTitle = ensaioToDelete.title;
    const targetId = ensaioToDelete.id;

    const success = deleteEnsaio(targetId);
    if (success) {
      showToast(`Ensaio "${targetTitle}" excluído com sucesso!`);
      if (editingId === targetId) {
        setActiveTab('list');
        setEditingId(null);
      }
    } else {
      showToast('Não foi possível excluir o ensaio.');
    }

    setIsDeleting(false);
    setEnsaioToDelete(null);
  };

  const cancelDeleteEnsaio = () => {
    if (!isDeleting) {
      setEnsaioToDelete(null);
    }
  };

  const confirmResetDefaults = () => {
    resetEnsaiosToDefault();
    showToast('Ensaios padrão do estúdio restaurados!');
    setIsResetConfirmOpen(false);
    setActiveTab('list');
  };

  // Filtered Ensaios for list view
  const filteredEnsaios = ensaios.filter((item) => {
    const matchesCategory =
      categoryFilter === 'todos' ||
      item.category === categoryFilter ||
      item.categoryLabel.toLowerCase().includes(categoryFilter);
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-neutral-900 flex flex-col selection:bg-[#01590d] selection:text-white">
      {/* Top Admin App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs shrink-0 cursor-pointer"
            title="Voltar ao site"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#01590d]" />
            <span className="sm:hidden">Site</span>
            <span className="hidden sm:inline">Voltar ao Site</span>
          </button>

          <div className="h-6 w-px bg-neutral-200 hidden sm:block shrink-0" />

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#01590d] text-white flex items-center justify-center font-script text-lg sm:text-xl shadow-xs shrink-0">
              FS
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-medium text-sm sm:text-base text-neutral-900 leading-none truncate">
                  Fátima Sampaio
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-[#01590d] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider shrink-0">
                  Admin
                </span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5 hidden sm:block">
                Painel Administrativo do Portfólio
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={startNewEnsaio}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo</span>
            <span className="hidden sm:inline">Ensaio</span>
          </button>

          <button
            onClick={onBackToWebsite}
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-600 hover:text-[#01590d] font-medium px-3 py-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <span>Ver como Visitante</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 sm:top-20 inset-x-3 sm:inset-x-0 mx-auto w-fit max-w-[90vw] z-50 px-4 sm:px-5 py-2.5 rounded-full bg-[#01590d] text-white text-xs font-semibold shadow-xl flex items-center gap-2 text-center"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Top Banner / Stats Overview */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-[#032310] via-[#01590d] to-[#043317] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Página de Gestão</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-display font-light text-white leading-tight">
                Gerenciador de Ensaios & Portfólio
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-light max-w-2xl mt-1.5 sm:mt-2 leading-relaxed">
                Adicione novas sessões, anexe fotos em alta resolução, defina fotos de capa e organize os ensaios do site.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/15 text-center sm:text-left">
                <span className="text-xl sm:text-3xl font-display font-light text-white block">
                  {ensaios.length}
                </span>
                <span className="text-[9px] sm:text-[11px] text-emerald-200/90 font-medium uppercase tracking-wider block mt-0.5">
                  Ensaios
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/15 text-center sm:text-left">
                <span className="text-xl sm:text-3xl font-display font-light text-white block">
                  {totalPhotosCount}
                </span>
                <span className="text-[9px] sm:text-[11px] text-emerald-200/90 font-medium uppercase tracking-wider block mt-0.5">
                  Fotos
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/15 text-center sm:text-left">
                <span className="text-xl sm:text-3xl font-display font-light text-emerald-300 block">
                  100%
                </span>
                <span className="text-[9px] sm:text-[11px] text-emerald-200/90 font-medium uppercase tracking-wider block mt-0.5">
                  Sincronizado
                </span>
              </div>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Tab Controls Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <button
              onClick={() => setActiveTab('list')}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-[#01590d] text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              Ensaios ({ensaios.length})
            </button>
            <button
              onClick={startNewEnsaio}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'form' && !editingId
                  ? 'bg-[#01590d] text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Ensaio</span>
            </button>
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full sm:w-auto text-xs text-neutral-500 hover:text-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Restaurar ensaios originais do estúdio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Originais</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LIST OF ENSAIOS */}
        {activeTab === 'list' && (
          <div>
            {/* Search and Category Filter */}
            <div className="mb-6 bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none touch-pan-x -mx-1 px-1">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'gestante', label: 'Gestante' },
                  { id: 'familia', label: 'Família' },
                  { id: 'casal', label: 'Casais' },
                  { id: 'retratos', label: 'Retratos' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-[#01590d] text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar ensaio..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-base sm:text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#01590d] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Ensaios Grid */}
            {filteredEnsaios.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8">
                <ImageIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-lg font-display font-medium text-neutral-700">
                  Nenhum ensaio encontrado
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Não encontramos ensaios com o filtro selecionado.
                </p>
                <button
                  onClick={startNewEnsaio}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#01590d] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Criar Primeiro Ensaio</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEnsaios.map((ensaio) => (
                  <div
                    key={ensaio.id}
                    className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Cover Stage */}
                    <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden group">
                      <img
                        src={ensaio.coverImage || ensaio.photos[0]}
                        alt={ensaio.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                      {/* Photo Count badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{ensaio.photos.length} Fotos</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[#01590d] text-[10px] font-semibold uppercase tracking-wider">
                        {ensaio.categoryLabel}
                      </div>

                      {/* Mini photo strip */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center gap-1.5 bg-black/50 backdrop-blur-xs p-1.5 rounded-xl">
                        {ensaio.photos.slice(0, 5).map((p, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-lg border border-white/40 overflow-hidden shrink-0"
                          >
                            <img src={p} alt="" className="w-full h-full object-cover object-top" />
                          </div>
                        ))}
                        {ensaio.photos.length > 5 && (
                          <span className="text-[10px] text-white font-semibold px-1.5">
                            +{ensaio.photos.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-medium text-neutral-900 leading-snug">
                          {ensaio.title}
                        </h3>
                        {ensaio.subtitle && (
                          <p className="text-xs text-neutral-500 font-light mt-1">
                            {ensaio.subtitle}
                          </p>
                        )}
                        {ensaio.description && (
                          <p className="text-xs text-neutral-600 font-light mt-2 line-clamp-2 leading-relaxed">
                            {ensaio.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                        {onPreviewEnsaio && (
                          <button
                            onClick={() => onPreviewEnsaio(ensaio)}
                            className="text-xs text-neutral-600 hover:text-[#01590d] font-medium flex items-center gap-1.5 transition-colors cursor-pointer py-1.5"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Visualizar</span>
                          </button>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            onClick={() => startEditEnsaio(ensaio)}
                            className="px-3.5 py-2 rounded-xl border border-neutral-300 hover:border-[#01590d] text-neutral-700 hover:text-[#01590d] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              promptDeleteEnsaio(ensaio);
                            }}
                            className="p-2 sm:p-2 rounded-xl border border-neutral-300 hover:border-rose-400 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
                            title={`Excluir ensaio "${ensaio.title}"`}
                            aria-label={`Excluir ensaio ${ensaio.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE / EDIT ENSAIO FORM */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-4 sm:p-8 md:p-10 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-neutral-200 mb-6 gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#01590d] uppercase tracking-wider block">
                  FORMULÁRIO DE ENSAIO
                </span>
                <h2 className="text-xl sm:text-3xl font-display font-medium text-neutral-900">
                  {editingId ? 'Editar Ensaio e Fotografias' : 'Cadastrar Novo Ensaio'}
                </h2>
                <p className="text-xs text-neutral-500 font-light mt-0.5">
                  Preencha as informações do ensaio e anexe as fotos da sessão.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="self-start sm:self-auto px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar à Lista</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Título do Ensaio *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Espera de Arthur - Luz de Outono"
                    className="w-full px-3.5 sm:px-4 py-3 text-base sm:text-sm rounded-2xl border border-neutral-300 focus:border-[#01590d] focus:ring-2 focus:ring-[#01590d]/20 outline-none bg-neutral-50 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Categoria do Ensaio *
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as 'gestante' | 'familia' | 'casal' | 'retratos' | 'geral'
                      )
                    }
                    className="w-full px-3.5 sm:px-4 py-3 text-base sm:text-sm rounded-2xl border border-neutral-300 focus:border-[#01590d] focus:ring-2 focus:ring-[#01590d]/20 outline-none bg-neutral-50 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="gestante">Gestante & Maternidade</option>
                    <option value="familia">Família & Vínculos</option>
                    <option value="casal">Casais & Noivos</option>
                    <option value="retratos">Retratos Autorais</option>
                    <option value="geral">Geral / Estúdio</option>
                  </select>
                </div>
              </div>

              {/* Subtitle & Client/Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Subtítulo Curto
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ex: Ensaio intimista no estúdio com luz suave"
                    className="w-full px-3.5 sm:px-4 py-3 text-base sm:text-sm rounded-2xl border border-neutral-300 focus:border-[#01590d] focus:ring-2 focus:ring-[#01590d]/20 outline-none bg-neutral-50 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Nome do Cliente ou Tema
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Mariana & Família"
                    className="w-full px-3.5 sm:px-4 py-3 text-base sm:text-sm rounded-2xl border border-neutral-300 focus:border-[#01590d] focus:ring-2 focus:ring-[#01590d]/20 outline-none bg-neutral-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  História / Descrição da Sessão
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a essência deste ensaio, o clima acolhedor, as sensações e os sentimentos eternizados..."
                  className="w-full px-3.5 sm:px-4 py-3 text-base sm:text-sm rounded-2xl border border-neutral-300 focus:border-[#01590d] focus:ring-2 focus:ring-[#01590d]/20 outline-none bg-neutral-50 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* SECTION: Anexar Fotos ao Ensaio */}
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="flex flex-col gap-3 mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 flex items-center gap-2">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#01590d]" />
                      <span>Anexar Fotos ({photos.length})</span>
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Selecione fotos do celular/computador ou use links e acervo do estúdio.
                    </p>
                  </div>

                  {/* Attachment Controls: Responsive 3 columns on mobile */}
                  <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="upload-page-ensaios"
                    />
                    <label
                      htmlFor="upload-page-ensaios"
                      className="px-2.5 sm:px-4 py-2.5 rounded-xl sm:rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-xs text-center active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Upload</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="px-2.5 sm:px-4 py-2.5 rounded-xl sm:rounded-full bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center active:scale-95"
                    >
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">URL</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPresets(!showPresets)}
                      className="px-2.5 sm:px-4 py-2.5 rounded-xl sm:rounded-full bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center active:scale-95"
                    >
                      <FolderPlus className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Acervo</span>
                    </button>
                  </div>
                </div>

                {isUploading && (
                  <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 text-[#01590d] text-xs rounded-2xl flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#01590d] border-t-transparent rounded-full animate-spin" />
                    <span>Processando e otimizando imagens enviadas...</span>
                  </div>
                )}

                {/* Input for URL */}
                {showUrlInput && (
                  <div className="p-3 mb-4 bg-white rounded-2xl border border-neutral-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="Cole o link direto da imagem (https://...)"
                      className="flex-1 text-sm sm:text-xs px-3.5 py-2.5 border border-neutral-200 rounded-xl outline-none focus:border-[#01590d]"
                    />
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      className="px-4 py-2.5 bg-[#01590d] text-white text-xs font-semibold rounded-xl hover:bg-[#027513] shrink-0 active:scale-95"
                    >
                      Anexar Foto
                    </button>
                  </div>
                )}

                {/* Preset Studio Gallery Picker */}
                {showPresets && (
                  <div className="p-3.5 sm:p-4 mb-4 bg-white rounded-2xl border border-neutral-300">
                    <p className="text-xs font-semibold text-neutral-700 mb-2.5">
                      Fotografias do Acervo (toque para adicionar):
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                      {STUDIO_PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddPreset(preset.url)}
                          className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 hover:border-[#01590d] transition-all group cursor-pointer"
                          title={preset.label}
                        >
                          <img src={preset.url} alt="" className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Plus className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid of Attached Photos */}
                {photos.length === 0 ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="py-10 sm:py-14 border-2 border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#01590d] hover:bg-emerald-50/20 transition-all p-4"
                  >
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-400 mb-2" />
                    <p className="text-xs sm:text-sm font-medium text-neutral-700">
                      Nenhuma foto anexada a este ensaio
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-light mt-1 max-w-sm">
                      Toque aqui para escolher fotos do seu celular ou use as opções de upload acima.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5 mt-2">
                    {photos.map((photoUrl, idx) => {
                      const isCover = coverImage === photoUrl || (!coverImage && idx === 0);
                      return (
                        <div
                          key={idx}
                          className={`relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-200 border-2 transition-all ${
                            isCover ? 'border-[#01590d] ring-3 sm:ring-4 ring-[#01590d]/20 shadow-md' : 'border-neutral-200'
                          }`}
                        >
                          <img
                            src={photoUrl}
                            alt=""
                            className="w-full h-full object-cover object-top select-none"
                          />

                          {/* Cover badge */}
                          {isCover ? (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#01590d] text-white text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                              <Star className="w-3 h-3 fill-white" />
                              <span>Capa</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCover(photoUrl)}
                              className="absolute bottom-2 inset-x-2 py-1 rounded-lg bg-black/65 hover:bg-[#01590d] text-white text-[10px] font-medium backdrop-blur-xs flex items-center justify-center gap-1 transition-colors cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 opacity-95"
                              title="Definir foto de capa"
                            >
                              <Star className="w-3 h-3 text-amber-400" />
                              <span>Definir Capa</span>
                            </button>
                          )}

                          {/* Delete button: ALWAYS accessible on mobile touch */}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 opacity-95 active:scale-90"
                            title="Remover foto"
                            aria-label="Remover foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit Bar - Responsive Mobile Flow */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-neutral-200">
                <div>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentEnsaio = ensaios.find((item) => item.id === editingId);
                        if (currentEnsaio) {
                          promptDeleteEnsaio(currentEnsaio);
                        }
                      }}
                      className="w-full sm:w-auto px-4 py-3 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir este Ensaio</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 border border-neutral-200 sm:border-transparent transition-colors text-center cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingId ? 'Salvar Alterações' : 'Publicar Ensaio'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* IN-APP CONFIRMATION MODAL FOR DELETING ENSAIO */}
      <AnimatePresence>
        {ensaioToDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
            onClick={cancelDeleteEnsaio}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 text-neutral-900"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3 sm:mb-4">
                <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-display font-medium text-neutral-900 mb-1.5 sm:mb-2">
                Excluir este Ensaio?
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 font-light mb-4 leading-relaxed">
                Tem certeza que deseja apagar permanentemente o ensaio{' '}
                <strong className="font-semibold text-neutral-900">
                  "{ensaioToDelete.title}"
                </strong>
                ? Esta sessão e todas as suas {ensaioToDelete.photos.length} fotografias serão removidas do portfólio.
              </p>

              {/* Ensaio card preview */}
              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5 sm:mb-6">
                <img
                  src={ensaioToDelete.coverImage || ensaioToDelete.photos[0]}
                  alt=""
                  className="w-12 h-14 rounded-xl object-cover object-top shrink-0 border border-neutral-200"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#01590d] uppercase tracking-wider block truncate">
                    {ensaioToDelete.categoryLabel}
                  </span>
                  <span className="text-xs font-medium text-neutral-900 block truncate">
                    {ensaioToDelete.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">
                    {ensaioToDelete.photos.length} fotografias na sessão
                  </span>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={cancelDeleteEnsaio}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteEnsaio}
                  disabled={isDeleting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? 'Excluindo...' : 'Sim, Excluir Ensaio'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IN-APP CONFIRMATION MODAL FOR RESETTING DEFAULTS */}
      <AnimatePresence>
        {isResetConfirmOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsResetConfirmOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 text-neutral-900"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3 sm:mb-4">
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-display font-medium text-neutral-900 mb-1.5 sm:mb-2">
                Restaurar Ensaios Originais?
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 font-light mb-5 sm:mb-6 leading-relaxed">
                Deseja restaurar as sessões fotográficas padrão originais de Fátima Sampaio?
                Isso recarregará os ensaios de referência com todas as fotografias autorais do acervo.
              </p>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmResetDefaults}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#01590d] hover:bg-[#027513] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sim, Restaurar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
