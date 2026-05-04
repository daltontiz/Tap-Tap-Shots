/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-neon-green/30 hover:shadow-[0_0_30px_rgba(0,255,0,0.1)]"
      onClick={() => onPlay(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-neon-green/90 drop-shadow-lg" />
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold">{game.rating}</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-neon-green/20 backdrop-blur-md rounded-lg border border-neon-green/30">
          <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest">{game.category}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-bold text-lg group-hover:text-neon-green transition-colors leading-tight mb-1">
          {game.title}
        </h3>
        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-neon-green transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}
