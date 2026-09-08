import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Sparkles, 
  Ship, 
  Bike, 
  Utensils, 
  Navigation, 
  ExternalLink,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';
import { PointOfInterest, POICategory } from '../types';

interface InteractiveLakeMapProps {
  points: PointOfInterest[];
  onSelectPoint: (poi: PointOfInterest) => void;
}

export const InteractiveLakeMap: React.FC<InteractiveLakeMapProps> = ({
  points,
  onSelectPoint
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [activePoi, setActivePoi] = useState<PointOfInterest | null>(points[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'Tutti i Punti', icon: Layers },
    { id: 'natura', label: 'Natura & Panorami', icon: Compass },
    { id: 'cultura', label: 'Arte & Borghi', icon: Sparkles },
    { id: 'panchina_gigante', label: 'Panchine Giganti', icon: MapPin },
    { id: 'ebike', label: 'E-Bike & Ciclovie', icon: Bike },
    { id: 'ristorante', label: 'Ristoranti Partner', icon: Utensils }
  ];

  const filteredPoints = selectedCategory === 'all' 
    ? points 
    : points.filter(p => p.category === selectedCategory);

  // Map coordinates normalized to SVG viewBox [0,0, 600, 800]
  // Lake Iseo bounding box roughly: Lat 45.64 to 45.83, Lng 9.94 to 10.13
  const getSvgCoordinates = (lat: number, lng: number) => {
    const minLat = 45.64;
    const maxLat = 45.83;
    const minLng = 9.94;
    const maxLng = 10.13;

    // Invert lat for SVG Y (top is north)
    const y = 750 - ((lat - minLat) / (maxLat - minLat)) * 680;
    const x = 50 + ((lng - minLng) / (maxLng - minLng)) * 500;

    return { x, y };
  };

  const getMarkerColor = (category: POICategory) => {
    switch (category) {
      case 'natura': return '#8FA28D';
      case 'cultura': return '#4F6F7E';
      case 'panchina_gigante': return '#D4A359';
      case 'ebike': return '#2A9D8F';
      case 'ristorante': return '#D9383A';
      default: return '#1D3D4F';
    }
  };

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5 text-[#D9383A]" />
            Mappa Interattiva Sebino Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            La tua Mappa del Lago
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Punti panoramici, falesie, sentieri, ristoranti tipici e tappe del Sebino sincronizzati
          </p>
        </div>

        {/* Category Layer Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1D3D4F] text-white border-[#1D3D4F] shadow-sm'
                    : 'bg-[#F8F6F0] text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3 h-3 text-[#E6DCC4]" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Split: Interactive Vector Map (Left) + Synchronized List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 cols: Lake Vector Map Container */}
        <div className="lg:col-span-7 relative bg-[#EDF3F7] rounded-2xl border border-slate-200 overflow-hidden shadow-inner flex flex-col justify-between min-h-[460px]">
          {/* Map Controls */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 shadow-md">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              title="Ingrandisci mappa"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              title="Rimpicciolisci mappa"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Compass Rose & Legend */}
          <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-[11px] font-bold text-[#1D3D4F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9383A] animate-ping" />
            <span>Lago d’Iseo / Sebino</span>
          </div>

          {/* SVG Canvas Map of Lake Iseo */}
          <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
            <svg 
              viewBox="0 0 600 800" 
              className="w-full h-full max-h-[500px] transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Background mountain relief contour representation */}
              <path 
                d="M 50,50 Q 200,30 550,50 L 580,750 Q 300,780 20,750 Z" 
                fill="#E3ECEF" 
                opacity="0.5" 
              />

              {/* Surrounding Mountain Valleys & Roads */}
              <path 
                d="M 420,100 L 450,220 L 440,380 L 410,500 L 380,680" 
                stroke="#CAD6DC" 
                strokeWidth="6" 
                strokeDasharray="4,4" 
                fill="none" 
              />
              <path 
                d="M 170,120 L 150,260 L 170,420 L 140,580 L 150,700" 
                stroke="#CAD6DC" 
                strokeWidth="6" 
                strokeDasharray="4,4" 
                fill="none" 
              />

              {/* Lake Iseo Water Body (Accurate S-like curvy ribbon shape) */}
              <path
                d="
                  M 310,80 
                  C 360,95 420,140 430,200 
                  C 440,260 410,320 400,370 
                  C 390,430 420,490 390,560 
                  C 370,610 350,670 300,710 
                  C 240,730 180,720 160,680 
                  C 140,640 150,580 180,520 
                  C 200,480 190,420 180,360 
                  C 170,300 190,220 220,160 
                  C 250,110 270,75 310,80 Z
                "
                fill="#94B9CB"
                stroke="#1D3D4F"
                strokeWidth="4"
                className="filter drop-shadow-md"
              />

              {/* Internal Water Highlights */}
              <path
                d="
                  M 300,100 
                  C 340,115 390,150 400,200 
                  C 410,250 380,300 370,350 
                  C 360,400 390,460 360,530 
                  C 340,580 320,630 280,670 
                  C 230,690 190,680 180,650
                "
                fill="none"
                stroke="#B8D6E5"
                strokeWidth="3"
                opacity="0.8"
              />

              {/* Monte Isola (Largest Lake Island in Central/Southern Europe) */}
              <path
                d="
                  M 290,400 
                  C 330,410 350,445 340,490 
                  C 330,520 295,540 265,525 
                  C 245,505 240,460 255,430 
                  C 270,410 280,395 290,400 Z
                "
                fill="#7D987C"
                stroke="#1D3D4F"
                strokeWidth="2.5"
                className="filter drop-shadow"
              />
              <text x="295" y="470" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">
                Monte Isola
              </text>

              {/* Isola di Loreto (North of Monte Isola) */}
              <circle cx="275" cy="365" r="9" fill="#5F7D6B" stroke="#1D3D4F" strokeWidth="1.5" />
              <text x="275" y="350" fill="#1D3D4F" fontSize="10" fontWeight="bold" textAnchor="middle">
                Isola di Loreto
              </text>

              {/* Isola di San Paolo (South of Monte Isola) */}
              <circle cx="280" cy="565" r="8" fill="#5F7D6B" stroke="#1D3D4F" strokeWidth="1.5" />
              <text x="280" y="585" fill="#1D3D4F" fontSize="10" fontWeight="bold" textAnchor="middle">
                Isola San Paolo
              </text>

              {/* Town Labels on the Shore */}
              <text x="325" y="65" fill="#1D3D4F" fontSize="13" fontWeight="900" textAnchor="middle">Lovere (BG)</text>
              <text x="445" y="95" fill="#1D3D4F" fontSize="13" fontWeight="900">Pisogne (BS)</text>
              <text x="435" y="310" fill="#1D3D4F" fontSize="12" fontWeight="bold">Marone</text>
              <text x="425" y="415" fill="#1D3D4F" fontSize="12" fontWeight="bold">Sale Marasino</text>
              <text x="405" y="515" fill="#1D3D4F" fontSize="12" fontWeight="bold">Sulzano</text>
              <text x="365" y="730" fill="#1D3D4F" fontSize="14" fontWeight="900" textAnchor="middle">Iseo (BS)</text>
              <text x="135" y="715" fill="#1D3D4F" fontSize="14" fontWeight="900">Sarnico (BG)</text>
              <text x="145" y="430" fill="#1D3D4F" fontSize="12" fontWeight="bold" textAnchor="end">Tavernola</text>
              <text x="165" y="270" fill="#1D3D4F" fontSize="12" fontWeight="bold" textAnchor="end">Riva di Solto</text>

              {/* Interactive POI Markers */}
              {filteredPoints.map((poi) => {
                const { x, y } = getSvgCoordinates(poi.lat, poi.lng);
                const isHovered = hoveredPointId === poi.id;
                const isActive = activePoi?.id === poi.id;
                const markerColor = getMarkerColor(poi.category);

                return (
                  <g 
                    key={poi.id} 
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => {
                      setHoveredPointId(poi.id);
                      setActivePoi(poi);
                    }}
                    onMouseLeave={() => setHoveredPointId(null)}
                    onClick={() => {
                      setActivePoi(poi);
                      onSelectPoint(poi);
                    }}
                  >
                    {/* Pulsing ring on active */}
                    {(isHovered || isActive) && (
                      <circle cx="0" cy="0" r="22" fill={markerColor} opacity="0.3" className="animate-ping" />
                    )}

                    {/* Marker circle */}
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={isActive || isHovered ? "14" : "10"} 
                      fill={markerColor} 
                      stroke="#FFFFFF" 
                      strokeWidth="2.5" 
                      className="shadow-lg"
                    />

                    {/* Inner core */}
                    <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

                    {/* Tooltip on hover/active */}
                    {(isHovered || isActive) && (
                      <g transform="translate(0, -26)">
                        <rect 
                          x="-65" 
                          y="-20" 
                          width="130" 
                          height="24" 
                          rx="6" 
                          fill="#1D3D4F" 
                          stroke="#FFFFFF" 
                          strokeWidth="1" 
                        />
                        <text 
                          x="0" 
                          y="-4" 
                          fill="#FFFFFF" 
                          fontSize="10" 
                          fontWeight="bold" 
                          textAnchor="middle"
                        >
                          {poi.name.length > 18 ? poi.name.substring(0, 18) + '...' : poi.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom quick active POI preview on map */}
          {activePoi && (
            <div className="p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src={activePoi.image} 
                  alt={activePoi.name} 
                  className="w-12 h-12 object-cover rounded-xl shrink-0" 
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D9383A] block">
                    {activePoi.municipality} • {activePoi.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1D3D4F] line-clamp-1">
                    {activePoi.name}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => onSelectPoint(activePoi)}
                className="px-3 py-1.5 rounded-xl bg-[#1D3D4F] hover:bg-[#2A5269] text-white text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <span>Dettagli</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right 5 cols: Synchronized Scrollable POI List */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filteredPoints.length} Punti d’Interesse Trovati
            </span>
            <span className="text-[11px] text-[#D9383A] font-bold">
              Passa il mouse per sincronizzare la mappa
            </span>
          </div>

          {/* Scrollable list container */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredPoints.map((poi) => {
              const isActive = activePoi?.id === poi.id;
              const isHovered = hoveredPointId === poi.id;

              return (
                <div
                  key={poi.id}
                  onMouseEnter={() => {
                    setHoveredPointId(poi.id);
                    setActivePoi(poi);
                  }}
                  onMouseLeave={() => setHoveredPointId(null)}
                  onClick={() => {
                    setActivePoi(poi);
                    onSelectPoint(poi);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isActive || isHovered
                      ? 'bg-[#1D3D4F] text-white border-[#1D3D4F] shadow-lg scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <img 
                    src={poi.image} 
                    alt={poi.name} 
                    className="w-16 h-16 object-cover rounded-xl shrink-0 shadow-sm" 
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isActive || isHovered ? 'bg-white/20 text-[#E6DCC4]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {poi.category}
                      </span>
                      {poi.rating && (
                        <span className={`text-xs font-bold flex items-center gap-0.5 ${
                          isActive || isHovered ? 'text-amber-300' : 'text-amber-600'
                        }`}>
                          ★ {poi.rating}
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm font-bold truncate mb-1 ${
                      isActive || isHovered ? 'text-white' : 'text-[#1D3D4F]'
                    }`}>
                      {poi.name}
                    </h4>

                    <p className={`text-xs line-clamp-2 leading-relaxed mb-2 ${
                      isActive || isHovered ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {poi.description}
                    </p>

                    {poi.perk && (
                      <span className={`text-[10px] font-bold flex items-center gap-1 ${
                        isActive || isHovered ? 'text-emerald-300' : 'text-emerald-700'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        {poi.perk}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
