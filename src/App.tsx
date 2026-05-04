/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { GAMES, CATEGORIES } from './constants';
import { Game } from './types';
import { Filter, Layers } from 'lucide-react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const featuredGame = useMemo(() => GAMES.length > 0 ? (GAMES.find(g => g.isFeatured) || GAMES[0]) : null, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen font-sans selection:bg-neon-green selection:text-black relative overflow-x-hidden">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-neon-green"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="font-display font-bold text-xs tracking-widest text-white animate-pulse">BOOTING</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise" />
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-8">
        {!searchQuery && selectedCategory === 'All' && featuredGame && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Hero game={featuredGame} onPlay={setActiveGame} />
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-cyber-blue/10 rounded-2xl flex items-center justify-center border border-cyber-blue/20">
                <Layers className="w-6 h-6 text-cyber-blue" />
             </div>
             <div>
                <h2 className="font-display font-bold text-3xl tracking-tight">Game Archive</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">{filteredGames.length} Missions Active</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto invisible-scrollbar">
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap border uppercase tracking-widest
                  ${selectedCategory === category 
                    ? 'bg-neon-green text-black border-neon-green shadow-[0_0_20px_rgba(0,255,0,0.15)] scale-105' 
                    : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'}
                `}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GameCard 
                  game={game} 
                  onPlay={setActiveGame} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Layers className="w-16 h-16 text-white/10 mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">No games found</h3>
            <p className="text-white/40 max-w-xs">We couldn't find any games matching your current search or filters.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-6 text-neon-green font-bold text-sm hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 sm:px-8 border-t border-white/5 mt-20">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 grayscale brightness-200 opacity-20">
              <span className="font-display font-bold text-2xl tracking-tighter">TAP TAP</span>
              <span className="font-display font-medium text-[10px] tracking-widest uppercase">Shots</span>
            </div>
            
            <div className="flex gap-8 text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-neon-green transition-colors">Safety</a>
               <a href="#" className="hover:text-neon-green transition-colors">Privacy</a>
               <a href="#" className="hover:text-neon-green transition-colors">Developers</a>
               <a href="#" className="hover:text-neon-green transition-colors">Discord</a>
            </div>

            <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">
              © 2026 TAP TAP SHOTS ENTERTAINMENT
            </p>
         </div>
      </footer>

      <GamePlayer 
        game={activeGame} 
        onClose={() => setActiveGame(null)} 
      />
      </div>
    </div>
  );
}
