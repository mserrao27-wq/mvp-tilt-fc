"use client";

import { Meme } from '@/lib/types';
import { Heart, MessageCircle, Share2, ThumbsDown } from 'lucide-react';

interface MemeCardProps {
  meme: Meme;
  onVote: (memeId: string, voteType: 'like' | 'dislike') => void;
  hasLiked: boolean;
  hasDisliked: boolean;
}

export default function MemeCard({ meme, onVote, hasLiked, hasDisliked }: MemeCardProps) {
  return (
    <div>
      {/* Ações */}
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={() => onVote(meme.id, 'like')}
          className={`flex items-center gap-2 transition-all duration-300 ${
            hasLiked
              ? 'text-red-500 scale-110'
              : 'text-gray-700 dark:text-gray-300 hover:text-red-500 hover:scale-110'
          }`}
        >
          <Heart className={`w-7 h-7 ${hasLiked ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={() => onVote(meme.id, 'dislike')}
          className={`flex items-center gap-2 transition-all duration-300 ${
            hasDisliked
              ? 'text-blue-500 scale-110'
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110'
          }`}
        >
          <ThumbsDown className={`w-7 h-7 ${hasDisliked ? 'fill-current' : ''}`} />
        </button>

        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-7 h-7" />
        </button>

        <button className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-all duration-300 hover:scale-110">
          <Share2 className="w-7 h-7" />
        </button>
      </div>

      {/* Curtidas */}
      <p className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2">
        {meme.votes} {meme.votes === 1 ? 'curtida' : 'curtidas'}
      </p>

      {/* Caption */}
      <p className="text-sm text-gray-800 dark:text-gray-200">
        <span className="font-bold">{meme.userName}</span> {meme.caption}
      </p>

      {/* Timestamp */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        há {Math.floor(Math.random() * 24)} horas
      </p>
    </div>
  );
}
