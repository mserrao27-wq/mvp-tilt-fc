// Tipos do aplicativo Tilt FC

export interface Team {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  emoji: string;
}

export interface User {
  id: string;
  name: string;
  fullName: string;
  age: number;
  email: string;
  phone: string;
  team: Team;
  avatar: string;
  profilePhoto?: string; // URL da foto de perfil
  isAdmin?: boolean;
  emailVerified?: boolean;
  createdAt: Date;
}

export interface Meme {
  id: string;
  userId: string;
  userName: string;
  userTeam: string;
  userAvatar: string;
  caption: string;
  imageUrl: string;
  votes: number;
  timestamp: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Date;
}

export interface Battle {
  id: string;
  team1: Team;
  team2: Team;
  votes: {
    team1: number;
    team2: number;
  };
  comments: Comment[];
  status: 'active' | 'finished';
}

export interface RegisterForm {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  team: Team | null;
  avatarType: 'emoji' | 'photo' | 'ai';
  selectedAvatar: string;
  profilePhoto?: string;
}
