import React, { useState } from 'react';
import { 
  Sparkles, 
  SmartphoneNfc, 
  MapPin, 
  Phone, 
  Star, 
  Utensils, 
  Wine, 
  Bike, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PartnerPlace } from '../types';

interface RecommendedShowcaseProps {
  partners: PartnerPlace[];
  onSelectPartner: (partner: PartnerPlace) => void;
}

export const RecommendedShowcase: React.FC<RecommendedShowcaseProps> = ({
  partners,
  onSelectPartner
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { id: 'all', label: 'Tutti i Partner' },
    { id: 'Ristorante / Osteria', label: 'Ristoranti & Osterie' },
    { id: 'Cantina / Wine Bar', label: 'Cantine Franciacorta' },
    { id: 'Noleggio & Outdoor', label: 'Noleggio & Outdoor' },
    { id: 'Bottega Tipica', label: 'Botteghe Olio & Tipicità' }
  ];

  const filteredPartners = selectedType === 'all'
    ? partners
    : partners.filter(p => p.type === selectedType);

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl mb-12">
      {/* Header with Physical-Digital NFC Callout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D9383A]" />
            Vetrina Consigliati • Rete Partner Sebino
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            Locali Consigliati & Punti NFC
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Trattorie autentiche, cantine del Sebino e botteghe con espositore fisico convenzionato
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedType === t.id
                  ? 'bg-[#1D3D4F] text-white border-[#1D3D4F] shadow-sm'
                  : 'bg-[#F8F6F0] text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            onClick={() => onSelectPartner(partner)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Badge: Punto I Love Lake Iseo */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="bg-[#D9383A] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {partner.badge}
                  </span>

                  {partner.nfcEnabled && (
                    <span className="bg-white/90 backdrop-blur-md text-[#1D3D4F] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                      <SmartphoneNfc className="w-3 h-3 text-[#D9383A]" />
                      NFC
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-2.5 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#E6DCC4] block">
                    {partner.municipality}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {partner.type}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{partner.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({partner.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#1D3D4F] font-display line-clamp-1 group-hover:text-[#D9383A] transition-colors mb-1.5">
                  {partner.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  <strong className="text-slate-800">Specialità:</strong> {partner.specialty}
                </p>

                {/* NFC Discount Box */}
                <div className="p-2.5 rounded-xl bg-[#F8F6F0] border border-[#E6DCC4] text-[11px] font-semibold text-[#1D3D4F] flex items-center gap-2">
                  <SmartphoneNfc className="w-4 h-4 text-[#D9383A] shrink-0" />
                  <span className="line-clamp-2">{partner.nfcDiscount}</span>
                </div>
              </div>
            </div>

            {/* Card Footer with Direct Call / Info */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                {partner.address}
              </span>

              <span className="text-[11px] font-bold text-[#1D3D4F] group-hover:text-[#D9383A] flex items-center gap-1">
                <span>Dettagli</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
