import React from 'react';
import { Heart, Instagram, Facebook, Send, ShieldCheck, Ship, MapPin, Sparkles } from 'lucide-react';
import { Municipality } from '../types';

interface FooterProps {
  municipalities: Municipality[];
  onSelectMunicipality: (m: Municipality) => void;
}

export const Footer: React.FC<FooterProps> = ({
  municipalities,
  onSelectMunicipality
}) => {
  return (
    <footer className="bg-[#142C39] text-white border-t border-[#2A5269]/40 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D9383A] flex items-center justify-center text-white font-bold shadow-lg shadow-[#D9383A]/30">
                <span>❤︎</span>
              </div>
              <span className="font-extrabold tracking-tight text-xl text-white font-display">
                I Love Lake Iseo
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Il primo hub intelligente del Sebino. Eventi in tempo reale, orari battelli, bollettini vento, guide ai 17 comuni e passaporto delle tappe iconiche del lago.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#D9383A] flex items-center justify-center text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links: Comuni Sponda Bresciana */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6DCC4] mb-3">
              Sponda Bresciana
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {['Iseo', 'Monte Isola', 'Sulzano', 'Sale Marasino', 'Marone', 'Pisogne', 'Paratico', 'Provaglio d’Iseo', 'Zone'].map(name => {
                const match = municipalities.find(m => m.name.toLowerCase().includes(name.toLowerCase()));
                return (
                  <li key={name}>
                    <button 
                      onClick={() => match && onSelectMunicipality(match)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links: Comuni Sponda Bergamasca */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6DCC4] mb-3">
              Sponda Bergamasca
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {['Sarnico', 'Lovere', 'Riva di Solto', 'Tavernola Bergamasca', 'Predore', 'Castro', 'Costa Volpino', 'Solto Collina', 'Fonteno'].map(name => {
                const match = municipalities.find(m => m.name.toLowerCase().includes(name.toLowerCase()));
                return (
                  <li key={name}>
                    <button 
                      onClick={() => match && onSelectMunicipality(match)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter / Sebino Alert */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6DCC4] mb-3">
              Sebino Weekend Alert
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Ricevi ogni giovedì i 5 migliori eventi del weekend e gli orari battelli aggiornati.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Iscrizione completata con successo!'); }} className="space-y-2">
              <input 
                type="email" 
                required 
                placeholder="La tua email..." 
                className="w-full text-xs p-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8FA28D]"
              />
              <button 
                type="submit" 
                className="w-full py-2 rounded-xl bg-[#D9383A] hover:bg-[#c22e30] text-white text-xs font-bold transition-all shadow"
              >
                Iscriviti Gratis
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 I Love Lake Iseo — Portale Indipendente & Hub del Sebino.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Stack: Open Events + Sebino Hub</span>
            <span>•</span>
            <span>Privacy & Cookie Policy</span>
            <span>•</span>
            <span>Made with ❤︎ on Lake Iseo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
