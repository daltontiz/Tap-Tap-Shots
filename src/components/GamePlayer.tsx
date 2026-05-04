/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Maximize2, RotateCcw, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game | null;
  onClose: () => void;
}

export default function GamePlayer({ game, onClose }: GamePlayerProps) {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
      >
        <div className="flex items-center justify-between p-4 sm:px-8 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-4">
             <button
               onClick={onClose}
               className="p-2 hover:bg-white/10 rounded-full transition-colors group"
             >
               <X className="w-6 h-6 group-hover:text-neon-green transition-colors" />
             </button>
             <div>
                <h2 className="font-display font-bold text-lg leading-none">{game.title}</h2>
                <span className="text-[10px] text-neon-green uppercase tracking-widest font-medium">Live Activity</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium text-white/60">
               <RotateCcw className="w-4 h-4" />
               <span className="hidden sm:inline">RESTART</span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium text-white/60">
               <Share2 className="w-4 h-4" />
               <span className="hidden sm:inline">SHARE</span>
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button className="p-2 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-lg transition-colors flex items-center gap-2 text-xs font-bold">
               <Maximize2 className="w-4 h-4" />
               <span className="hidden sm:inline">FULLSCREEN</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-black flex items-center justify-center p-4">
           {/* In a real scenario, this would be an iframe. 
               For this demo, we'll use a styled container to represent the game view. */}
           <div className="relative w-full h-full max-w-6xl aspect-video glass-morphism rounded-2xl overflow-hidden shadow-2xl border border-white/5 cyber-grid">
              <iframe
                src={game.url}
                className="w-full h-full border-none"
                title={game.title}
                allow="autoplay; fullscreen; keyboard"
                sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation"
              />
              {/* Fallback overlay if iframe fails or for aesthetic */}
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl" />
           </div>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/10 text-center">
           <p className="text-sm text-white/40">
             Tip: Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">F</kbd> for Fullscreen mode or <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">ESC</kbd> to quit.
           </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
