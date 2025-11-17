import { Team } from './types';

// Times disponíveis no app
export const TEAMS: Team[] = [
  {
    id: 'flamengo',
    name: 'Flamengo',
    colors: { primary: '#E31937', secondary: '#000000' },
    emoji: '🔴⚫'
  },
  {
    id: 'palmeiras',
    name: 'Palmeiras',
    colors: { primary: '#006437', secondary: '#FFFFFF' },
    emoji: '🟢⚪'
  },
  {
    id: 'corinthians',
    name: 'Corinthians',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    emoji: '⚫⚪'
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo',
    colors: { primary: '#E31937', secondary: '#000000' },
    emoji: '🔴⚫⚪'
  },
  {
    id: 'santos',
    name: 'Santos',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    emoji: '⚫⚪'
  },
  {
    id: 'gremio',
    name: 'Grêmio',
    colors: { primary: '#0080C6', secondary: '#000000' },
    emoji: '🔵⚫⚪'
  },
  {
    id: 'internacional',
    name: 'Internacional',
    colors: { primary: '#D11F26', secondary: '#FFFFFF' },
    emoji: '🔴⚪'
  },
  {
    id: 'atletico-mg',
    name: 'Atlético-MG',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    emoji: '⚫⚪'
  },
  {
    id: 'cruzeiro',
    name: 'Cruzeiro',
    colors: { primary: '#003399', secondary: '#FFFFFF' },
    emoji: '🔵⚪'
  },
  {
    id: 'botafogo',
    name: 'Botafogo',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    emoji: '⚫⚪'
  },
  {
    id: 'vasco',
    name: 'Vasco',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    emoji: '⚫⚪'
  },
  {
    id: 'fluminense',
    name: 'Fluminense',
    colors: { primary: '#7A1E3B', secondary: '#006437' },
    emoji: '🟢🔴⚪'
  }
];

// Avatares temáticos por time - Mini Craques (jogadores de futebol)
export const TEAM_AVATARS: Record<string, string[]> = {
  flamengo: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  palmeiras: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  corinthians: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  'sao-paulo': ['⚽', '🥅', '🏃', '🦵', '🧤'],
  santos: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  gremio: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  internacional: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  'atletico-mg': ['⚽', '🥅', '🏃', '🦵', '🧤'],
  cruzeiro: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  botafogo: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  vasco: ['⚽', '🥅', '🏃', '🦵', '🧤'],
  fluminense: ['⚽', '🥅', '🏃', '🦵', '🧤']
};

// Avatares de jogadores reais gerados por IA (simulação)
export const AI_PLAYER_AVATARS: Record<string, string[]> = {
  flamengo: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  palmeiras: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  corinthians: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  'sao-paulo': [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  santos: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  gremio: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  internacional: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  'atletico-mg': [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  cruzeiro: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  botafogo: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  vasco: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ],
  fluminense: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop&q=80'
  ]
};

// E-mails autorizados para acesso ao painel Admin
export const ADMIN_EMAILS = [
  'admin@tiltfc.com',
  'moderador@tiltfc.com',
  'suporte@tiltfc.com'
];

// Memes de exemplo (simulação)
export const SAMPLE_MEMES = [
  {
    id: '1',
    caption: 'Quando seu time ganha de virada no último minuto! 🔥',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    caption: 'Aquela defesa impossível do goleiro! 🧤',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    caption: 'Gol de bicicleta! Que golaço! ⚽',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop'
  }
];
