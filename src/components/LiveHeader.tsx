import React from 'react';
import { 
  Waves, 
  Wind, 
  Thermometer, 
  Sparkles, 
  Search, 
  Sliders, 
  User, 
  Sun, 
  Sunset, 
  Moon, 
  Sunrise, 
  Navigation,
  Radio
} from 'lucide-react';
import { LakeLiveMetrics, TimeOfDay, PersonaType } from '../types';

interface LiveHeaderProps {
  metrics: LakeLiveMetrics;
  atmosphere: TimeOfDay;
  onAtmosphereChange: (theme: TimeOfDay) => void;
  activePersona: PersonaType;
  onOpenSearch: () => void;
  onOpenElementorModal: () => void;
  onOpenProfile: () => void;
  liveEventsCount: number;
}

export const LiveHeader: React.FC<LiveHeaderProps> = ({
  metrics,
  atmosphere,
  onAtmosphereChange,
  activePersona,
  onOpenSearch,
  onOpenElementorModal,
  onOpenProfile,
  liveEventsCount
}) => {
  const getAtmosphereIcon = (mode: TimeOfDay) => {
    switch (mode) {
      case 'alba': return <Sunrise className="w-3.5 h-3.5 text-amber-300" />;
      case 'giorno': return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 'tramonto': return <Sunset className="w-3.5 h-3.5 text-rose-400" />;
      case 'notte': return <Moon className="w-3.5 h-3.5 text-indigo-300" />;
      default: return <Sun className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getPersonaLabel = () => {
    switch (activePersona) {
      case 'turista': return '🎒 Turista';
      case 'residente': return '🏡 Residente';
      case 'sportivo': return '🚴 Sportivo';
      case 'organizzatore': return '🎪 Organizzatore';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1D3D4F] text-white shadow-xl border-b border-[#2A5269]/40 backdrop-blur-md transition-colors duration-500">
      {/* Top micro-ticker for Live Lake metrics */}
      <div className="bg-[#142C39] border-b border-[#2A5269]/30 text-xs px-3 sm:px-6 py-1.5 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="tracking-wide uppercase text-[10px] font-bold">Sebino Live</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-help" title="Livello idrometrico del lago d'Iseo rilevato a Sarnico rispetto allo zero idrometrico">
            <Waves className="w-3.5 h-3.5 text-sky-400" />
            <span>Livello: <strong className="text-white font-semibold">+{metrics.waterLevelCm} cm</strong> ({metrics.waterLevelTrend})</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-300" title="Vento termico tipico del Lago d'Iseo">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>Vento: <strong className="text-white font-semibold">{metrics.windName} {metrics.windSpeedKnots} kn</strong> (Vela: {metrics.windSuitability.sailing})</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-300">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>Acqua: <strong className="text-white font-semibold">{metrics.waterTempC}°C</strong> | Aria: <strong className="text-white font-semibold">{metrics.airTempC}°C</strong></span>
          </div>

          <div className="flex items-center gap-1 text-[#E6DCC4] bg-[#1D3D4F]/80 px-2 py-0.5 rounded-full border border-[#4F6F7E]/40 font-medium">
            <Sparkles className="w-3 h-3 text-[#D9383A]" />
            <span>{liveEventsCount} eventi in corso ora</span>
          </div>
        </div>

        {/* Atmosphere / Time of day quick toggle */}
        <div className="flex items-center gap-1 shrink-0 bg-[#0F202B] px-2 py-0.5 rounded-full border border-white/10 text-[11px]">
          <span className="text-slate-400 text-[10px] uppercase font-semibold mr-1 hidden lg:inline">Atmosfera:</span>
          {(['auto', 'alba', 'giorno', 'tramonto', 'notte'] as TimeOfDay[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onAtmosphereChange(mode)}
              title={`Passa all'atmosfera ${mode}`}
              className={`px-1.5 py-0.5 rounded capitalize transition-all flex items-center gap-1 ${
                atmosphere === mode 
                  ? 'bg-[#1D3D4F] text-white font-bold shadow-sm ring-1 ring-[#8FA28D]/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {getAtmosphereIcon(mode)}
              <span className="text-[10px] hidden xl:inline">{mode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Navigation & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D9383A] to-[#b32b2d] flex items-center justify-center text-white font-bold shadow-lg shadow-[#D9383A]/30 group-hover:scale-105 transition-transform">
              <span className="text-lg tracking-tighter">❤︎</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-base sm:text-lg uppercase text-white font-display">
                  I Love Lake Iseo
                </span>
                <span className="bg-[#D9383A] text-[9px] uppercase font-black px-1.5 py-0.5 rounded text-white tracking-widest">
                  Hub
                </span>
              </div>
              <p className="text-[11px] text-[#E6DCC4] font-medium tracking-wide">
                Il Sebino come Cruscotto Personale
              </p>
            </div>
          </a>
        </div>

        {/* Center Smart Search trigger bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full bg-[#142C39]/90 hover:bg-[#142C39] border border-[#4F6F7E]/40 hover:border-[#8FA28D] transition-all text-left px-3.5 py-2 rounded-xl text-slate-300 text-sm flex items-center justify-between group shadow-inner"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-300">Cerca eventi, comuni, battelli, ristoranti...</span>
            </div>
            <kbd className="bg-[#1D3D4F] border border-[#4F6F7E]/50 text-[10px] text-slate-300 px-1.5 py-0.5 rounded font-mono shadow-sm">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Persona Badge + Elementor Customizer + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl bg-[#142C39] border border-[#4F6F7E]/40 text-slate-200 hover:text-white"
            title="Cerca nel Lago d'Iseo"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Current Persona indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#142C39] border border-[#8FA28D]/30 text-xs font-semibold text-[#E6DCC4]">
            <span className="w-2 h-2 rounded-full bg-[#8FA28D] animate-ping" />
            <span>{getPersonaLabel()}</span>
          </div>

          {/* Elementor Pro Layout Customizer Button */}
          <button
            onClick={onOpenElementorModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#4F6F7E] to-[#3B5765] hover:from-[#5C8193] hover:to-[#476778] text-white text-xs font-semibold shadow-md transition-all active:scale-95 border border-white/10"
            title="Personalizza l'ordine e i moduli del cruscotto"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E6DCC4]" />
            <span className="hidden lg:inline">Elementor Hub</span>
          </button>

          {/* User Account / Profile */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#D9383A] hover:bg-[#c22e30] text-white text-xs font-bold shadow-md shadow-[#D9383A]/20 transition-all active:scale-95"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Passaporto & Profilo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
