import React from 'react';
import { 
  Compass, 
  Home, 
  Bike, 
  CalendarPlus, 
  ArrowRight, 
  MapPin, 
  Ship, 
  Utensils, 
  Activity, 
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PersonaType, Municipality } from '../types';

interface HeroPersonaSelectorProps {
  activePersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  selectedMunicipality: Municipality;
  onSelectMunicipality: (m: Municipality) => void;
  municipalities: Municipality[];
  onQuickAction: (actionId: string) => void;
}

export const HeroPersonaSelector: React.FC<HeroPersonaSelectorProps> = ({
  activePersona,
  onSelectPersona,
  selectedMunicipality,
  onSelectMunicipality,
  municipalities,
  onQuickAction
}) => {
  const personas = [
    {
      id: 'turista' as PersonaType,
      title: 'Turista di Passaggio',
      icon: Compass,
      badge: 'Esperienza Lago',
      highlight: 'Cosa fare oggi, battelli per Monte Isola, ristoranti tipici',
      color: 'from-[#1D3D4F] to-[#2E586F]',
      accent: 'border-sky-400/50 bg-sky-950/30 text-sky-200'
    },
    {
      id: 'residente' as PersonaType,
      title: 'Residente Sebino',
      icon: Home,
      badge: 'Vita Quotidiana',
      highlight: 'Farmacie di turno, mercati settimanali, viabilità e avvisi',
      color: 'from-[#2A4D3E] to-[#40735E]',
      accent: 'border-emerald-400/50 bg-emerald-950/30 text-emerald-200'
    },
    {
      id: 'sportivo' as PersonaType,
      title: 'Sportivo & Outdoor',
      icon: Bike,
      badge: 'Vento & Tracciati',
      highlight: 'Bollettino vento vela/kayak, Vello-Toline, ricariche e-bike',
      color: 'from-[#3E382A] to-[#695D3E]',
      accent: 'border-amber-400/50 bg-amber-950/30 text-amber-200'
    },
    {
      id: 'organizzatore' as PersonaType,
      title: 'Organizzatore Eventi',
      icon: CalendarPlus,
      badge: 'Promozione & Open Events',
      highlight: 'Inserisci evento, statistiche di visibilità, kit espositore NFC',
      color: 'from-[#4D232A] to-[#7A3644]',
      accent: 'border-rose-400/50 bg-rose-950/30 text-rose-200'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1D3D4F] to-[#142C39] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#2A5269]/40 shadow-xl">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8FA28D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D9383A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial headline & concept statement */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DCC4]/15 border border-[#E6DCC4]/30 text-[#E6DCC4] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D9383A]" />
            Personalizzazione Intelligente a Zero Click
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-3">
            Chi sei oggi sul <span className="text-[#E6DCC4] italic">Lago d’Iseo</span>?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Non una vetrina statica, ma il tuo <strong className="text-white">cruscotto in tempo reale</strong>. Seleziona il tuo profilo per adattare istantaneamente eventi, orari, meteo e mappe ai tuoi bisogni.
          </p>
        </div>

        {/* 4 Persona Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p.id)}
                className={`text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 relative border flex flex-col justify-between group ${
                  isSelected 
                    ? 'bg-[#183545] border-[#8FA28D] ring-2 ring-[#8FA28D]/40 shadow-2xl scale-[1.02]' 
                    : 'bg-[#12242F]/70 border-white/10 hover:border-white/25 hover:bg-[#162D3B]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-[#8FA28D] bg-[#8FA28D]/10 px-2 py-0.5 rounded-full border border-[#8FA28D]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attivo</span>
                  </div>
                )}

                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${p.color} border border-white/15 text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block mb-1.5 ${p.accent}`}>
                    {p.badge}
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5 font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E6DCC4] group-hover:text-white transition-colors">
                  <span>Visualizza Cruscotto</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Banner based on Selected Persona */}
        <div className="bg-[#12242F] border border-[#2A5269]/60 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-inner">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1D3D4F] border border-[#8FA28D]/40 flex items-center justify-center text-[#8FA28D] shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 text-[#8FA28D]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8FA28D]">
                  Cruscotto Personalizzato per te:
                </span>
                <span className="text-xs text-slate-300">
                  {activePersona === 'turista' && 'Mostra in evidenza battelli, tappe imperdibili e tinca al forno.'}
                  {activePersona === 'residente' && 'Mostra in evidenza viabilità SS510, farmacie e mercati rionali.'}
                  {activePersona === 'sportivo' && 'Mostra in evidenza vento termico a Lovere/Castro e tracciati e-bike.'}
                  {activePersona === 'organizzatore' && 'Mostra in evidenza gestione Open Events e bacheca partner.'}
                </span>
              </div>

              {/* Quick Action Pills tailored to persona */}
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                {activePersona === 'turista' && (
                  <>
                    <button 
                      onClick={() => onQuickAction('ferries')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Ship className="w-3.5 h-3.5 text-sky-400" />
                      <span>Orari Battelli Monte Isola</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('food')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Utensils className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dove Mangiare Tinca & Casoncelli</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('passport')}
                      className="px-2.5 py-1 rounded-lg bg-[#D9383A]/20 hover:bg-[#D9383A]/30 text-xs text-[#E6DCC4] border border-[#D9383A]/40 flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D9383A]" />
                      <span>Passaporto 10 Tappe</span>
                    </button>
                  </>
                )}

                {activePersona === 'residente' && (
                  <>
                    <button 
                      onClick={() => onQuickAction('pharmacy')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Farmacia di Turno Notturna</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('market')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Calendario Mercati Rionali</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('community')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      <span>Segnalazioni Viabilità SS510</span>
                    </button>
                  </>
                )}

                {activePersona === 'sportivo' && (
                  <>
                    <button 
                      onClick={() => onQuickAction('wind')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      <span>Bollettino Vento Lovere/Castro</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('ebike')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Bike className="w-3.5 h-3.5 text-amber-400" />
                      <span>Colonnine E-Bike & Vello-Toline</span>
                    </button>
                  </>
                )}

                {activePersona === 'organizzatore' && (
                  <>
                    <button 
                      onClick={() => onQuickAction('add-event')}
                      className="px-2.5 py-1 rounded-lg bg-[#D9383A] hover:bg-[#c22e30] text-xs text-white border border-[#D9383A] flex items-center gap-1.5 transition-colors font-bold shadow-md shadow-[#D9383A]/20"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-white" />
                      <span>+ Inserisci Nuovo Evento Open Events</span>
                    </button>
                    <button 
                      onClick={() => onQuickAction('nfc-kit')}
                      className="px-2.5 py-1 rounded-lg bg-[#1D3D4F] hover:bg-[#2A5269] text-xs text-white border border-[#4F6F7E]/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Richiedi Espositore NFC Partner</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Municipality Location Selector */}
          <div className="flex items-center gap-2 bg-[#1D3D4F]/90 px-3 py-2 rounded-xl border border-[#4F6F7E]/40 shrink-0 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-[#D9383A] shrink-0" />
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Comune di riferimento:</span>
              <select
                value={selectedMunicipality.id}
                onChange={(e) => {
                  const m = municipalities.find(item => item.id === e.target.value);
                  if (m) onSelectMunicipality(m);
                }}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer pr-4"
              >
                {municipalities.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#142C39] text-white">
                    {m.name} ({m.province})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
