/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Game } from '../types';

interface HeroProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export default function Hero({ game, onPlay }: HeroProps) {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10 group">
      <div className="absolute inset-0">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 p-8 sm:p-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full w-fit mb-8 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
          <span className="text-[10px] font-bold text-neon-green uppercase tracking-[0.3em]">System Featured</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display font-bold text-6xl sm:text-8xl mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40"
        >
          {game.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-xl max-w-xl mb-10 leading-relaxed font-sans"
        >
          {game.description}
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="flex items-center gap-4"
        >
          <button
            onClick={() => onPlay(game)}
            className="group relative flex items-center gap-3 bg-neon-green text-black px-10 py-5 rounded-2xl font-bold transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Play className="relative w-5 h-5 fill-current z-10" />
            <span className="relative z-10 tracking-widest uppercase">Initiate Session</span>
          </button>
          
          <div className="flex flex-col gap-1.5 ml-2">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-white/10 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" className="w-full h-full object-cover" />
                  </div>
               ))}
               <div className="w-9 h-9 rounded-full border-2 border-black bg-[#111] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-neon-green">+1.4k</span>
               </div>
            </div>
            <div className="flex items-center gap-1.5 px-2">
               <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">1,482 Active Sessions</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 hidden flex-col gap-4 lg:flex">
         <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Rating</span>
            <span className="text-2xl font-display font-bold">{game.rating}/5.0</span>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Genre</span>
            <span className="text-2xl font-display font-bold">{game.category}</span>
         </div>
      </div>
    </div>
  );
}
