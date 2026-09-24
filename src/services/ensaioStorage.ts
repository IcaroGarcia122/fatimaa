import { DEFAULT_ENSAIOS } from '../data/defaultEnsaios';
import type { Ensaio } from '../types';

const STORAGE_KEY = 'fatima_sampaio_ensaios_v1';
const EVENT_NAME = 'fatima-ensaios-updated';

/**
 * Compresses an image file (e.g. from camera/phone) to a balanced Base64 data URL
 * so that localStorage doesn't throw a quota exceeded error.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Erro ao ler a imagem'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erro ao carregar arquivo'));
    reader.readAsDataURL(file);
  });
}

/**
 * Retrieve all saved Ensaios
 */
export function getSavedEnsaios(): Ensaio[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENSAIOS));
      return DEFAULT_ENSAIOS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return DEFAULT_ENSAIOS;
  } catch (err) {
    console.warn('Erro ao carregar ensaios do localStorage:', err);
    return DEFAULT_ENSAIOS;
  }
}

/**
 * Persist Ensaios array to storage and emit update event
 */
export function persistEnsaios(ensaios: Ensaio[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ensaios));
  } catch (err) {
    console.error('Erro ao salvar ensaios no localStorage:', err);
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: ensaios }));
}

/**
 * Save (create or update) an Ensaio
 */
export function saveEnsaio(
  ensaioData: Omit<Ensaio, 'id' | 'createdAt'> & { id?: string; createdAt?: number }
): Ensaio {
  const current = getSavedEnsaios();
  const id = ensaioData.id || `ensaio-${Date.now()}`;
  const createdAt = ensaioData.createdAt || Date.now();

  const newEnsaio: Ensaio = {
    ...ensaioData,
    id,
    createdAt,
    coverImage: ensaioData.coverImage || ensaioData.photos[0] || '/images/foto1.jpg',
    photos: ensaioData.photos.length > 0 ? ensaioData.photos : ['/images/foto1.jpg'],
  };

  const existingIndex = current.findIndex((item) => item.id === id);
  let updated: Ensaio[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = newEnsaio;
  } else {
    // Put new ensaio at the beginning
    updated = [newEnsaio, ...current];
  }

  persistEnsaios(updated);
  return newEnsaio;
}

/**
 * Delete an Ensaio by ID
 */
export function deleteEnsaio(id: string): boolean {
  const current = getSavedEnsaios();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length === current.length) return false;
  persistEnsaios(filtered);
  return true;
}

/**
 * Reset all Ensaios to default studio sessions
 */
export function resetEnsaiosToDefault(): Ensaio[] {
  persistEnsaios(DEFAULT_ENSAIOS);
  return DEFAULT_ENSAIOS;
}

/**
 * Subscribe to real-time Ensaios updates
 */
export function subscribeEnsaios(callback: (ensaios: Ensaio[]) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<Ensaio[]>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getSavedEnsaios());
    }
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

/**
 * Pre-stocked studio stock images that can be picked in Admin
 */
export const STUDIO_PRESET_IMAGES = [
  { url: '/images/foto1.jpg', label: 'Gestante Florir (Foto 1)' },
  { url: '/images/foto2.jpg', label: 'Casal Sorriso (Foto 2)' },
  { url: '/images/foto3.jpg', label: 'Paternidade & Vínculo (Foto 3)' },
  { url: '/images/foto4.jpg', label: 'Gestante Eclat (Foto 4)' },
  { url: '/images/foto5.jpg', label: 'Família Abraço (Foto 5)' },
  { url: '/images/foto6.jpg', label: 'Família Cumplicidade (Foto 6)' },
  { url: '/images/foto7.jpg', label: 'Retrato Autoral (Foto 7)' },
  { url: '/images/foto8.jpg', label: 'Casal Amor (Foto 8)' },
  { url: '/images/foto9.jpg', label: 'Gestante Detalhe (Foto 9)' },
  { url: '/images/foto10.jpg', label: 'Família Alegria (Foto 10)' },
  { url: '/images/foto11.jpg', label: 'Retrato Olhar (Foto 11)' },
  { url: '/images/espaco1.png', label: 'Estúdio Espaço 1' },
  { url: '/images/espaco2.png', label: 'Estúdio Espaço 2' },
];
