import React from 'react';
import { X, Award, CheckCircle2, User, Heart, Sparkles, LogIn, ShieldCheck, MapPin } from 'lucide-react';
import { PassportStop, LakeEvent } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: PassportStop[];
  favoriteEvents: LakeEvent[];
  onSelectEvent: (e: LakeEvent) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  stops,
  favoriteEvents,
  onSelectEvent
}) => {
  if (!isOpen) return null;

  const stampedCount = stops.filter(s => s.isStamped).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-[#1D3D4F] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D9383A] text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-[#D9383A]/30">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">
                  Profilo Esploratore Sebino
                </h3>
                <span className="bg-[#8FA28D] text-[#1D3D4F] text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  Livello 2
                </span>
              </div>
              <p className="text-xs text-[#E6DCC4] mt-0.5">
                Passaporto Digitale: <strong className="text-white">{stampedCount}/10 tappe timbrate</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Stamped stops list */}
          <div>
            <h4 className="text-xs font-bold text-[#1D3D4F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D9383A]" />
              <span>Timbri Collezionati</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {stops.filter(s => s.isStamped).map((s) => (
                <div key={s.id} className="p-2.5 rounded-xl bg-[#F8F6F0] border border-[#E6DCC4] flex items-center gap-2">
                  <span className="text-xl">{s.stampIcon}</span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#1D3D4F] truncate block">{s.title}</span>
                    <span className="text-[9px] text-slate-500 block">{s.stampedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div>
            <h4 className="text-xs font-bold text-[#1D3D4F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>Eventi Preferiti ({favoriteEvents.length})</span>
            </h4>

            {favoriteEvents.length === 0 ? (
              <p className="text-xs text-slate-400 bg-slate-50 p-4 rounded-xl text-center">
                Non hai ancora salvato eventi. Clicca sul cuore nelle schede per ritrovarli qui.
              </p>
            ) : (
              <div className="space-y-2">
                {favoriteEvents.map(e => (
                  <div 
                    key={e.id}
                    onClick={() => {
                      onSelectEvent(e);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#1D3D4F] block truncate">{e.title}</span>
                      <span className="text-[10px] text-slate-500">{e.municipality} • {e.date}</span>
                    </div>
                    <span className="text-xs font-bold text-[#D9383A]">{e.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">I Love Lake Iseo Community</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1D3D4F] text-white text-xs font-bold hover:bg-[#2A5269] transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
