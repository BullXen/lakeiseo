import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  QrCode, 
  Gift, 
  Lock, 
  ChevronRight, 
  Info,
  SmartphoneNfc
} from 'lucide-react';
import { PassportStop } from '../types';

interface LakePassportProps {
  stops: PassportStop[];
  onStampStop: (stopId: string) => void;
}

export const LakePassport: React.FC<LakePassportProps> = ({
  stops,
  onStampStop
}) => {
  const [selectedStopForStamp, setSelectedStopForStamp] = useState<PassportStop | null>(null);
  const [isScanningNfc, setIsScanningNfc] = useState(false);

  const stampedCount = stops.filter(s => s.isStamped).length;
  const totalCount = stops.length;
  const progressPercent = Math.round((stampedCount / totalCount) * 100);

  const getTier = () => {
    if (stampedCount >= 8) return { name: 'Oro Sebino', color: 'bg-amber-400 text-amber-950', badge: '👑 Gran Maestro' };
    if (stampedCount >= 4) return { name: 'Argento Sebino', color: 'bg-slate-200 text-slate-800', badge: '🥈 Esploratore' };
    return { name: 'Bronzo Sebino', color: 'bg-amber-700 text-white', badge: '🥉 Apprendista' };
  };

  const currentTier = getTier();

  const handleSimulateNfcStamp = (stop: PassportStop) => {
    setIsScanningNfc(true);
    setTimeout(() => {
      setIsScanningNfc(false);
      onStampStop(stop.id);
      setSelectedStopForStamp(null);
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1D3D4F', '#8FA28D', '#D9383A', '#E6DCC4', '#D4A359']
      });
    }, 1200);
  };

  return (
    <section className="bg-gradient-to-br from-[#1D3D4F] via-[#163242] to-[#12242F] text-white rounded-3xl p-5 sm:p-7 border border-[#2A5269]/60 shadow-2xl mb-12 relative overflow-hidden">
      {/* Background seal watermarks */}
      <div className="absolute -top-10 -right-10 w-64 h-64 border-8 border-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 border-8 border-white/5 rounded-full pointer-events-none" />

      {/* Header with Progress Meter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DCC4]/20 border border-[#E6DCC4]/30 text-[#E6DCC4] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#D9383A]" />
            Passaporto del Lago • Gamification Ufficiale
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Il Tuo Passaporto del Sebino
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Colleziona i timbri digitali nelle 10 tappe iconiche del lago e sblocca premi nei locali partner
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-[#142C39]/90 border border-white/10 p-4 rounded-2xl flex items-center gap-5 min-w-[280px]">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D9383A] to-[#b32b2d] flex items-center justify-center text-white text-lg font-black shadow-lg shadow-[#D9383A]/30 shrink-0">
            {stampedCount}/{totalCount}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-200">Progresso Tappe</span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${currentTier.color}`}>
                {currentTier.name}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#8FA28D] to-[#D9383A] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 10 Passport Stops Interactive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-6 relative z-10">
        {stops.map((stop, index) => {
          const isStamped = stop.isStamped;
          return (
            <div
              key={stop.id}
              onClick={() => {
                if (!isStamped) {
                  setSelectedStopForStamp(stop);
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between cursor-pointer group ${
                isStamped
                  ? 'bg-[#183849] border-[#8FA28D]/60 shadow-md ring-1 ring-[#8FA28D]/30'
                  : 'bg-[#11222C]/70 border-white/10 hover:border-[#E6DCC4]/50 hover:bg-[#162D3B]'
              }`}
            >
              {/* Stamp number badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400">#{index + 1}</span>
                {isStamped ? (
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5 bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Fatto</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded">
                    <SmartphoneNfc className="w-3 h-3 text-[#D9383A]" />
                    <span>NFC</span>
                  </span>
                )}
              </div>

              {/* Stamp Circle Icon */}
              <div className="my-2 flex justify-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 ${
                  isStamped 
                    ? 'border-[#8FA28D] bg-[#8FA28D]/20 text-2xl shadow-inner rotate-[-6deg]' 
                    : 'border-dashed border-white/20 bg-white/5 text-xl opacity-60'
                }`}>
                  <span>{stop.stampIcon}</span>
                </div>
              </div>

              {/* Title & Town */}
              <div className="text-center mt-1">
                <h4 className="text-xs font-bold text-white line-clamp-1 font-display">
                  {stop.title}
                </h4>
                <span className="text-[10px] text-[#E6DCC4] block truncate">
                  {stop.municipality}
                </span>

                {isStamped ? (
                  <span className="text-[9px] text-emerald-300 font-mono mt-1 block">
                    {stop.stampedDate}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400 group-hover:text-white mt-1 block transition-colors">
                    Clicca per timbrare
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rewards unlocked banner */}
      <div className="bg-[#142C39]/80 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8FA28D]/20 border border-[#8FA28D]/40 flex items-center justify-center text-[#8FA28D] shrink-0">
            <Gift className="w-4 h-4 text-[#8FA28D]" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">Vantaggi Passaporto Attivi:</span>
            <span className="text-slate-300">
              Calice di Franciacorta di benvenuto nei 12 ristoranti partner e sconto 15% sul noleggio E-Bike a Pisogne
            </span>
          </div>
        </div>

        <button 
          onClick={() => {
            const unstamped = stops.find(s => !s.isStamped);
            if (unstamped) setSelectedStopForStamp(unstamped);
          }}
          className="px-4 py-2 rounded-xl bg-[#E6DCC4] hover:bg-white text-[#1D3D4F] text-xs font-bold transition-all shadow shrink-0"
        >
          Scansiona Prossima Tappa
        </button>
      </div>

      {/* Stamping Simulation Modal */}
      {selectedStopForStamp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1D3D4F] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white relative animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-[#8FA28D]/20 border-2 border-[#8FA28D] text-3xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span>{selectedStopForStamp.stampIcon}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#E6DCC4] tracking-wider block mb-1">
                Tappa Ufficiale #{selectedStopForStamp.id}
              </span>
              <h3 className="text-xl font-bold font-display">
                {selectedStopForStamp.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {selectedStopForStamp.municipality} • {selectedStopForStamp.category}
              </p>
            </div>

            <div className="bg-[#142C39] p-4 rounded-2xl border border-white/10 mb-5 text-xs text-slate-200">
              <p className="mb-2 font-medium">
                {selectedStopForStamp.description}
              </p>
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Indizio Totem: {selectedStopForStamp.clue}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                disabled={isScanningNfc}
                onClick={() => handleSimulateNfcStamp(selectedStopForStamp)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D9383A] to-[#b32b2d] hover:from-[#e04547] hover:to-[#c22e30] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <SmartphoneNfc className={`w-4 h-4 ${isScanningNfc ? 'animate-spin' : 'animate-bounce'}`} />
                <span>{isScanningNfc ? 'Rilevamento Totem NFC Sebino...' : 'Simula Scansione Totem NFC'}</span>
              </button>

              <button
                onClick={() => setSelectedStopForStamp(null)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
