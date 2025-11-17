'use client';

import { useState } from 'react';
import { TEAMS, TEAM_AVATARS, AI_PLAYER_AVATARS, ADMIN_EMAILS, SAMPLE_MEMES } from '@/lib/constants';
import { Team, User, Meme, Battle, RegisterForm } from '@/lib/types';
import { Plus, Trophy, Flame, Settings, Users, BarChart3, Shield, Upload, Mail, Lock, User as UserIcon, Phone, Calendar, Camera } from 'lucide-react';

export default function TiltFC() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'feed' | 'battle' | 'admin'>('feed');
  const [showRegister, setShowRegister] = useState(false);
  const [registerStep, setRegisterStep] = useState<'form' | 'team' | 'avatar' | 'verify'>(showRegister ? 'form' : 'team');
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    team: null,
    avatarType: 'emoji',
    selectedAvatar: '',
    profilePhoto: undefined
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [memes, setMemes] = useState<Meme[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Torcedor Rubro-Negro',
      userTeam: 'Flamengo',
      userAvatar: '⚽',
      caption: 'Quando seu time ganha de virada no último minuto! 🔥',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop',
      votes: 42,
      timestamp: new Date(),
      comments: []
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Palmeirense Raiz',
      userTeam: 'Palmeiras',
      userAvatar: '🧤',
      caption: 'Aquela defesa impossível do goleiro! 🧤',
      imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop',
      votes: 38,
      timestamp: new Date(),
      comments: []
    }
  ]);
  const [showMemeForm, setShowMemeForm] = useState(false);
  const [newMemeCaption, setNewMemeCaption] = useState('');
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);

  // Validar formulário de registro
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!registerForm.fullName.trim() || registerForm.fullName.length < 3) {
      errors.fullName = 'Nome completo deve ter pelo menos 3 caracteres';
    }

    const age = parseInt(registerForm.age);
    if (!registerForm.age || isNaN(age) || age < 13 || age > 120) {
      errors.age = 'Idade deve estar entre 13 e 120 anos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      errors.email = 'E-mail inválido';
    }

    const phoneRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
    if (!phoneRegex.test(registerForm.phone.replace(/\s/g, ''))) {
      errors.phone = 'Telefone inválido (ex: (11) 99999-9999)';
    }

    if (registerForm.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Avançar para próximo passo do registro
  const handleNextStep = () => {
    if (registerStep === 'form') {
      if (validateForm()) {
        setRegisterStep('team');
      }
    } else if (registerStep === 'team') {
      if (registerForm.team) {
        setRegisterStep('avatar');
      }
    } else if (registerStep === 'avatar') {
      if (registerForm.selectedAvatar || registerForm.profilePhoto) {
        // Gerar código de verificação (simulação)
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        setRegisterStep('verify');
        // Simular envio de e-mail
        console.log(`Código de verificação enviado para ${registerForm.email}: ${code}`);
      }
    }
  };

  // Verificar código e completar registro
  const handleVerifyEmail = () => {
    if (verificationCode === generatedCode) {
      const isAdmin = ADMIN_EMAILS.includes(registerForm.email.toLowerCase());
      const newUser: User = {
        id: Date.now().toString(),
        name: registerForm.fullName.split(' ')[0],
        fullName: registerForm.fullName,
        age: parseInt(registerForm.age),
        email: registerForm.email,
        phone: registerForm.phone,
        team: registerForm.team!,
        avatar: registerForm.selectedAvatar,
        profilePhoto: registerForm.profilePhoto,
        isAdmin,
        emailVerified: true,
        createdAt: new Date()
      };
      setUser(newUser);
      setSelectedAvatar(registerForm.selectedAvatar);
      setShowRegister(false);
      setRegisterStep('form');
    } else {
      setFormErrors({ verification: 'Código inválido' });
    }
  };

  // Selecionar time no registro
  const handleTeamSelect = (team: Team) => {
    setRegisterForm({ ...registerForm, team });
  };

  // Selecionar tipo de avatar
  const handleAvatarTypeSelect = (type: 'emoji' | 'photo' | 'ai') => {
    setRegisterForm({ ...registerForm, avatarType: type, selectedAvatar: '', profilePhoto: undefined });
  };

  // Selecionar avatar emoji
  const handleEmojiAvatarSelect = (avatar: string) => {
    setRegisterForm({ ...registerForm, selectedAvatar: avatar });
  };

  // Selecionar avatar de IA
  const handleAIAvatarSelect = (avatarUrl: string) => {
    setRegisterForm({ ...registerForm, selectedAvatar: avatarUrl });
  };

  // Simular upload de foto
  const handlePhotoUpload = () => {
    // Simulação de upload - em produção, usar API real
    const photoUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
    setRegisterForm({ ...registerForm, profilePhoto: photoUrl, selectedAvatar: photoUrl });
  };

  // Trocar avatar (usuário logado)
  const handleAvatarChange = (avatar: string) => {
    if (user) {
      setUser({ ...user, avatar });
      setSelectedAvatar(avatar);
    }
  };

  // Votar em meme
  const handleVote = (memeId: string) => {
    setMemes(memes.map(meme =>
      meme.id === memeId ? { ...meme, votes: meme.votes + 1 } : meme
    ));
  };

  // Postar meme
  const handlePostMeme = () => {
    if (!newMemeCaption.trim() || !user) return;

    const newMeme: Meme = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userTeam: user.team.name,
      userAvatar: user.avatar,
      caption: newMemeCaption,
      imageUrl: SAMPLE_MEMES[Math.floor(Math.random() * SAMPLE_MEMES.length)].imageUrl,
      votes: 0,
      timestamp: new Date(),
      comments: []
    };

    setMemes([newMeme, ...memes]);
    setNewMemeCaption('');
    setShowMemeForm(false);
  };

  // Criar batalha
  const handleCreateBattle = (team1: Team, team2: Team) => {
    const battle: Battle = {
      id: Date.now().toString(),
      team1,
      team2,
      votes: { team1: 0, team2: 0 },
      comments: [],
      status: 'active'
    };
    setSelectedBattle(battle);
  };

  // Votar em batalha
  const handleBattleVote = (team: 'team1' | 'team2') => {
    if (!selectedBattle) return;
    setSelectedBattle({
      ...selectedBattle,
      votes: {
        ...selectedBattle.votes,
        [team]: selectedBattle.votes[team] + 1
      }
    });
  };

  // Tela de registro
  if (!user || showRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
              ⚽ TILT FC
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              {registerStep === 'form' && 'Crie sua conta'}
              {registerStep === 'team' && 'Escolha seu time'}
              {registerStep === 'avatar' && 'Personalize seu avatar'}
              {registerStep === 'verify' && 'Verifique seu e-mail'}
            </p>
          </div>

          {/* Formulário de dados pessoais */}
          {registerStep === 'form' && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="space-y-4">
                {/* Nome completo */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <UserIcon size={20} />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    placeholder="João Silva"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Idade */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Calendar size={20} />
                    Idade
                  </label>
                  <input
                    type="number"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                    placeholder="18"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.age && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
                  )}
                </div>

                {/* E-mail */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Mail size={20} />
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="joao@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Phone size={20} />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Senha */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Lock size={20} />
                    Senha
                  </label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
                </div>

                {/* Confirmar senha */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Lock size={20} />
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    placeholder="Digite a senha novamente"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg mt-6"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Seleção de time */}
          {registerStep === 'team' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {TEAMS.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    className={`bg-white rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all duration-300 ${
                      registerForm.team?.id === team.id ? 'ring-4 ring-yellow-400' : ''
                    }`}
                    style={{
                      borderTop: `6px solid ${team.colors.primary}`,
                      borderBottom: `6px solid ${team.colors.secondary}`
                    }}
                  >
                    <div className="text-4xl mb-3">{team.emoji}</div>
                    <h3 className="font-bold text-gray-800 text-lg">{team.name}</h3>
                  </button>
                ))}
              </div>
              {registerForm.team && (
                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  Continuar
                </button>
              )}
            </div>
          )}

          {/* Seleção de avatar */}
          {registerStep === 'avatar' && registerForm.team && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Escolha seu avatar
              </h3>

              {/* Tipos de avatar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleAvatarTypeSelect('emoji')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    registerForm.avatarType === 'emoji'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">⚽</div>
                  <p className="font-semibold text-sm">Mini Craque</p>
                </button>
                <button
                  onClick={() => handleAvatarTypeSelect('ai')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    registerForm.avatarType === 'ai'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="font-semibold text-sm">Jogador IA</p>
                </button>
                <button
                  onClick={() => handleAvatarTypeSelect('photo')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    registerForm.avatarType === 'photo'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">📷</div>
                  <p className="font-semibold text-sm">Sua Foto</p>
                </button>
              </div>

              {/* Avatares emoji */}
              {registerForm.avatarType === 'emoji' && (
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {TEAM_AVATARS[registerForm.team.id].map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => handleEmojiAvatarSelect(avatar)}
                      className={`w-full aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                        registerForm.selectedAvatar === avatar
                          ? 'ring-4 ring-blue-500 scale-110'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: registerForm.selectedAvatar === avatar ? registerForm.team.colors.primary : undefined
                      }}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              )}

              {/* Avatares de IA */}
              {registerForm.avatarType === 'ai' && (
                <div>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    Avatares de jogadores do {registerForm.team.name} gerados por IA
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {AI_PLAYER_AVATARS[registerForm.team.id].map((avatarUrl, index) => (
                      <button
                        key={index}
                        onClick={() => handleAIAvatarSelect(avatarUrl)}
                        className={`rounded-xl overflow-hidden transition-all ${
                          registerForm.selectedAvatar === avatarUrl
                            ? 'ring-4 ring-blue-500 scale-105'
                            : 'hover:scale-105'
                        }`}
                      >
                        <img
                          src={avatarUrl}
                          alt={`Jogador ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload de foto */}
              {registerForm.avatarType === 'photo' && (
                <div className="mb-6">
                  {!registerForm.profilePhoto ? (
                    <button
                      onClick={handlePhotoUpload}
                      className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <Camera size={48} className="mx-auto mb-3 text-gray-400" />
                      <p className="font-semibold text-gray-600">Clique para fazer upload</p>
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG ou GIF (máx. 5MB)</p>
                    </button>
                  ) : (
                    <div className="text-center">
                      <img
                        src={registerForm.profilePhoto}
                        alt="Preview"
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-500"
                      />
                      <button
                        onClick={handlePhotoUpload}
                        className="text-blue-500 font-semibold hover:underline"
                      >
                        Trocar foto
                      </button>
                    </div>
                  )}
                </div>
              )}

              {(registerForm.selectedAvatar || registerForm.profilePhoto) && (
                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  Continuar
                </button>
              )}
            </div>
          )}

          {/* Verificação de e-mail */}
          {registerStep === 'verify' && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <Mail size={64} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Verifique seu e-mail
                </h3>
                <p className="text-gray-600">
                  Enviamos um código de 6 dígitos para<br />
                  <span className="font-semibold">{registerForm.email}</span>
                </p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Modo de demonstração:</strong> Use o código <strong>{generatedCode}</strong>
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all text-center text-2xl font-bold tracking-widest"
                  maxLength={6}
                />
                {formErrors.verification && (
                  <p className="text-red-500 text-sm mt-2 text-center">{formErrors.verification}</p>
                )}
              </div>

              <button
                onClick={handleVerifyEmail}
                disabled={verificationCode.length !== 6}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verificar e Entrar
              </button>

              <button
                onClick={() => console.log('Reenviar código')}
                className="w-full mt-4 text-blue-500 font-semibold hover:underline"
              >
                Reenviar código
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header fixo */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b-4 shadow-2xl"
        style={{ borderColor: user.team.colors.primary }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg overflow-hidden"
                style={{ backgroundColor: user.team.colors.primary }}
              >
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : user.avatar.startsWith('http') ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.avatar
                )}
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">{user.name}</h2>
                <p className="text-sm text-white/70">{user.team.name}</p>
              </div>
            </div>

            {/* Seletor de avatar */}
            <div className="flex gap-2">
              {TEAM_AVATARS[user.team.id].map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => handleAvatarChange(avatar)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    selectedAvatar === avatar
                      ? 'ring-4 ring-white scale-110'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: user.team.colors.secondary }}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Navegação por abas */}
      <div className="sticky top-[88px] z-40 bg-black/60 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 py-3 px-4 font-bold transition-all ${
                activeTab === 'feed'
                  ? 'text-white border-b-4'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{ borderColor: activeTab === 'feed' ? user.team.colors.primary : 'transparent' }}
            >
              <Flame className="inline mr-2" size={20} />
              Feed
            </button>
            <button
              onClick={() => setActiveTab('battle')}
              className={`flex-1 py-3 px-4 font-bold transition-all ${
                activeTab === 'battle'
                  ? 'text-white border-b-4'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{ borderColor: activeTab === 'battle' ? user.team.colors.primary : 'transparent' }}
            >
              <Trophy className="inline mr-2" size={20} />
              Modo Clássico
            </button>
            {user.isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-3 px-4 font-bold transition-all ${
                  activeTab === 'admin'
                    ? 'text-white border-b-4'
                    : 'text-white/50 hover:text-white/80'
                }`}
                style={{ borderColor: activeTab === 'admin' ? user.team.colors.primary : 'transparent' }}
              >
                <Shield className="inline mr-2" size={20} />
                Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
        {/* Feed de Memes */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              >
                {/* Header do meme */}
                <div className="p-4 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{
                      backgroundColor: TEAMS.find(t => t.name === meme.userTeam)?.colors.primary
                    }}
                  >
                    {meme.userAvatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{meme.userName}</h3>
                    <p className="text-sm text-white/60">{meme.userTeam}</p>
                  </div>
                </div>

                {/* Imagem */}
                <img
                  src={meme.imageUrl}
                  alt={meme.caption}
                  className="w-full h-64 object-cover"
                />

                {/* Caption e ações */}
                <div className="p-4">
                  <p className="text-white mb-4">{meme.caption}</p>
                  <button
                    onClick={() => handleVote(meme.id)}
                    className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    🔥 {meme.votes} Zoeiras
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modo Clássico */}
        {activeTab === 'battle' && (
          <div>
            {!selectedBattle ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Criar Batalha Clássica</h2>
                <div className="grid grid-cols-2 gap-4">
                  {TEAMS.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        const opponent = TEAMS.find(t => t.id !== team.id && t.id !== user.team.id);
                        if (opponent) handleCreateBattle(team, opponent);
                      }}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-all border border-white/20"
                    >
                      <div className="text-3xl mb-2">{team.emoji}</div>
                      <h3 className="font-bold text-white">{team.name}</h3>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Batalha Clássica</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => handleBattleVote('team1')}
                    className="bg-white/20 rounded-xl p-6 hover:scale-105 transition-all"
                    style={{ borderTop: `4px solid ${selectedBattle.team1.colors.primary}` }}
                  >
                    <div className="text-4xl mb-3">{selectedBattle.team1.emoji}</div>
                    <h3 className="font-bold text-white text-xl mb-2">{selectedBattle.team1.name}</h3>
                    <p className="text-3xl font-black text-white">{selectedBattle.votes.team1}</p>
                  </button>
                  <button
                    onClick={() => handleBattleVote('team2')}
                    className="bg-white/20 rounded-xl p-6 hover:scale-105 transition-all"
                    style={{ borderTop: `4px solid ${selectedBattle.team2.colors.primary}` }}
                  >
                    <div className="text-4xl mb-3">{selectedBattle.team2.emoji}</div>
                    <h3 className="font-bold text-white text-xl mb-2">{selectedBattle.team2.name}</h3>
                    <p className="text-3xl font-black text-white">{selectedBattle.votes.team2}</p>
                  </button>
                </div>
                <button
                  onClick={() => setSelectedBattle(null)}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
                >
                  Encerrar Batalha
                </button>
              </div>
            )}
          </div>
        )}

        {/* Painel de Administrador */}
        {activeTab === 'admin' && user.isAdmin && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield size={32} />
              Painel de Administrador
            </h2>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 shadow-2xl">
                <Users className="mb-3" size={32} color="white" />
                <h3 className="text-white/80 text-sm font-semibold mb-1">Total de Usuários</h3>
                <p className="text-4xl font-black text-white">1,247</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 shadow-2xl">
                <Flame className="mb-3" size={32} color="white" />
                <h3 className="text-white/80 text-sm font-semibold mb-1">Memes Postados</h3>
                <p className="text-4xl font-black text-white">{memes.length}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl">
                <Trophy className="mb-3" size={32} color="white" />
                <h3 className="text-white/80 text-sm font-semibold mb-1">Batalhas Ativas</h3>
                <p className="text-4xl font-black text-white">23</p>
              </div>
            </div>

            {/* Gerenciamento de Conteúdo */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={24} />
                Memes Mais Votados
              </h3>
              <div className="space-y-3">
                {[...memes].sort((a, b) => b.votes - a.votes).slice(0, 5).map((meme, index) => (
                  <div
                    key={meme.id}
                    className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-white/50">#{index + 1}</span>
                      <div>
                        <p className="text-white font-semibold">{meme.caption.substring(0, 50)}...</p>
                        <p className="text-white/60 text-sm">{meme.userName} • {meme.userTeam}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-400">{meme.votes}</p>
                      <p className="text-white/60 text-sm">votos</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações de Moderação */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings size={24} />
                Ações de Moderação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                  Aprovar Memes Pendentes
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                  Remover Conteúdo Impróprio
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                  Gerenciar Usuários
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                  Configurações do App
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Botão fixo de postar meme (apenas no feed) */}
      {activeTab === 'feed' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-6">
          <div className="max-w-4xl mx-auto">
            {!showMemeForm ? (
              <button
                onClick={() => setShowMemeForm(true)}
                className="w-full bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                <Plus size={24} />
                Postar Meme
              </button>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
                <textarea
                  value={newMemeCaption}
                  onChange={(e) => setNewMemeCaption(e.target.value)}
                  placeholder="Escreva sua zoeira aqui... 🔥"
                  className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl p-4 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handlePostMeme}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Publicar
                  </button>
                  <button
                    onClick={() => {
                      setShowMemeForm(false);
                      setNewMemeCaption('');
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
