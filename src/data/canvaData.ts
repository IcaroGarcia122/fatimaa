import type { PortfolioItem, StudioFeature } from '../types';

export const BRAND = {
  name: 'Fatima Sampaio',
  tagline: 'ESPAÇO FOTOGRÁFICO',
  logo: '/images/logo.png',
  yearsOfExperience: 29,
  primaryColor: '#01590d',
  primaryColorHover: '#01450a',
  phone: '(44) 99924-2060',
  phoneClean: '5544999242060',
  email: 'fatimasampaio@gmail.com',
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
      title: 'Maternidade & Espera de Amor',
      subtitle: 'Ensaio acolhedor com luz suave e conexão profunda',
      category: 'detalhes',
      categoryLabel: 'Gestante',
      image: '/images/foto1.jpg',
    },
    {
      id: 'foto-2',
      title: 'Afeto & Conexão Genuína',
      subtitle: 'Momentos espontâneos de carinho e calma',
      category: 'casal',
      categoryLabel: 'Casais',
      image: '/images/foto2.jpg',
    },
    {
      id: 'foto-3',
      title: 'Histórias que Atravessam o Tempo',
      subtitle: 'Sensibilidade na direção e verdade no olhar',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/foto3.jpg',
    },
    {
      id: 'foto-4',
      title: 'Sutileza & Beleza Natural',
      subtitle: 'Retrato íntimo e atemporal em estúdio',
      category: 'detalhes',
      categoryLabel: 'Gestante',
      image: '/images/foto4.jpg',
    },
    {
      id: 'foto-5',
      title: 'Presença & Cumplicidade',
      subtitle: 'Vínculos familiares eternizados com alma',
      category: 'casal',
      categoryLabel: 'Família',
      image: '/images/foto5.jpg',
    },
    {
      id: 'foto-6',
      title: 'Abraço & Proteção',
      subtitle: 'Capturas leves sem poses forçadas',
      category: 'detalhes',
      categoryLabel: 'Família',
      image: '/images/foto6.jpg',
    },
    {
      id: 'foto-7',
      title: 'Expressões & Sensibilidade',
      subtitle: 'Luz acolhedora realçando cada detalhe',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/foto7.jpg',
    },
    {
      id: 'foto-8',
      title: 'Encontros de Amor',
      subtitle: 'Memórias eternizadas para sempre',
      category: 'casal',
      categoryLabel: 'Casais',
      image: '/images/foto8.jpg',
    },
    {
      id: 'foto-9',
      title: 'Doçura & Espera',
      subtitle: 'A poesia da vida que floresce',
      category: 'detalhes',
      categoryLabel: 'Gestante',
      image: '/images/foto9.jpg',
    },
    {
      id: 'foto-10',
      title: 'Vínculo que Transborda',
      subtitle: 'Espontaneidade e carinho em família',
      category: 'casal',
      categoryLabel: 'Família',
      image: '/images/foto10.jpg',
    },
    {
      id: 'foto-11',
      title: 'Olhares & Verdades',
      subtitle: 'Retratos com alma e aconchego',
      category: 'detalhes',
      categoryLabel: 'Retratos',
      image: '/images/foto11.jpg',
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
  cutoutImage: '/images/fatima. de 2026, 14_52_11.png',
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
  spaceImage1: '/images/espaco1.png',
  spaceImage2: '/images/espaco2.png',
  videoTour: '/videos/gmaps-video.mp4',
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
  featuredImage: '/images/foto1.jpg',
  portfolioPreviews: [
    { id: 'p1', image: '/images/foto1.jpg', label: 'Gestante' },
    { id: 'p2', image: '/images/foto2.jpg', label: 'Casal' },
    { id: 'p3', image: '/images/foto4.jpg', label: 'Maternidade' },
    { id: 'p4', image: '/images/foto5.jpg', label: 'Família' },
    { id: 'p5', image: '/images/foto8.jpg', label: 'Retrato' },
  ],
  sessionTypes: [
    'Ensaio Gestante & Maternidade',
    'Ensaio de Família & Vínculos',
    'Ensaio de Casal & Afeto',
    'Retrato Autoral & Posicionamento',
    'Ensaio em Estúdio com Fátima Sampaio',
    'Ensaio Externo ao Ar Livre',
  ],
};
