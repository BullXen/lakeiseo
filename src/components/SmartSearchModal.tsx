import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Calendar, 
  MapPin, 
  Compass, 
  Ship, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { LakeEvent, Municipality, PointOfInterest, StoryArticle, FerryRoute } from '../types';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: LakeEvent[];
  municipalities: Municipality[];
  points: PointOfInterest[];
  stories: StoryArticle[];
  ferries: FerryRoute[];
  onSelectEvent: (event: LakeEvent) => void;
  onSelectMunicipality: (m: Municipality) => void;
  onSelectPoint: (p: PointOfInterest) => void;
  onSelectStory: (s: StoryArticle) => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({
  isOpen,
  onClose,
  events,
  municipalities,
  points,
  stories,
  ferries,
  onSelectEvent,
  onSelectMunicipality,
  onSelectPoint,
  onSelectStory
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedEvents = events.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.municipality.toLowerCase().includes(q) || 
      e.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedMunicipalities = municipalities.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.highlights.some(h => h.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchedPois = points.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.municipality.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedStories = stories.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q)
    ).slice(0, 2);

    const matchedFerries = ferries.filter(f => 
      f.from.toLowerCase().includes(q) || 
      f.to.toLowerCase().includes(q)
    ).slice(0, 2);

    const totalMatches = matchedEvents.length + matchedMunicipalities.length + matchedPois.length + matchedStories.length + matchedFerries.length;

    return {
      events: matchedEvents,
      municipalities: matchedMunicipalities,
      points: matchedPois,
      stories: matchedStories,
      ferries: matchedFerries,
      totalMatches
    };
  }, [query, events, municipalities, points, stories, ferries]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-[#F8F6F0]">
          <Search className="w-5 h-5 text-[#1D3D4F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca eventi, comuni, falesie, battelli, ristoranti..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1D3D4F] focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8">
              <Sparkles className="w-10 h-10 text-[#8FA28D] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1D3D4F] mb-1 font-display">
                Cosa vuoi esplorare sul Sebino?
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Digita ad esempio "Monte Isola", "Jazz", "Tinca", "Orrido del Bogn", "Battello", "Lovere"...
              </p>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Monte Isola', 'Tinca al Forno', 'Orrido del Bogn', 'Vello-Toline', 'Jazz al Tramonto', 'Lovere'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1D3D4F] hover:text-white transition-colors text-xs font-semibold text-slate-700"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults && searchResults.totalMatches === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-bold text-slate-700 mb-1">Nessun risultato per "{query}"</p>
              <p className="text-xs text-slate-500">Prova a cercare un nome di comune, una categoria o un piatto tipico.</p>
            </div>
          ) : searchResults ? (
            <div className="space-y-5">
              {/* Municipalities */}
              {searchResults.municipalities.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Comuni del Sebino
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.municipalities.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectMunicipality(m);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1D3D4F] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-[#D9383A] group-hover:text-white" />
                          <div>
                            <span className="text-xs font-bold block">{m.name} ({m.province})</span>
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-200 block truncate">{m.tagline}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {searchResults.events.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Eventi in Programma
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.events.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          onSelectEvent(e);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1D3D4F] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#D9383A] group-hover:text-white" />
                          <div>
                            <span className="text-xs font-bold block">{e.title}</span>
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-200 block">{e.municipality} • {e.date} • {e.price}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Points of Interest */}
              {searchResults.points.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Punti Panoramici & POI
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.points.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPoint(p);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1D3D4F] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Compass className="w-4 h-4 text-[#8FA28D] group-hover:text-white" />
                          <div>
                            <span className="text-xs font-bold block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-200 block">{p.municipality} • {p.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ferries */}
              {searchResults.ferries.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Traghetti & Battelli
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.ferries.map((f) => (
                      <div
                        key={f.id}
                        className="p-2.5 rounded-xl bg-sky-50 text-[#1D3D4F] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <Ship className="w-4 h-4 text-sky-600" />
                          <span className="text-xs font-bold">{f.from} → {f.to} ({f.departureTime})</span>
                        </div>
                        <span className="text-[10px] bg-sky-200 font-bold px-2 py-0.5 rounded">{f.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
