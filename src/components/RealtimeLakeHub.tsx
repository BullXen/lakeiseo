import React, { useState } from 'react';
import { 
  Activity, 
  Wind, 
  Thermometer, 
  Waves, 
  Ship, 
  Video, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Compass, 
  Eye, 
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { LakeLiveMetrics, FerryRoute, LakeEvent } from '../types';

interface RealtimeLakeHubProps {
  metrics: LakeLiveMetrics;
  ferries: FerryRoute[];
  liveEvents: LakeEvent[];
  onSelectEvent: (event: LakeEvent) => void;
}

export const RealtimeLakeHub: React.FC<RealtimeLakeHubProps> = ({
  metrics,
  ferries,
  liveEvents,
  onSelectEvent
}) => {
  const [activeWebcamIndex, setActiveWebcamIndex] = useState(0);

  const webcams = [
    {
      id: 'cam-1',
      title: 'Monte Isola — Peschiera Maraglio & Molo',
      location: 'Monte Isola (BS)',
      time: 'In diretta • 1080p',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      description: 'Vista live sul passaggio motonavi e sulla passeggiata costiera verso Sensole.'
    },
    {
      id: 'cam-2',
      title: 'Iseo — Lungolago Marconi & Piazza Garibaldi',
      location: 'Iseo (BS)',
      time: 'In diretta • 1080p',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      description: 'Panoramica sulla piazza centrale e sul porticciolo delle barche d’epoca.'
    },
    {
      id: 'cam-3',
      title: 'Lovere — Porto Turistico Cornasorica',
      location: 'Lovere (BG)',
      time: 'In diretta • 1080p',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      description: 'Condizioni vento per vele e regate nel canale tra Alto Sebino e Corna Trentapassi.'
    },
    {
      id: 'cam-4',
      title: 'Riva di Solto — Baia dell’Orrido del Bogn',
      location: 'Riva di Solto (BG)',
      time: 'In diretta • 1080p',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      description: 'Trasparenza acqua e scogliere calcaree a strapiombo sul Sebino profondo.'
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#4F6F7E]/20 shadow-xl mb-10">
      {/* Header section with Live badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#1D3D4F] text-white flex items-center justify-center shadow-lg shadow-[#1D3D4F]/20">
            <Activity className="w-6 h-6 text-[#E6DCC4]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D3D4F] font-display">
                Adesso sul Lago
              </h2>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Live 360°
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Situazione in tempo reale: meteo, venti termici, battelli e webcam in diretta
            </p>
          </div>
        </div>

        {/* Update timestamp */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-[#F8F6F0] px-3 py-1.5 rounded-xl border border-[#E6DCC4]/60">
          <Clock className="w-3.5 h-3.5 text-[#1D3D4F]" />
          <span>Aggiornato pochi secondi fa</span>
        </div>
      </div>

      {/* Grid of Key Real-Time Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Webcam Stream & Camera Switcher (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-900 group">
            <img 
              src={webcams[activeWebcamIndex].image} 
              alt={webcams[activeWebcamIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            {/* Live Camera Tag & Controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold text-[11px] uppercase tracking-wider">Webcam Live HD</span>
              </div>
              <span className="text-xs text-slate-200 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md font-mono">
                {webcams[activeWebcamIndex].time}
              </span>
            </div>

            {/* Bottom info on the active webcam */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-base sm:text-lg font-bold font-display drop-shadow">
                {webcams[activeWebcamIndex].title}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-1 drop-shadow-sm">
                {webcams[activeWebcamIndex].description}
              </p>
            </div>
          </div>

          {/* Webcam Thumbnails selector */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {webcams.map((cam, idx) => (
              <button
                key={cam.id}
                onClick={() => setActiveWebcamIndex(idx)}
                className={`relative rounded-xl overflow-hidden border-2 text-left transition-all p-1 ${
                  activeWebcamIndex === idx 
                    ? 'border-[#1D3D4F] ring-2 ring-[#8FA28D]/40 scale-[1.02]' 
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={cam.image} alt={cam.title} className="w-full h-12 object-cover rounded-lg" />
                <span className="text-[10px] font-bold text-slate-700 block truncate mt-1">
                  {cam.location}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Key Real-Time Gauges (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Wind & Sport Conditions Card */}
          <div className="bg-[#1D3D4F] text-white rounded-2xl p-4.5 border border-[#2A5269]/60 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Bollettino Vento Sebino
                </h3>
              </div>
              <span className="text-xs font-extrabold bg-[#8FA28D] text-[#1D3D4F] px-2 py-0.5 rounded-full">
                {metrics.windName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#142C39] p-3 rounded-xl border border-white/10 mb-3 text-center">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Intensità</span>
                <span className="text-lg font-black text-white">{metrics.windSpeedKnots} <small className="text-xs font-normal text-slate-300">nodi</small></span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Vela / Kite</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">{metrics.windSuitability.sailing}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Acqua</span>
                <span className="text-lg font-black text-sky-300">{metrics.waterTempC}°C</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Brezza termica costante da Sud/Sud-Est. Condizioni ideali per uscite in barca a vela a Lovere, kayak all’Orrido del Bogn e windsurf.
            </p>
          </div>

          {/* Live Crowd & Parking Traffic Lights */}
          <div className="bg-[#F8F6F0] rounded-2xl p-4 border border-[#E6DCC4] shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3D4F] uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#D9383A]" />
                <span>Stato Affollamento & Parcheggi</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Semaforo Live</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                  <span className="font-semibold text-slate-800">Monte Isola (Imbarchi Sulzano)</span>
                </div>
                <span className="font-bold text-emerald-700 text-[11px]">{metrics.crowdStatus.monteIsola}</span>
              </div>

              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
                  <span className="font-semibold text-slate-800">Iseo Centro (Parcheggi)</span>
                </div>
                <span className="font-bold text-amber-700 text-[11px]">{metrics.crowdStatus.iseoCenter}</span>
              </div>

              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                  <span className="font-semibold text-slate-800">Ciclabile Vello-Toline</span>
                </div>
                <span className="font-bold text-emerald-700 text-[11px]">{metrics.crowdStatus.velloToline}</span>
              </div>
            </div>
          </div>

          {/* Next Ferry Departures */}
          <div className="bg-white rounded-2xl p-4 border border-[#4F6F7E]/30 shadow-sm flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3D4F] uppercase tracking-wider">
                <Ship className="w-4 h-4 text-sky-600" />
                <span>Prossimi Battelli in Partenza</span>
              </div>
              <span className="text-[10px] text-sky-800 font-semibold bg-sky-50 px-2 py-0.5 rounded-full">
                Navigazione Lago d’Iseo
              </span>
            </div>

            <div className="space-y-1.5 mb-2">
              {ferries.slice(0, 3).map((f) => (
                <div key={f.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors border border-slate-100">
                  <div>
                    <div className="font-bold text-[#1D3D4F] flex items-center gap-1.5">
                      <span>{f.from}</span>
                      <span className="text-slate-400">→</span>
                      <span>{f.to}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{f.boatName} • {f.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#1D3D4F] text-xs block">{f.departureTime}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      f.status === 'Imbarco' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live event currently in progress banner */}
            {liveEvents.length > 0 && (
              <div 
                onClick={() => onSelectEvent(liveEvents[0])}
                className="mt-1 bg-gradient-to-r from-[#D9383A] to-[#b32b2d] text-white p-2.5 rounded-xl cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <div>
                    <span className="text-[10px] uppercase font-black text-rose-200 block">In corso adesso</span>
                    <span className="text-xs font-bold line-clamp-1">{liveEvents[0].title}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold shrink-0">
                  Dettagli
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
