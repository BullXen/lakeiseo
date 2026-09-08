import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Instagram, 
  Send, 
  PlusCircle, 
  Check, 
  AlertCircle,
  ExternalLink,
  Radio
} from 'lucide-react';
import { ResidentReport } from '../types';

interface ResidentCommunityProps {
  reports: ResidentReport[];
  onAddReport: (report: Partial<ResidentReport>) => void;
  onOpenOrganizer: () => void;
}

export const ResidentCommunity: React.FC<ResidentCommunityProps> = ({
  reports,
  onAddReport,
  onOpenOrganizer
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [municipality, setMunicipality] = useState('Iseo');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Viabilità' | 'Meteo Locale' | 'Iniziative' | 'Avviso Utile'>('Viabilità');

  const [votedReports, setVotedReports] = useState<string[]>([]);

  const handleVote = (id: string) => {
    if (!votedReports.includes(id)) {
      setVotedReports([...votedReports, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddReport({
      author: authorName || 'Residente Sebino',
      municipality,
      title,
      category,
      content,
      timeAgo: 'Pochi istanti fa',
      upvotes: 1,
      verified: true
    });

    setTitle('');
    setContent('');
    setShowSubmitModal(false);
  };

  const instagramPosts = [
    {
      id: 'ig-1',
      author: '@sebino_vibes',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      caption: 'Bagno rigenerante all’Orrido del Bogn #ILoveLakeIseo'
    },
    {
      id: 'ig-2',
      author: '@trekking_iseo',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
      caption: 'Alba sul Santuario della Ceriola a Monte Isola #SebinoLive'
    },
    {
      id: 'ig-3',
      author: '@franciacorta_lake',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      caption: 'Aperitivo con vista sulle motonavi a Lovere #ILoveLakeIseo'
    },
    {
      id: 'ig-4',
      author: '@borghi_sebino',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      caption: 'Piazza Garibaldi a Iseo illuminata a festa #ILoveLakeIseo'
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-[#D9383A]" />
            Angolo Residenti & Community Sebina
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            Voci & Segnalazioni dal Territorio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Avvisi in tempo reale dai cittadini, viabilità gallerie e foto della community
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#1D3D4F] hover:bg-[#2A5269] text-white text-xs font-bold transition-all shadow flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-[#8FA28D]" />
          <span>Invia Segnalazione Utile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Live Resident Reports Feed (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bacheca Segnalazioni Verificate
            </span>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              In diretta
            </span>
          </div>

          <div className="space-y-3">
            {reports.map((r) => {
              const hasVoted = votedReports.includes(r.id);
              return (
                <div 
                  key={r.id}
                  className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E6DCC4] shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1D3D4F] text-white">
                        {r.category}
                      </span>
                      <span className="text-xs font-bold text-[#D9383A]">
                        {r.municipality}
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-[11px] text-slate-500">{r.timeAgo}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1D3D4F] mb-1">
                      {r.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {r.content}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Segnalato da: <strong className="text-slate-700">{r.author}</strong></span>
                    </div>
                  </div>

                  {/* Upvote Button */}
                  <button
                    onClick={() => handleVote(r.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all shrink-0 ${
                      hasVoted
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                    title="Segnala come utile"
                  >
                    <ThumbsUp className="w-4 h-4 mb-1" />
                    <span className="text-xs font-bold">{r.upvotes + (hasVoted ? 1 : 0)}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* WhatsApp Channel Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-[#1D3D4F] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 font-bold text-sm">
                WA
              </div>
              <div className="text-xs">
                <span className="font-bold block">Canale WhatsApp Ufficiale Sebino Live</span>
                <span className="text-slate-300">Ricevi avvisi urgenti di viabilità, orari speciali battelli e allerta meteo</span>
              </div>
            </div>

            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow shrink-0 flex items-center gap-1.5"
            >
              <span>Iscriviti al Canale</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Instagram Community Wall (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3D4F] uppercase tracking-wider">
              <Instagram className="w-4 h-4 text-[#D9383A]" />
              <span>Insta-Wall #ILoveLakeIseo</span>
            </div>
            <span className="text-[11px] text-slate-500">Taggaci per apparire</span>
          </div>

          {/* 4 Photo Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {instagramPosts.map((post) => (
              <div key={post.id} className="relative rounded-2xl overflow-hidden aspect-square group shadow-sm bg-slate-100">
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white" />
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-[#E6DCC4] block">{post.author}</span>
                  <p className="text-[9px] line-clamp-2 leading-tight">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Callout for Organizers */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#8FA28D]/20 to-[#1D3D4F]/10 border border-[#8FA28D]/30 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-[#1D3D4F] block">Sei un Organizzatore di Eventi?</span>
              <span className="text-slate-600">Inserisci gratuitamente il tuo evento nel motore Open Events</span>
            </div>
            <button
              onClick={onOpenOrganizer}
              className="px-3 py-1.5 rounded-xl bg-[#D9383A] hover:bg-[#c22e30] text-white text-xs font-bold transition-all shadow shrink-0"
            >
              Inserisci Evento
            </button>
          </div>
        </div>
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#1D3D4F] font-display">
                Invia una Segnalazione al Territorio
              </h3>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Il tuo Nome / Associazione</label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Es. Mario Rossi (o Anonimo)"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Comune</label>
                  <select 
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F]"
                  >
                    <option value="Iseo">Iseo</option>
                    <option value="Sulzano">Sulzano</option>
                    <option value="Sarnico">Sarnico</option>
                    <option value="Lovere">Lovere</option>
                    <option value="Monte Isola">Monte Isola</option>
                    <option value="Pisogne">Pisogne</option>
                    <option value="Riva di Solto">Riva di Solto</option>
                    <option value="Marone">Marone</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Categoria</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F]"
                  >
                    <option value="Viabilità">Viabilità</option>
                    <option value="Meteo Locale">Meteo Locale</option>
                    <option value="Avviso Utile">Avviso Utile</option>
                    <option value="Iniziative">Iniziative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Titolo Sintetico</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Es. Rallentamenti galleria Trentapassi per cantiere mobile"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Dettagli Segnalazione</label>
                <textarea 
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Descrivi la situazione con precisione..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D3D4F]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D9383A] hover:bg-[#c22e30] text-white text-xs font-bold rounded-xl shadow"
                >
                  Pubblica Segnalazione
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
