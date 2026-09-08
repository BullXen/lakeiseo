import React, { useState } from 'react';
import { X, CalendarPlus, SmartphoneNfc, CheckCircle2, Sparkles, Building2, MapPin } from 'lucide-react';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'event' | 'nfc'>('event');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Musica & Concerti');
  const [municipality, setMunicipality] = useState('Iseo');
  const [date, setDate] = useState('Prossimo Sabato');
  const [time, setTime] = useState('21:00');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('Ingresso Libero');
  const [organizerName, setOrganizerName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSubmitSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tabs */}
        <div className="p-5 pb-0 border-b border-slate-100 bg-[#F8F6F0]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase font-bold text-[#D9383A] bg-rose-50 px-2 py-0.5 rounded">
              Dashboard Organizzatori Sebino
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('event')}
              className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'event' 
                  ? 'border-[#1D3D4F] text-[#1D3D4F]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Inserisci Evento (Open Events)</span>
            </button>

            <button
              onClick={() => setActiveTab('nfc')}
              className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'nfc' 
                  ? 'border-[#1D3D4F] text-[#1D3D4F]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <SmartphoneNfc className="w-4 h-4" />
              <span>Richiedi Espositore NFC Partner</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#1D3D4F] mb-1 font-display">
              Richiesta Inviata con Successo!
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Il team editoriale di I Love Lake Iseo pubblicherà la scheda nel circuito Open Events entro poche ore.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {activeTab === 'event' ? (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Titolo dell’Evento</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Es. Concerto Jazz al Porticciolo"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Categoria</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    >
                      <option value="Musica & Concerti">Musica & Concerti</option>
                      <option value="Sagre & Enogastronomia">Sagre & Enogastronomia</option>
                      <option value="Outdoor & Sport">Outdoor & Sport</option>
                      <option value="Cultura & Arte">Cultura & Arte</option>
                      <option value="Famiglie & Bambini">Famiglie & Bambini</option>
                      <option value="Mercati & Fiere">Mercati & Fiere</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Comune</label>
                    <select
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    >
                      <option value="Iseo">Iseo</option>
                      <option value="Monte Isola">Monte Isola</option>
                      <option value="Sarnico">Sarnico</option>
                      <option value="Lovere">Lovere</option>
                      <option value="Pisogne">Pisogne</option>
                      <option value="Riva di Solto">Riva di Solto</option>
                      <option value="Sulzano">Sulzano</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Data & Periodo</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Es. 22 Agosto 2026"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Orario</label>
                    <input
                      type="text"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Es. 20:30 - 23:00"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Indirizzo o Location Specifica</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Es. Lungolago Marconi, Molo 2"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Descrizione dell’Evento</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Racconta ai visitatori del Lago d’Iseo perché non dovrebbero perderlo..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Prezzo / Biglietto</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Es. Ingresso Gratuito o €10"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Organizzatore / Ente</label>
                    <input
                      type="text"
                      required
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      placeholder="Es. Pro Loco / Associazione"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#1D3D4F] text-white text-xs">
                  <div className="flex items-center gap-2 mb-2 font-bold text-[#E6DCC4]">
                    <Sparkles className="w-4 h-4 text-[#D9383A]" />
                    <span>Kit Espositore Fisico + Digitale NFC</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Un piccolo totem in legno di rovere con chip NFC integrato da posizionare sul bancone del tuo locale. I clienti toccano con lo smartphone e aprono direttamente il profilo del tuo locale su I Love Lake Iseo con promo esclusive.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nome Locale / Attività</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Trattoria del Porto / Osteria Sebina"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Comune</label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Iseo (BS)"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Telefono / Referente</label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 030..."
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Vantaggio o Sconto Riservato ai Visitatori</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Calice Franciacorta di benvenuto o 10% sul conto"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1D3D4F] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D9383A] hover:bg-[#c22e30] text-white text-xs font-bold rounded-xl shadow"
              >
                {activeTab === 'event' ? 'Pubblica Evento' : 'Richiedi Espositore'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
