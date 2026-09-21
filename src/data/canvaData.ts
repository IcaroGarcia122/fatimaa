import type { PortfolioItem, StudioFeature } from '../types';

export const BRAND = {
  name: 'Fatima Sampaio',
  tagline: 'ESPAÇO FOTOGRÁFICO',
  logo: '/images/logo.png',
  yearsOfExperience: 29,
  primaryColor: '#01590d',
  primaryColorHover: '#01450a',
  phone: '(12) 3456-7890',
  phoneClean: '551234567890',
  email: 'ola@grandesite.com.br',
  instagram: '@fatimasampaio.foto',
  address: 'Rua das Camélias, 280 - Jardim das Artes',
  city: 'São Paulo - SP',
  hours: 'Segunda a Sábado, das 9h às 19h (Com agendamento prévio)',
};

export const HERO_DATA = {
  badge: 'ESPAÇO FOTOGRÁFICO AUTORAL',
  headline: 'Histórias, que merecem ser Lembradas!',
  subtitle:
    'Ensaios conduzidos com calma, sensibilidade e direção — para que você se sinta à vontade e viva o momento por inteiro.',
  ctaPrimary: 'AGENDAR ENSAIO',
  ctaSecondary: 'CONHECER PORTFÓLIO',
  images: {
    heroMain: '/images/MAHVfS8J6Xo.png',
    heroSide: '/images/MAHVfVCKoQA.png',
    overlay: '/images/MAGACGnQ_LQ.png',
  },
};

export const PORTFOLIO_DATA = {
  sectionTitle: 'Nossa história',
  sectionSubtitle:
    'Há 29 anos transformando momentos delicados em memórias que atravessam gerações.',
  items: [
    {
      id: 'foto-1',
      title: 'Tarde no Parque & Leitura',
      subtitle: 'Ensaio ao ar livre com luz dourada natural',
      category: 'casal',
      categoryLabel: 'Casais',
      image: '/images/MAGpRTmu_To.jpg',
    },
    {
      id: 'foto-2',
      title: 'Afeto & Conexão Pura',
      subtitle: 'Momentos espontâneos de carinho e risos',
      category: 'casal',
      categoryLabel: 'Casais',
      image: '/images/MAGpRQBq698.jpg',
    },
    {
      id: 'foto-3',
      title: 'Caminhada Urbana & Contraste',
      subtitle: 'Estilo contemporâneo e texturas da cidade',
      category: 'casal',
      categoryLabel: 'Ensaio Externo',
      image: '/images/MAGpRQ1CbhA.jpg',
    },
    {
      id: 'foto-4',
      title: 'Olhares & Sutilezas',
      subtitle: 'Expressões espontâneas e direção sensível',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/MAHVffYxUgo.png',
    },
    {
      id: 'foto-5',
      title: 'Cumplicidade Íntima',
      subtitle: 'Capturas sem poses forçadas, fluidez e calma',
      category: 'casal',
      categoryLabel: 'Casais',
      image: '/images/MAHVfcjrWi4.png',
    },
    {
      id: 'foto-6',
      title: 'Abraço e Presença',
      subtitle: 'Memórias eternizadas com atmosfera acolhedora',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/MAHVfpo6jus.png',
    },
    {
      id: 'foto-7',
      title: 'Espontaneidade & Luz Natural',
      subtitle: 'Retratos com suavidade e elegância',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/MAGpRXordp0.jpg',
    },
    {
      id: 'foto-8',
      title: 'Sorrisos e Vínculos Reais',
      subtitle: 'Afeto capturado em cada detalhe',
      category: 'casal',
      categoryLabel: 'Família & Afeto',
      image: '/images/MAHVfUhpgiE.png',
    },
  ] as PortfolioItem[],
};

export const ABOUT_DATA = {
  title: 'Sobre Fátima Sampaio',
  quote: 'Olhar com calma. Fotografar com alma.',
  paragraphs: [
    'Há 29 anos, Fátima descobriu na fotografia uma forma de cuidar das histórias das pessoas.',
    'Seu olhar sensível e sua presença acolhedora transformam cada ensaio em um encontro leve e verdadeiro. Mais do que dirigir poses, Fátima cria espaço para que vínculos, personalidades e afetos apareçam naturalmente.',
    'É assim que cada fotografia se torna mais que uma imagem: torna-se parte da história de uma família.',
  ],
  stats: [
    { number: '29', label: 'Anos de história e dedicação' },
    { number: '+4.500', label: 'Histórias e famílias registradas' },
    { number: '100%', label: 'Direção acolhedora e personalizada' },
  ],
  portraitImage: '/images/MAHVftOqKzE.png',
  cutoutImage: '/images/fatima-cutout.png',
  tripeImage: '/images/tripe.png',
  tripodImage: '/images/tripe.png',
  gearImage: '/images/MAC8u3ItNkA.jpg',
  shadowImage: '/images/MAG-IX_smj4.png',
};

export const STUDIO_DATA = {
  title: 'nosso espaço.',
  subtitle:
    'Um estúdio pensado para desacelerar o tempo, acolher sua família e criar a iluminação perfeita para suas memórias.',
  mainImage: '/images/MAHVfiu6vqE.png',
  gearImage: '/images/MAC8u3ItNkA.jpg',
  studioBackstage: '/images/MAHVfrhMhgM.png',
  features: [
    {
      id: 'feat-1',
      title: 'Iluminação de Estúdio Impecável',
      description:
        'Equipamentos de padrão internacional e difusores que garantem suavidade na pele e realce nos olhares.',
      iconName: 'SunMedium',
    },
    {
      id: 'feat-2',
      title: 'Camarim & Espaço para Trocas',
      description:
        'Ambiente privativo com iluminação de maquiagem para você se arrumar com total conforto e tranquilidade.',
      iconName: 'Sparkles',
    },
    {
      id: 'feat-3',
      title: 'Ambiente Climatizado & Acolhedor',
      description:
        'Música suave, poltronas confortáveis e cafezinho fresco para uma experiência leve do começo ao fim.',
      iconName: 'Coffee',
    },
    {
      id: 'feat-4',
      title: 'Cenários Minimalistas & Atemporais',
      description:
        'Fundos neutros e texturas elegantes para que o foco continue sempre no que mais importa: você e sua história.',
      iconName: 'Camera',
    },
  ] as StudioFeature[],
};

export const BOOKING_DATA = {
  headlineTop: 'SERÁ UM PRAZER',
  headlineMiddle: 'TER A SUA PRESENÇA',
  headlineBottom: 'PARA FAZER UM ENSAIO CONOSCO!',
  featuredImage: '/images/MAGpRXordp0.jpg',
  sessionTypes: [
    'Ensaio de Casal (Pré-wedding / Aniversário)',
    'Ensaio Gestante & Família',
    'Retrato Pessoal & Posicionamento Profissional',
    'Ensaio em Estúdio com Fátima Sampaio',
    'Ensaio Externo ao Ar Livre',
  ],
};
