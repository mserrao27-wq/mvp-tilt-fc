"use client";

import { Battle, Team } from '@/lib/types';
import { useState } from 'react';
import { MessageCircle, Trophy } from 'lucide-react';

interface BattleModeProps {
  userTeam: Team;
  onVote: (battleId: string, teamId: string) => void;
}

export default function BattleMode({ userTeam, onVote }: BattleModeProps) {
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [comment, setComment] = useState('');

  // Simulação de batalha
  const mockBattle: Battle = {
    id: '1',
    team1: { id: 'flamengo', name: 'Flamengo', colors: { primary: '#E31937', secondary: '#000000' }, emoji: '🔴⚫' },
    team2: { id: 'palmeiras', name: 'Palmeiras', colors: { primary: '#006437', secondary: '#FFFFFF' }, emoji: '🟢⚪' },
    votes1: 156,
    votes2: 142,
    voters: [],
    comments: [
      {
        id: '1',
        userId: '1',
        userName: 'Torcedor Apaixonado',
        userTeam: { id: 'flamengo', name: 'Flamengo', colors: { primary: '#E31937', secondary: '#000000' }, emoji: '🔴⚫' },
        text: 'Vai Mengão! 🔥',
        timestamp: new Date()
      },
      {
        id: '2',
        userId: '2',
        userName: 'Palmeirense Raiz',
        userTeam: { id: 'palmeiras', name: 'Palmeiras', colors: { primary: '#006437', secondary: '#FFFFFF' }, emoji: '🟢⚪' },
        text: 'Avanti Palestra! 💚',
        timestamp: new Date()
      }
    ]
  };

  const handleVote = (teamId: string) => {
    onVote(mockBattle.id, teamId);
  };

  const total = mockBattle.votes1 + mockBattle.votes2;
  const percentage1 = total > 0 ? (mockBattle.votes1 / total) * 100 : 50;
  const percentage2 = total > 0 ? (mockBattle.votes2 / total) * 100 : 50;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Modo Clássico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Vote no seu time favorito neste confronto!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Confronto */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4 items-center mb-6">
            {/* Time 1 */}
            <button
              onClick={() => handleVote(mockBattle.team1.id)}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${mockBattle.team1.colors.primary}20, ${mockBattle.team1.colors.secondary}20)`
              }}
            >
              <div className="text-5xl sm:text-6xl">{mockBattle.team1.emoji}</div>
              <div className="font-bold text-sm sm:text-base text-center">
                {mockBattle.team1.name}
              </div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: mockBattle.team1.colors.primary }}>
                {mockBattle.votes1}
              </div>
            </button>

            {/* VS */}
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-400">VS</div>
            </div>

            {/* Time 2 */}
            <button
              onClick={() => handleVote(mockBattle.team2.id)}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${mockBattle.team2.colors.primary}20, ${mockBattle.team2.colors.secondary}20)`
              }}
            >
              <div className="text-5xl sm:text-6xl">{mockBattle.team2.emoji}</div>
              <div className="font-bold text-sm sm:text-base text-center">
                {mockBattle.team2.name}
              </div>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: mockBattle.team2.colors.primary }}>
                {mockBattle.votes2}
              </div>
            </button>
          </div>

          {/* Barra de progresso */}
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
            <div
              className="absolute left-0 top-0 h-full transition-all duration-500"
              style={{
                width: `${percentage1}%`,
                background: `linear-gradient(90deg, ${mockBattle.team1.colors.primary}, ${mockBattle.team1.colors.secondary})`
              }}
            />
            <div
              className="absolute right-0 top-0 h-full transition-all duration-500"
              style={{
                width: `${percentage2}%`,
                background: `linear-gradient(90deg, ${mockBattle.team2.colors.secondary}, ${mockBattle.team2.colors.primary})`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold text-sm">
              <span>{percentage1.toFixed(0)}%</span>
              <span>{percentage2.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Comentários */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 sm:p-8 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comentários ({mockBattle.comments.length})
          </h3>

          <div className="space-y-4 mb-4">
            {mockBattle.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${comment.userTeam.colors.primary}, ${comment.userTeam.colors.secondary})`
                  }}
                >
                  {comment.userTeam.emoji}
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-3">
                  <div className="font-bold text-sm text-gray-800 dark:text-gray-200">
                    {comment.userName}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {comment.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Adicione um comentário respeitoso..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition-all duration-300"
              onClick={() => setComment('')}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
