export type AppViewMode = 'website' | 'slides';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'casal' | 'espaco' | 'detalhes' | 'todos';
  categoryLabel: string;
  image: string;
  subtitle?: string;
  aspect?: string;
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
