// Tipos do Tilt FC

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
  email: string;
  username: string;
  team: Team;
  avatar: string;
  points: number;
  bio?: string;
  phone?: string;
}

export interface Meme {
  id: string;
  userId: string;
  userName: string;
  userTeam: Team;
  imageUrl: string;
  caption: string;
  votes: number;
  timestamp: Date;
  voters: string[];
  dislikers?: string[];
}

export interface Battle {
  id: string;
  team1: Team;
  team2: Team;
  votes1: number;
  votes2: number;
  voters: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userTeam: Team;
  text: string;
  timestamp: Date;
}
