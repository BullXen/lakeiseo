import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Heart, 
  Share2, 
  ExternalLink, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { LakeEvent } from '../types';

interface EventModalProps {
  event: LakeEvent | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  if (!event) return null;

  const handleDownloadCalendar = () => {
    // Generate .ics file for calendar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//I Love Lake Iseo//Open Events//IT
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.municipality}, ${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-evento-iseo.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Photo */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 shrink-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="bg-[#1D3D4F] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
              {event.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#D9383A] text-white text-xs font-bold px-2.5 py-0.5 rounded-lg">
                {event.date} • {event.time}
              </span>
              {event.isRecommended && (
                <span className="bg-[#8FA28D] text-[#1D3D4F] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  ★ Consigliato I Love Lake Iseo
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Key Facts Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#E6DCC4]">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Comune</span>
              <span className="text-xs font-bold text-[#1D3D4F] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D9383A]" />
                {event.municipality}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
              <span className="text-xs font-bold text-[#1D3D4F] block truncate mt-0.5">
                {event.location}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Prezzo</span>
              <span className="text-xs font-extrabold text-[#D9383A] block mt-0.5">
                {event.price}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#1D3D4F] uppercase tracking-wider mb-2">
              Descrizione dell’Evento
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Organizer */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1D3D4F] text-white flex items-center justify-center font-bold text-xs">
                OE
              </div>
              <div className="text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Organizzato da</span>
                <span className="font-bold text-[#1D3D4F]">{event.organizer}</span>
              </div>
            </div>

            <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verificato
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {event.tags.map(t => (
              <span key={t} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onToggleFavorite(event.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              isFavorite 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-600' : ''}`} />
            <span>{isFavorite ? 'Salvato nei Preferiti' : 'Salva Evento'}</span>
          </button>

          <button
            onClick={handleDownloadCalendar}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1D3D4F] hover:bg-[#2A5269] text-white text-xs font-bold shadow-md transition-all"
          >
            <Calendar className="w-4 h-4 text-[#E6DCC4]" />
            <span>Aggiungi a Calendario (.ics)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
