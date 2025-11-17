"use client";

import { useState } from 'react';
import { Team } from '@/lib/types';
import { TEAMS, TEAM_AVATARS } from '@/lib/constants';
import { Check, ChevronRight } from 'lucide-react';

interface TeamSelectorProps {
  onSelectTeam: (team: Team, avatar: string) => void;
  userData?: { name: string; email: string; username: string };
}

export default function TeamSelector({ onSelectTeam, userData }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const handleConfirm = () => {
    if (selectedTeam && selectedAvatar) {
      onSelectTeam(selectedTeam, selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
            {userData ? `Bem-vindo, ${userData.name.split(' ')[0]}! 👋` : 'Escolha seu Time ⚽'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Selecione seu time do coração e personalize seu avatar
          </p>
        </div>

        {/* Seleção de Time */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
              1
            </span>
            Escolha seu Time
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {TEAMS.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  setSelectedTeam(team);
                  setSelectedAvatar('');
                }}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedTeam?.id === team.id
                    ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                style={{
                  background: selectedTeam?.id === team.id
                    ? `linear-gradient(135deg, ${team.colors.primary}15, ${team.colors.secondary}15)`
                    : undefined
                }}
              >
                {selectedTeam?.id === team.id && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="text-center">
                  <div
                    className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})`
                    }}
                  >
                    {team.emoji}
                  </div>
                  <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
                    {team.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Seleção de Avatar */}
        {selectedTeam && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Escolha seu Avatar
            </h2>

            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {TEAM_AVATARS[selectedTeam.id].map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-110 ${
                    selectedAvatar === avatar
                      ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={{
                    background: selectedAvatar === avatar
                      ? `linear-gradient(135deg, ${selectedTeam.colors.primary}15, ${selectedTeam.colors.secondary}15)`
                      : undefined
                  }}
                >
                  {selectedAvatar === avatar && (
                    <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className="text-3xl sm:text-4xl text-center">{avatar}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botão de Confirmação */}
        {selectedTeam && selectedAvatar && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={handleConfirm}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Começar a Zoar
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
