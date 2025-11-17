"use client";

import { useState } from 'react';
import { Team, User, Meme } from '@/lib/types';
import { SAMPLE_MEMES } from '@/lib/constants';
import SignUp from './components/SignUp';
import TeamSelector from './components/TeamSelector';
import MemeCard from './components/MemeCard';
import BattleMode from './components/BattleMode';
import ProfilePage from './components/ProfilePage';
import CreateMemeModal from './components/CreateMemeModal';
import { Home, Trophy, LogOut, User as UserIcon, PlusCircle } from 'lucide-react';

export default function TiltFC() {
  const [authStep, setAuthStep] = useState<'signup' | 'team' | 'complete'>('signup');
  const [userData, setUserData] = useState<{ name: string; email: string; username: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'battle' | 'profile'>('feed');
  const [showCreateMeme, setShowCreateMeme] = useState(false);
  const [memes, setMemes] = useState<Meme[]>(
    SAMPLE_MEMES.map((sample, index) => ({
      id: sample.id,
      userId: `user${index}`,
      userName: `Torcedor ${index + 1}`,
      userTeam: {
        id: 'flamengo',
        name: 'Flamengo',
        colors: { primary: '#E31937', secondary: '#000000' },
        emoji: '🔴⚫'
      },
      imageUrl: sample.imageUrl,
      caption: sample.caption,
      votes: Math.floor(Math.random() * 100),
      timestamp: new Date(),
      voters: [],
      dislikers: []
    }))
  );

  const handleSignUpComplete = (data: { name: string; email: string; username: string }) => {
    setUserData(data);
    setAuthStep('team');
  };

  const handleSelectTeam = (team: Team, avatar: string) => {
    if (!userData) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      username: userData.username,
      team,
      avatar,
      points: 0,
      bio: '',
      phone: ''
    };
    setUser(newUser);
    setAuthStep('complete');
  };

  const handleVoteMeme = (memeId: string, voteType: 'like' | 'dislike') => {
    if (!user) return;

    setMemes(prevMemes =>
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          const hasLiked = meme.voters.includes(user.id);
          const hasDisliked = meme.dislikers?.includes(user.id);

          if (voteType === 'like') {
            if (hasLiked) {
              // Remove like
              return {
                ...meme,
                votes: meme.votes - 1,
                voters: meme.voters.filter(id => id !== user.id)
              };
            } else {
              // Add like, remove dislike if exists
              return {
                ...meme,
                votes: meme.votes + 1 + (hasDisliked ? 1 : 0),
                voters: [...meme.voters, user.id],
                dislikers: meme.dislikers?.filter(id => id !== user.id) || []
              };
            }
          } else {
            // dislike
            if (hasDisliked) {
              // Remove dislike
              return {
                ...meme,
                votes: meme.votes + 1,
                dislikers: meme.dislikers?.filter(id => id !== user.id) || []
              };
            } else {
              // Add dislike, remove like if exists
              return {
                ...meme,
                votes: meme.votes - 1 - (hasLiked ? 1 : 0),
                voters: meme.voters.filter(id => id !== user.id),
                dislikers: [...(meme.dislikers || []), user.id]
              };
            }
          }
        }
        return meme;
      })
    );
  };

  const handleCreateMeme = (imageUrl: string, caption: string) => {
    if (!user) return;

    const newMeme: Meme = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userTeam: user.team,
      imageUrl,
      caption,
      votes: 0,
      timestamp: new Date(),
      voters: [],
      dislikers: []
    };

    setMemes(prev => [newMeme, ...prev]);
    setShowCreateMeme(false);
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const handleVoteBattle = (battleId: string, teamId: string) => {
    console.log('Voto registrado:', battleId, teamId);
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(null);
    setAuthStep('signup');
    setActiveTab('feed');
  };

  // Tela de Cadastro
  if (authStep === 'signup') {
    return <SignUp onSignUpComplete={handleSignUpComplete} />;
  }

  // Tela de Seleção de Time
  if (authStep === 'team') {
    return <TeamSelector onSelectTeam={handleSelectTeam} userData={userData || undefined} />;
  }

  // App Principal
  if (!user) return null;

  // Filtrar memes do time do usuário para personalização
  const personalizedMemes = memes.filter(meme => meme.userTeam.id === user.team.id);
  const otherMemes = memes.filter(meme => meme.userTeam.id !== user.team.id);
  const feedMemes = [...personalizedMemes, ...otherMemes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Tilt FC
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${user.team.colors.primary}, ${user.team.colors.secondary})`
                  }}
                >
                  {user.avatar}
                </div>
                <span className="hidden sm:inline font-bold text-sm text-gray-800 dark:text-gray-200">
                  @{user.username}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-[61px] z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-bold transition-all duration-300 border-b-2 ${
                activeTab === 'feed'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('battle')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-bold transition-all duration-300 border-b-2 ${
                activeTab === 'battle'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden sm:inline">Batalhas</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-bold transition-all duration-300 border-b-2 ${
                activeTab === 'profile'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Perfil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {activeTab === 'feed' ? (
          <div className="space-y-6">
            {feedMemes.map((meme) => (
              <div key={meme.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header do Post */}
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${meme.userTeam.colors.primary}, ${meme.userTeam.colors.secondary})`
                    }}
                  >
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{meme.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{meme.userTeam.name}</p>
                  </div>
                </div>

                {/* Imagem do Meme */}
                <img
                  src={meme.imageUrl}
                  alt={meme.caption}
                  className="w-full aspect-square object-cover"
                />

                {/* Ações e Caption */}
                <div className="p-4">
                  <MemeCard
                    meme={meme}
                    onVote={handleVoteMeme}
                    hasLiked={meme.voters.includes(user.id)}
                    hasDisliked={meme.dislikers?.includes(user.id) || false}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'battle' ? (
          <BattleMode userTeam={user.team} onVote={handleVoteBattle} />
        ) : (
          <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />
        )}
      </main>

      {/* Botão Fixo de Postar */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowCreateMeme(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <PlusCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Modal de Criar Meme */}
      {showCreateMeme && (
        <CreateMemeModal
          onClose={() => setShowCreateMeme(false)}
          onCreateMeme={handleCreateMeme}
          userTeam={user.team}
        />
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 sm:hidden z-40">
        <div className="flex justify-around items-center py-3">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'feed' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('battle')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'battle' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs font-medium">Batalhas</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'profile' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
