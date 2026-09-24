export type AppViewMode = 'website' | 'slides' | 'admin';

export interface Ensaio {
  id: string;
  title: string;
  subtitle?: string;
  category: 'gestante' | 'familia' | 'casal' | 'retratos' | 'geral';
  categoryLabel: string;
  coverImage: string;
  photos: string[];
  description?: string;
  date?: string;
  clientName?: string;
  isFeatured?: boolean;
  createdAt: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'casal' | 'espaco' | 'detalhes' | 'todos' | 'gestante' | 'familia' | 'retratos' | 'geral';
  categoryLabel: string;
  image: string;
  subtitle?: string;
  aspect?: string;
  ensaioId?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  sessionType: string;
  preferredDate: string;
  notes: string;
}

export interface StudioFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
