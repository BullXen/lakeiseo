import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  Tag, 
  Share2, 
  ArrowUpRight, 
  Filter,
  Users
} from 'lucide-react';
import { LakeEvent, EventCategory } from '../types';

interface OpenEventsGridProps {
  events: LakeEvent[];
  onSelectEvent: (event: LakeEvent) => void;
  favorites: string[];
  onToggleFavorite: (eventId: string) => void;
}

export const OpenEventsGrid: React.FC<OpenEventsGridProps> = ({
  events,
  onSelectEvent,
  favorites,
  onToggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'tutti' | 'oggi' | 'weekend' | 'gratis'>('tutti');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Tutti i Comuni');

  const categories = [
    'Tutti',
    'Musica & Concerti',
    'Sagre & Enogastronomia',
    'Outdoor & Sport',
    'Cultura & Arte',
    'Mercati & Fiere'
  ];

  const municipalitiesList = useMemo(() => {
    const list = Array.from(new Set(events.map(e => e.municipality)));
    return ['Tutti i Comuni', ...list];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Category filter
      if (selectedCategory !== 'Tutti' && e.category !== selectedCategory) {
        return false;
      }
      // Timeframe filter
      if (selectedTimeframe === 'oggi' && e.date !== 'Oggi' && !e.isLiveNow) {
        return false;
      }
      if (selectedTimeframe === 'weekend' && !e.date.toLowerCase().includes('weekend') && !e.date.toLowerCase().includes('sabato') && !e.date.toLowerCase().includes('domenica')) {
        return false;
      }
      if (selectedTimeframe === 'gratis' && !e.isFree) {
        return false;
      }
      // Municipality filter
      if (selectedMunicipality !== 'Tutti i Comuni' && e.municipality !== selectedMunicipality) {
        return false;
      }
      return true;
    });
  }, [events, selectedCategory, selectedTimeframe, selectedMunicipality]);

  return (
    <section className="mb-12">
      {/* Header section with Open Events live badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#D9383A]" />
            Open Events Engine • Sebino Live
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            Eventi Consigliati & Rassegne
          </h2>
          <p className="text-sm text-slate-600">
            Concerti, sagre tradizionali, regate e festival attorno al Lago d’Iseo
          </p>
        </div>

        {/* Quick Timeframe pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedTimeframe('tutti')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTimeframe === 'tutti' 
                ? 'bg-[#1D3D4F] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tutti ({events.length})
          </button>
          <button
            onClick={() => setSelectedTimeframe('oggi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTimeframe === 'oggi' 
                ? 'bg-[#D9383A] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Oggi
          </button>
          <button
            onClick={() => setSelectedTimeframe('weekend')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTimeframe === 'weekend' 
                ? 'bg-[#1D3D4F] text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Questo Weekend
          </button>
          <button
            onClick={() => setSelectedTimeframe('gratis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTimeframe === 'gratis' 
                ? 'bg-[#8FA28D] text-[#1D3D4F] shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gratuiti
          </button>
        </div>
      </div>

      {/* Category Pills & Municipality filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-[#1D3D4F] text-white border-[#1D3D4F] shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedMunicipality}
            onChange={(e) => setSelectedMunicipality(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F] shadow-sm cursor-pointer"
          >
            {municipalitiesList.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 mb-1">Nessun evento trovato</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Prova a cambiare i filtri di categoria o comune per visualizzare gli altri eventi del Lago d’Iseo.
          </p>
          <button
            onClick={() => { setSelectedCategory('Tutti'); setSelectedTimeframe('tutti'); setSelectedMunicipality('Tutti i Comuni'); }}
            className="px-4 py-2 bg-[#1D3D4F] text-white text-xs font-bold rounded-xl"
          >
            Mostra tutti gli eventi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isFav = favorites.includes(event.id);
            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail with badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                    {/* Top Badges: Category & Favorite button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-[#1D3D4F]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                        {event.category}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(event.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 backdrop-blur-md ${
                          isFav 
                            ? 'bg-rose-500 text-white shadow-md' 
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title={isFav ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Badges on image: Date & Recommended */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="flex items-center gap-1.5 bg-[#D9383A] text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-md">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date} • {event.time}</span>
                      </div>

                      {event.isRecommended && (
                        <span className="bg-[#8FA28D] text-[#1D3D4F] text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm uppercase">
                          ★ Consigliato
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F6F7E] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D9383A]" />
                      <span>{event.municipality} — {event.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1D3D4F] font-display line-clamp-1 group-hover:text-[#D9383A] transition-colors mb-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Tag list */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {event.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Price and Details action */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Prezzo</span>
                    <span className="text-xs font-extrabold text-[#1D3D4F]">
                      {event.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D3D4F] hover:bg-[#2A5269] text-white text-xs font-bold transition-all shadow-sm group-hover:shadow group-hover:translate-x-0.5"
                  >
                    <span>Dettagli Evento</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
