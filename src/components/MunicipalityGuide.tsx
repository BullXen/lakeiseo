import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Car, 
  Info, 
  Sparkles, 
  Utensils, 
  Bike, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Municipality } from '../types';

interface MunicipalityGuideProps {
  municipalities: Municipality[];
  selectedMunicipality: Municipality;
  onSelectMunicipality: (m: Municipality) => void;
  onFilterEventsByMunicipality: (municipalityName: string) => void;
}

export const MunicipalityGuide: React.FC<MunicipalityGuideProps> = ({
  municipalities,
  selectedMunicipality,
  onSelectMunicipality,
  onFilterEventsByMunicipality
}) => {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#D9383A]" />
            Guida ai 17 Comuni del Sebino
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            Guida al tuo Comune
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Info pratiche, mercati, ZTL, parcheggi, farmacie e segreti borgo per borgo
          </p>
        </div>

        {/* Quick Town Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl scrollbar-none">
          {municipalities.slice(0, 7).map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMunicipality(m)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedMunicipality.id === m.id
                  ? 'bg-[#1D3D4F] text-white border-[#1D3D4F] shadow-sm'
                  : 'bg-[#F8F6F0] text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Municipality Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Image & Editorial Overview (5 cols) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end p-6 min-h-[380px] bg-slate-900 group">
          <img 
            src={selectedMunicipality.image} 
            alt={selectedMunicipality.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#D9383A] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Provincia di {selectedMunicipality.province}
              </span>
              {selectedMunicipality.webcamAvailable && (
                <span className="bg-black/50 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Webcam Attiva
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display mb-1.5">
              {selectedMunicipality.name}
            </h3>

            <p className="text-xs text-[#E6DCC4] font-medium mb-3 italic">
              "{selectedMunicipality.tagline}"
            </p>

            <p className="text-xs text-slate-200 leading-relaxed line-clamp-3 mb-4">
              {selectedMunicipality.description}
            </p>

            <button
              onClick={() => onFilterEventsByMunicipality(selectedMunicipality.name)}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#1D3D4F] hover:bg-[#E6DCC4] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Vedi Eventi in Programma a {selectedMunicipality.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Practical Info & Local Secrets Grid (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          {/* Practical Info Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Market day */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E6DCC4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1D3D4F] text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-[#E6DCC4]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mercato Settimanale</span>
                <span className="text-xs font-bold text-[#1D3D4F] leading-tight block mt-0.5">
                  {selectedMunicipality.practicalInfo.marketDay}
                </span>
              </div>
            </div>

            {/* Parking zones */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E6DCC4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1D3D4F] text-white flex items-center justify-center shrink-0">
                <Car className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Parcheggi & Sosta</span>
                <span className="text-xs font-bold text-[#1D3D4F] leading-tight block mt-0.5 line-clamp-2">
                  {selectedMunicipality.practicalInfo.parkingZones}
                </span>
              </div>
            </div>

            {/* ZTL Hours */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E6DCC4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1D3D4F] text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">ZTL & Pedonalizzazioni</span>
                <span className="text-xs font-bold text-[#1D3D4F] leading-tight block mt-0.5">
                  {selectedMunicipality.practicalInfo.ztlHours}
                </span>
              </div>
            </div>

            {/* Emergency Pharmacy */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E6DCC4] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1D3D4F] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Farmacia di Turno</span>
                <span className="text-xs font-bold text-[#1D3D4F] leading-tight block mt-0.5">
                  {selectedMunicipality.practicalInfo.emergencyPharmacy}
                </span>
              </div>
            </div>
          </div>

          {/* Highlights & Curiosities */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3D4F] uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4 text-[#D9383A]" />
              <span>Cosa Non Perdere a {selectedMunicipality.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedMunicipality.highlights.map((h) => (
                <span 
                  key={h}
                  className="px-3 py-1 bg-slate-100 hover:bg-[#1D3D4F] hover:text-white transition-colors text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 cursor-default"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Top Food Specialty of the town */}
          <div className="p-4 rounded-2xl bg-[#1D3D4F] text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#142C39] border border-white/10 flex items-center justify-center text-[#E6DCC4] shrink-0">
                <Utensils className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E6DCC4] tracking-wider block">Specialità Tipica del Borgo</span>
                <span className="text-xs sm:text-sm font-bold text-white leading-tight block">
                  {selectedMunicipality.topFood}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-1 rounded-md font-mono">
                {selectedMunicipality.practicalInfo.eBikeChargers} colonnine e-bike
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
