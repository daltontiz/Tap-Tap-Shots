/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Gamepad2, Ghost, Zap, Shield, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  const [stealthMode, setStealthMode] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
          <motion.div
            whileHover={{ rotate: 15 }}
            className="p-2 bg-neon-green/10 rounded-xl"
          >
            {stealthMode ? (
              <Shield className="w-8 h-8 text-cyber-blue" />
            ) : (
              <Gamepad2 className="w-8 h-8 text-neon-green" />
            )}
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tighter leading-none">
              {stealthMode ? "NEXUS" : "TAP TAP"}
            </span>
            <span className={`font-display font-medium text-[10px] tracking-widest uppercase ${stealthMode ? "text-cyber-blue" : "text-neon-green"}`}>
              {stealthMode ? "Research" : "Shots"}
            </span>
          </div>
        </div>

        <div className="relative w-full sm:w-96 group">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 transition-colors ${stealthMode ? "group-focus-within:text-cyber-blue" : "group-focus-within:text-neon-green"}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={stealthMode ? "Search technical documentation..." : "Search for a game..."}
            className={`w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:bg-white/10 transition-all font-sans ${stealthMode ? "focus:border-cyber-blue/50" : "focus:border-neon-green/50"}`}
          />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setStealthMode(!stealthMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-bold uppercase tracking-wider ${
              stealthMode 
                ? "bg-cyber-blue/10 border-cyber-blue text-cyber-blue" 
                : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
          >
            {stealthMode ? <Shield className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
            {stealthMode ? "Stealth Active" : "Stealth Mode"}
          </button>
          
          <button className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            New
          </button>
          <button className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider">
            <Ghost className="w-3 h-3" />
            Popular
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
