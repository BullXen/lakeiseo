import {
  Municipality,
  LakeEvent,
  PointOfInterest,
  PassportStop,
  FerryRoute,
  LakeLiveMetrics,
  StoryArticle,
  PartnerPlace,
  ResidentReport,
  ElementorWidgetConfig
} from '../types';

export const INITIAL_METRICS: LakeLiveMetrics = {
  waterLevelCm: 24,
  waterLevelTrend: 'stabile',
  waterTempC: 22.4,
  airTempC: 25.8,
  weatherCondition: 'Brezza leggera',
  windName: 'Ora del Garda',
  windSpeedKnots: 11,
  windSuitability: {
    sailing: 'Ideale',
    kayak: 'Ottimo',
    windsurf: 'Perfetto a Lovere'
  },
  crowdStatus: {
    monteIsola: 'Verde (Scorrevole)',
    iseoCenter: 'Giallo (Parcheggi medi)',
    velloToline: 'Verde (Scorrevole)'
  }
};

export const MUNICIPALITIES_DATA: Municipality[] = [
  {
    id: 'iseo',
    name: 'Iseo',
    province: 'Brescia',
    tagline: 'Il capoluogo vivace e storico della sponda bresciana',
    description: 'Cuore pulsante del lago con il suo lungolago alberato, Piazza Garibaldi, vicoli medievali e la Riserva Naturale delle Torbiere.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.6596, lng: 10.0519 },
    practicalInfo: {
      marketDay: 'Venerdì mattina (Piazza Garibaldi e centro)',
      parkingZones: 'Parcheggio Viale Europa (Ampio), Piazzale Gorizia (A pagamento)',
      ztlHours: 'Attiva venerdì sera e weekend ore 19:00 - 02:00',
      touristOffice: 'Lungolago Marconi 2, Tel. +39 030 980209',
      emergencyPharmacy: 'Farmacia San Marco, Via Campo 12',
      eBikeChargers: 4
    },
    highlights: ['Piazza Garibaldi', 'Pieve di Sant’Andrea', 'Castello Oldofredi', 'Lungolago Marconi', 'Lido Sassabanek'],
    topFood: 'Tinca al forno con polenta a Clusane d’Iseo',
    webcamAvailable: true
  },
  {
    id: 'monte-isola',
    name: 'Monte Isola',
    province: 'Brescia',
    tagline: 'L’isola lacustre più grande d’Europa centro-meridionale',
    description: 'Un’oasi senza auto dove si circola solo a piedi, in bici o con piccoli bus. Borghi di pescatori, uliveti secolari e il Santuario della Ceriola.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.7000, lng: 10.0833 },
    practicalInfo: {
      marketDay: 'Martedì mattina (Peschiera Maraglio)',
      parkingZones: 'Auto vietate sull’isola. Parcheggiare a Sulzano o Iseo prima dell’imbarco',
      ztlHours: 'Divieto assoluto veicoli privati 24/7',
      touristOffice: 'Infopoint Peschiera Maraglio, Molo traghetti',
      emergencyPharmacy: 'Dispensario Farmaceutico Siviano',
      eBikeChargers: 6
    },
    highlights: ['Santuario della Madonna della Ceriola', 'Borgo di Peschiera Maraglio', 'Rocca Martinengo', 'Sentiero del periplo (9 km)', 'Museo della Rete'],
    topFood: 'Salame nostrano di Monte Isola e Sarda essiccata con polenta',
    webcamAvailable: true
  },
  {
    id: 'sarnico',
    name: 'Sarnico',
    province: 'Bergamo',
    tagline: 'La culla dei cantieri Riva e dell’eleganza Liberty',
    description: 'Dove il lago sfocia nel fiume Oglio: celebre per le storiche ville in stile Liberty progettate da Sommaruga, il ponte di confine e le boutique.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.6683, lng: 9.9575 },
    practicalInfo: {
      marketDay: 'Giovedì mattina (Piazza XX Settembre e lungolago)',
      parkingZones: 'Parcheggio Lido Nettuno, Parcheggio Foscolo',
      ztlHours: 'Weekend centro storico pedonale',
      touristOffice: 'Via Lantieri 2, Tel. +39 035 910900',
      emergencyPharmacy: 'Farmacia Comunale Sarnico, Corso Europa',
      eBikeChargers: 5
    },
    highlights: ['Ville Liberty (Villa Surre, Villa Faccanoni)', 'Museo Gianni Bellini', 'Lungolago Garibaldi', 'Lido Nettuno', 'Ponte Sarnico-Paratico'],
    topFood: 'Fritto misto di pesce di lago e gelato artigianale sul lungolago',
    webcamAvailable: true
  },
  {
    id: 'lovere',
    name: 'Lovere',
    province: 'Bergamo',
    tagline: 'Uno dei Borghi più Belli d’Italia e patria d’arte',
    description: 'Adagiata sulla punta nord del lago, descritta da Lady Mary Wortley Montagu come il luogo più romantico al mondo. Piazza XIII Martiri e la pinacoteca Tadini.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.8142, lng: 10.0717 },
    practicalInfo: {
      marketDay: 'Sabato mattina (Piazza XIII Martiri e Molo)',
      parkingZones: 'Porto Turistico Cornasorica (1000 posti), Piazzale Bonomelli',
      ztlHours: 'Serale estiva nel borgo antico',
      touristOffice: 'Piazza XIII Martiri 37, Tel. +39 035 962178',
      emergencyPharmacy: 'Farmacia Tadini, Piazza Tadini 4',
      eBikeChargers: 8
    },
    highlights: ['Accademia di Belle Arti Tadini', 'Basilica di Santa Maria in Valvendra', 'Torre Civica', 'Porto Turistico di Lovere', 'Piazza XIII Martiri'],
    topFood: 'Ravioli di casoncelli alla bergamasca e trota del Sebino',
    webcamAvailable: true
  },
  {
    id: 'pisogne',
    name: 'Pisogne',
    province: 'Brescia',
    tagline: 'L’anello di congiunzione tra Sebino e Valle Camonica',
    description: 'Famosa per gli affreschi rivoluzionari del Romanino nella Chiesa di Santa Maria della Neve e per la splendida pista ciclabile Vello-Toline.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.8083, lng: 10.1083 },
    practicalInfo: {
      marketDay: 'Martedì mattina (Piazza Umberto I)',
      parkingZones: 'Parcheggio Stazione FS, Parcheggio Molo Toline',
      ztlHours: 'Piazza pedonale permanente',
      touristOffice: 'Piazza Vescovo Corna Pellegrini',
      emergencyPharmacy: 'Farmacia San Marco, Via Roma',
      eBikeChargers: 6
    },
    highlights: ['Chiesa di S. Maria della Neve (Romanino)', 'Torre del Vescovo', 'Parco Comunale Damioli', 'Ciclabile Vello-Toline', 'Porto di Pisogne'],
    topFood: 'Formaggella della Val Camonica e Luccio in salsa',
    webcamAvailable: false
  },
  {
    id: 'riva-di-solto',
    name: 'Riva di Solto',
    province: 'Bergamo',
    tagline: 'Il fascino selvaggio delle scogliere e dell’Orrido del Bogn',
    description: 'Un borgo lillipuziano affacciato sulle acque più profonde del Sebino, incastonato di fronte alle impressionanti falesie verticali a strapiombo sul lago.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.7764, lng: 10.0417 },
    practicalInfo: {
      marketDay: 'Mercoledì mattina a Tavernola (vicino)',
      parkingZones: 'Parcheggio Zorzino, Molo Riva',
      ztlHours: 'Vicoli interni solo pedonali',
      touristOffice: 'Punto info lungolago',
      emergencyPharmacy: 'Farmacia Solto Collina',
      eBikeChargers: 3
    },
    highlights: ['Orrido del Bogn (Fiordo del Sebino)', 'Panchina Gigante di Fonteno / Riva', 'Borgo medievale di Zorzino', 'Passeggiata a lago verso Castro'],
    topFood: 'Olio Extravergine DOP Laghi Lombardi Sebino e coregone ai ferri',
    webcamAvailable: true
  },
  {
    id: 'sulzano',
    name: 'Sulzano',
    province: 'Brescia',
    tagline: 'Il ponte d’imbarco verso Monte Isola (e The Floating Piers)',
    description: 'Punto di partenza più rapido e suggestivo per i battelli diretti a Peschiera Maraglio, circondato da sentieri montani e scorci panoramici.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.6908, lng: 10.0767 },
    practicalInfo: {
      marketDay: 'Venerdì (a Iseo)',
      parkingZones: 'Parcheggio Multipiano Via Tassano, Parcheggio Gerone',
      ztlHours: 'Accesso molo riservato ai pedoni',
      touristOffice: 'Ufficio IAT Via Cadorna 4',
      emergencyPharmacy: 'Farmacia Dott. Belleri',
      eBikeChargers: 4
    },
    highlights: ['Molo Imbarco Monte Isola (partenze ogni 15 min)', 'Antica Strada Valeriana', 'Cascata di Santa Maria del Giogo', 'Spiaggia Torrente Mesagolo'],
    topFood: 'Pesce persico dorato e Franciacorta Brut',
    webcamAvailable: true
  },
  {
    id: 'sale-marasino',
    name: 'Sale Marasino',
    province: 'Brescia',
    tagline: 'Palazzi nobiliari affacciati sull’isola di Loreto',
    description: 'Disteso lungo la riva con sontuosi palazzi cinquecenteschi come Villa Martinengo Villagana e una vista mozzafiato sulla facciata est di Monte Isola.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.7119, lng: 10.1119 },
    practicalInfo: {
      marketDay: 'Lunedì mattina (Piazzale Marinai d’Italia)',
      parkingZones: 'Parcheggio Stazione Trenord, Parcheggio Comunale',
      ztlHours: 'Piazza centrale pedonale',
      touristOffice: 'Piazza Largo Marinai d’Italia',
      emergencyPharmacy: 'Farmacia San Zenone',
      eBikeChargers: 3
    },
    highlights: ['Chiesa Parrocchiale di San Zenone', 'Palazzo Giugni', 'Villa Martinengo Villagana', 'Spiaggia Perla Sebina', 'Traghetto per Carzano'],
    topFood: 'Gnocchetti alla trota affumicata e salmerino alpino',
    webcamAvailable: false
  },
  {
    id: 'marone',
    name: 'Marone',
    province: 'Brescia',
    tagline: 'La città dell’olio extravergine d’oliva del Sebino',
    description: 'Distesa di uliveti secolari con il suggestivo orrido naturale delle Piramidi di Zone alle spalle e l’imbocco della ciclopedonale a picco sull’acqua.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.7381, lng: 10.0931 },
    practicalInfo: {
      marketDay: 'Mercoledì mattina',
      parkingZones: 'Parcheggio Parco Villa Vismara, Lungolago',
      ztlHours: 'Libero con strisce blu',
      touristOffice: 'Infopoint Villa Vismara',
      emergencyPharmacy: 'Farmacia di Marone',
      eBikeChargers: 4
    },
    highlights: ['Frantoi storici dell’olio DOP', 'Parco Pubblico Villa Vismara', 'Inizio traccia per Piramidi di Zone', 'Spiaggia Baia del Sol'],
    topFood: 'Bruschette all’olio nuovo di Marone e formaggi di malga',
    webcamAvailable: false
  },
  {
    id: 'paratico',
    name: 'Paratico',
    province: 'Brescia',
    tagline: 'I giardini delle chiatte e la culla del Franciacorta a lago',
    description: 'Di fronte a Sarnico, unisce il fascino del lungolago botanico con il Parco delle Chiatte, la stazione storica e il Castello Lanzi.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
    coordinates: { lat: 45.6631, lng: 9.9619 },
    practicalInfo: {
      marketDay: 'Domenica sera estiva (Artigianato e cibo)',
      parkingZones: 'Parcheggio Chiatte, Parcheggio Tengattini',
      ztlHours: 'Lungolago pedonale weekend',
      touristOffice: 'IAT Lungolago Paratico',
      emergencyPharmacy: 'Farmacia Riviera',
      eBikeChargers: 4
    },
    highlights: ['Parco delle Chiatte', 'Oselanda e Parco Comunale', 'Castello Lanzi (Torre di Dante)', 'Pista ciclabile verso la Franciacorta'],
    topFood: 'Risotto al Franciacorta Satèn e lavarello al burro e salvia',
    webcamAvailable: false
  }
];

export const EVENTS_DATA: LakeEvent[] = [
  {
    id: 'ev-1',
    title: 'Sebino Sunset Jazz & Wine Festival',
    category: 'Musica & Concerti',
    date: 'Oggi',
    time: '18:30 - 22:30',
    location: 'Lungolago Marconi & Molo Vecchio',
    municipality: 'Iseo',
    price: 'Ingresso Gratuito',
    isFree: true,
    isRecommended: true,
    badgeColor: '#D9383A',
    description: 'Concerto jazz al tramonto con vista su Monte Isola e degustazione guidata di calici Franciacorta DOCG delle migliori cantine del Sebino.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    lat: 45.6596,
    lng: 10.0519,
    organizer: 'Open Events & Consorzio Iseo Turismo',
    isLiveNow: true,
    attendeesCount: 420,
    tags: ['Jazz', 'Degustazione', 'Tramonto', 'Top Event']
  },
  {
    id: 'ev-2',
    title: 'Fiera Storica della Tinca al Forno De.Co.',
    category: 'Sagre & Enogastronomia',
    date: 'Questo Weekend',
    time: '12:00 - 23:00',
    location: 'Borgo Pescatori di Clusane',
    municipality: 'Iseo',
    price: 'Menu convenzionato €28',
    isFree: false,
    isRecommended: true,
    badgeColor: '#8FA28D',
    description: 'La celebre sagra gastronomica secolare: 12 trattorie storiche propongono la tradizionale tinca ripiena al forno con polenta fumante.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    lat: 45.6675,
    lng: 10.0150,
    organizer: 'Associazione Operatori Clusane',
    isLiveNow: false,
    attendeesCount: 1850,
    tags: ['Enogastronomia', 'Tradizione', 'De.Co', 'Clusane']
  },
  {
    id: 'ev-3',
    title: 'Regata del Sebino — Trofeo Vento Alto',
    category: 'Outdoor & Sport',
    date: 'Domani',
    time: '10:00 - 16:30',
    location: 'Canale tra Lovere e Castro',
    municipality: 'Lovere',
    price: 'Libero da terra',
    isFree: true,
    isRecommended: true,
    badgeColor: '#1D3D4F',
    description: 'Sfida velica sulle brezze termiche dell’Ora del Garda. Punti di osservazione perfetti dal lungolago di Lovere e dalla scogliera di Castro.',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80',
    lat: 45.8142,
    lng: 10.0717,
    organizer: 'Circolo Velico Lovere',
    isLiveNow: false,
    attendeesCount: 310,
    tags: ['Vela', 'Sport', 'Wind', 'Regata']
  },
  {
    id: 'ev-4',
    title: 'Notte delle Lanterne sul Santuario della Ceriola',
    category: 'Cultura & Arte',
    date: 'Sabato Sera',
    time: '20:30 - 23:45',
    location: 'Santuario Ceriola (Punto più alto)',
    municipality: 'Monte Isola',
    price: 'Offerta libera',
    isFree: true,
    isRecommended: true,
    badgeColor: '#D4A359',
    description: 'Escursione notturna guidata illuminata da lanterne fino alla cima dell’isola a 600 metri, con vista panoramica a 360° su tutte le luci del lago.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    lat: 45.7150,
    lng: 10.0840,
    organizer: 'Pro Loco Monte Isola',
    isLiveNow: false,
    attendeesCount: 220,
    tags: ['Notturna', 'Trekking', 'Panorama', 'Magia']
  },
  {
    id: 'ev-5',
    title: 'Mercatino del Vintage e Antiquariato Sebino',
    category: 'Mercati & Fiere',
    date: 'Domenica',
    time: '08:30 - 18:30',
    location: 'Piazza Besenzoni e Lungolago',
    municipality: 'Sarnico',
    price: 'Accesso libero',
    isFree: true,
    isRecommended: false,
    badgeColor: '#4F6F7E',
    description: 'Oltre 60 espositori di collezionismo, libri rari, porcellane d’epoca e modernariato Liberty lungo la passeggiata a lago.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    lat: 45.6683,
    lng: 9.9575,
    organizer: 'Comune di Sarnico',
    isLiveNow: false,
    attendeesCount: 950,
    tags: ['Vintage', 'Mercatino', 'Artigianato']
  },
  {
    id: 'ev-6',
    title: 'Tour Kayak Notturno all’Orrido del Bogn',
    category: 'Outdoor & Sport',
    date: 'Venerdì Sera',
    time: '21:00 - 23:30',
    location: 'Partenza Spiaggia di Riva di Solto',
    municipality: 'Riva di Solto',
    price: '€35 con guida e muta',
    isFree: false,
    isRecommended: true,
    badgeColor: '#D9383A',
    description: 'Pagaiare sotto le imponenti falesie calcaree illuminate dai riflettori galleggianti. Un’esperienza sensoriale unica tra silenzio e acqua limpida.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    lat: 45.7764,
    lng: 10.0417,
    organizer: 'Sebino Kayak Adventure',
    isLiveNow: false,
    attendeesCount: 45,
    tags: ['Kayak', 'Orrido del Bogn', 'Notturna', 'Esperienza']
  }
];

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Orrido del Bogn',
    category: 'natura',
    municipality: 'Riva di Solto',
    description: 'Il fiordo spettacolare del Sebino con scogliere calcaree a picco su un’acqua verde smeraldo, raggiungibile a piedi dalla passeggiata panoramica.',
    lat: 45.7790,
    lng: 10.0450,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPartner: true,
    tags: ['Natura', 'Scogliere', 'Bagno', 'Fotografia'],
    perk: 'Parcheggio convenzionato a Riva'
  },
  {
    id: 'poi-2',
    name: 'Santuario Madonna della Ceriola',
    category: 'cultura',
    municipality: 'Monte Isola',
    description: 'Eretto nel XIII secolo sulla vetta più alta dell’isola (600m s.l.m.), offre il panorama più iconico e completo su tutto il lago d’Iseo e le Alpi Orobie.',
    lat: 45.7150,
    lng: 10.0840,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    isPartner: false,
    tags: ['Panorama 360', 'Santuario', 'Trekking', 'Must See'],
    perk: 'Timbro Passaporto #1'
  },
  {
    id: 'poi-3',
    name: 'Panchina Gigante #24 di Fonteno',
    category: 'panchina_gigante',
    municipality: 'Solto Collina / Fonteno',
    description: 'La celebre Big Bench verde e blu affacciata a strapiombo sull’intero lago e su Monte Isola, parte del circuito ufficiale Chris Bangle.',
    lat: 45.7680,
    lng: 10.0210,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isPartner: false,
    tags: ['Big Bench', 'Panorama', 'Instagram', 'Relax']
  },
  {
    id: 'poi-4',
    name: 'Riserva Naturale Torbiere del Sebino',
    category: 'natura',
    municipality: 'Iseo / Provaglio',
    description: 'Oasi ornitologica di interesse internazionale con passerelle di legno sospese sugli specchi d’acqua, gigli acquatici e aironi.',
    lat: 45.6510,
    lng: 10.0350,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    isPartner: true,
    tags: ['Birdwatching', 'Passerelle', 'Fotografia', 'Natura'],
    perk: 'Sconto ticket d’ingresso con Passaporto'
  },
  {
    id: 'poi-5',
    name: 'Ciclovia a Picco sul Lago Vello-Toline',
    category: 'ebike',
    municipality: 'Marone / Pisogne',
    description: '5 km di pura magia ciclopedonale ricavati dal vecchio tracciato costiero a strapiombo sull’acqua, vietata alle auto e pianeggiante.',
    lat: 45.7720,
    lng: 10.1010,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPartner: true,
    tags: ['Bici', 'Pedonale', 'Tunnel di roccia', 'Panorama'],
    perk: 'Colonnina ricarica e-bike gratuita all’imbocco Toline'
  },
  {
    id: 'poi-6',
    name: 'Isola di Loreto (Scorcio da Peschiera/Sensole)',
    category: 'borgo',
    municipality: 'Monte Isola',
    description: 'Isolotto privato da fiaba con il castelletto neogotico circondato da conifere e rocce a picco sul lago.',
    lat: 45.7110,
    lng: 10.0610,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isPartner: false,
    tags: ['Castello', 'Scorcio', 'Fotografia']
  },
  {
    id: 'poi-7',
    name: 'Accademia di Belle Arti Tadini',
    category: 'cultura',
    municipality: 'Lovere',
    description: 'Il più antico museo d’arte della Lombardia dopo Brera, con opere maestre di Canova (Stele Tadini), Hayez, Bellini e Tiepolo.',
    lat: 45.8155,
    lng: 10.0730,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    isPartner: true,
    tags: ['Museo', 'Canova', 'Palazzo Neoclassico'],
    perk: 'Ingresso ridotto con timbro I Love Lake Iseo'
  },
  {
    id: 'poi-8',
    name: 'Trattoria del Pescatore (Punto Consigliato)',
    category: 'ristorante',
    municipality: 'Iseo (Clusane)',
    description: 'Cucina tipica sebina: Tinca ripiena De.Co., cavedani marinati e spaghettoni al pesce di lago fresco del giorno.',
    lat: 45.6650,
    lng: 10.0190,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPartner: true,
    tags: ['Tinca De.Co.', 'Terrazza Lago', 'NFC Partner'],
    perk: 'Calice Franciacorta di benvenuto con NFC'
  }
];

export const PASSPORT_STOPS: PassportStop[] = [
  {
    id: 'pass-1',
    title: 'La Vetta Sacra della Ceriola',
    municipality: 'Monte Isola',
    category: 'Panorami & Vette',
    description: 'Sali i tornanti da Cure o Peschiera fino al punto più alto dell’isola e tocca il santuario bianco.',
    stampIcon: '⛰️',
    lat: 45.7150,
    lng: 10.0840,
    clue: 'Guarda a sud per scorgere la riserva delle Torbiere',
    rewardTier: 'Bronzo Sebino',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    isStamped: true,
    stampedDate: '14 Giugno'
  },
  {
    id: 'pass-2',
    title: 'Le Scogliere dell’Orrido del Bogn',
    municipality: 'Riva di Solto',
    category: 'Meraviglie Naturali',
    description: 'Raggiungi a piedi la caletta smeraldo incastonata nelle falesie verticali a strapiombo.',
    stampIcon: '🌊',
    lat: 45.7790,
    lng: 10.0450,
    clue: 'Troverai il totem digitale all’imbocco della passerella pedonale',
    rewardTier: 'Bronzo Sebino',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    isStamped: true,
    stampedDate: '28 Luglio'
  },
  {
    id: 'pass-3',
    title: 'La Stele di Canova all’Accademia Tadini',
    municipality: 'Lovere',
    category: 'Arte & Storia',
    description: 'Ammira la stele marmorea commissionata dal conte Tadini ad Antonio Canova nel salone neoclassico.',
    stampIcon: '🏛️',
    lat: 45.8155,
    lng: 10.0730,
    clue: 'Scansiona il tag NFC all’ingresso della galleria d’arte',
    rewardTier: 'Argento Sebino',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    isStamped: true,
    stampedDate: '10 Agosto'
  },
  {
    id: 'pass-4',
    title: 'Le Passerelle delle Torbiere',
    municipality: 'Iseo / Provaglio',
    category: 'Oasi Faunistiche',
    description: 'Attraversa i ponticelli di legno galleggianti all’alba o al tramonto tra canneti e ninfee.',
    stampIcon: '🪶',
    lat: 45.6510,
    lng: 10.0350,
    clue: 'Totem presente al Centro Visite di Provaglio d’Iseo',
    rewardTier: 'Argento Sebino',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-5',
    title: 'Panchina Gigante di Fonteno',
    municipality: 'Fonteno / Solto Collina',
    category: 'Big Bench & Relax',
    description: 'Siediti e lascia penzolare le gambe guardando il lago dall’alto con una vista a nido d’aquila.',
    stampIcon: '🛋️',
    lat: 45.7680,
    lng: 10.0210,
    clue: 'Tag NFC situato sul montante in legno destro della panchina',
    rewardTier: 'Argento Sebino',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-6',
    title: 'La Cappella Sistina Camuna del Romanino',
    municipality: 'Pisogne',
    category: 'Arte Sacra',
    description: 'Entra nella Chiesa di Santa Maria della Neve per restare ipnotizzato dagli affreschi del 1534.',
    stampIcon: '🎨',
    lat: 45.8083,
    lng: 10.1083,
    clue: 'Scansiona all’uscita sul chiostro',
    rewardTier: 'Oro Sebino',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-7',
    title: 'Le Piramidi di Erosione di Zone',
    municipality: 'Zone',
    category: 'Geologia & Trekking',
    description: 'Ammira i bizzarri pinnacoli di terra alti fino a 30 metri sormontati da massi cappello protettivi.',
    stampIcon: '🗿',
    lat: 45.7600,
    lng: 10.1190,
    clue: 'Totem NFC al primo belvedere panoramico del sentiero',
    rewardTier: 'Oro Sebino',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-8',
    title: 'La Traccia della Vecchia Ferrovia Vello-Toline',
    municipality: 'Marone',
    category: 'Cicloturismo',
    description: 'Percorri in bici o a piedi le gallerie storiche intagliate nella viva roccia a pelo d’acqua.',
    stampIcon: '🚴',
    lat: 45.7720,
    lng: 10.1010,
    clue: 'Tag NFC posizionato presso il portale nord di Toline',
    rewardTier: 'Oro Sebino',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-9',
    title: 'La Capitale del Liberty di Sarnico',
    municipality: 'Sarnico',
    category: 'Architettura & Stile',
    description: 'Passeggia tra Villa Surre e Villa Faccanoni ammirando i dettagli floreali in ferro battuto.',
    stampIcon: '🏡',
    lat: 45.6683,
    lng: 9.9575,
    clue: 'Disponibile presso la bacheca IAT di Sarnico',
    rewardTier: 'Diamante del Lago',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  },
  {
    id: 'pass-10',
    title: 'Il Borgo di Pescatori di Peschiera Maraglio',
    municipality: 'Monte Isola',
    category: 'Borghi Storici',
    description: 'Passeggia lungo i vicoli dove ancora oggi le reti da pesca vengono intrecciate a mano.',
    stampIcon: '⛵',
    lat: 45.6980,
    lng: 10.0880,
    clue: 'Tag NFC al molo principale vicino al Museo della Rete',
    rewardTier: 'Gran Maestro del Sebino',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    isStamped: false
  }
];

export const FERRY_ROUTES: FerryRoute[] = [
  {
    id: 'f-1',
    from: 'Sulzano',
    to: 'Peschiera Maraglio (Monte Isola)',
    departureTime: '18:45',
    arrivalTime: '18:50',
    status: 'Imbarco',
    boatName: 'Motonave Airone',
    type: 'Battello Tradizionale'
  },
  {
    id: 'f-2',
    from: 'Iseo',
    to: 'Sensole / Monte Isola',
    departureTime: '19:10',
    arrivalTime: '19:35',
    status: 'In orario',
    boatName: 'Città di Bergamo',
    type: 'Motonave'
  },
  {
    id: 'f-3',
    from: 'Sale Marasino',
    to: 'Carzano (Monte Isola)',
    departureTime: '19:00',
    arrivalTime: '19:05',
    status: 'In orario',
    boatName: 'Motonave Iseo',
    type: 'Traghetto Veicoli'
  },
  {
    id: 'f-4',
    from: 'Lovere',
    to: 'Pisogne - Riva di Solto',
    departureTime: '19:25',
    arrivalTime: '19:50',
    status: 'In orario',
    boatName: 'Motonave Sebino Express',
    type: 'Battello Tradizionale'
  }
];

export const STORIES_DATA: StoryArticle[] = [
  {
    id: 'art-1',
    title: 'I 5 Tramonti più Spettacolari del Sebino: Dove Andare e a Che Ora',
    subtitle: 'Dalla terrazza di Fonteno alla scogliera di Riva di Solto, i luoghi segreti dove il cielo si infiamma.',
    author: 'Elena Guerinoni',
    authorRole: 'Guida Alpina & Fotografa Sebina',
    date: '15 Agosto 2026',
    readTime: '4 min lettura',
    category: 'Itinerari Segreti',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    views: 3420,
    likes: 284,
    content: `Il Lago d'Iseo ha una conformazione geografica peculiare: stretto tra le falesie bergamasche a ovest e le dolci colline bresciane a est, il sole pomeridiano proietta riflessi dorati unici sulla mole imponente di Monte Isola. 

1. **La Terrazza di Fonteno**: Situata a 600m sul versante bergamasco, regala una vista frontale sull'isola di Loreto e sulla punta nord di Monte Isola.
2. **Punta Horn di Sensole**: Un anfiteatro naturale tra ulivi dove il silenzio è rotto solo dallo sciacquio delle onde.
3. **Il Lungolago Marconi a Iseo**: Perfetto per gustare un aperitivo al calice di Franciacorta mentre il disco solare scende dietro la Corna Trentapassi.
4. **La Scogliera del Bogn**: Quando la luce radente del tramonto illumina le stratificazioni di roccia calcare.
5. **Santa Maria del Giogo**: Tra Sulzano e Polaveno, punto di raccordo panoramico tra Val Trompia e Sebino.`
  },
  {
    id: 'art-2',
    title: 'Guida Definitiva alla Tinca al Forno De.Co. di Clusane',
    subtitle: 'Storia, ricetta segreta del ripieno con spezie e formaggio di malga, e le migliori osterie tradizionali.',
    author: 'Marco Archetti',
    authorRole: 'Critico Gastronomico Locale',
    date: '12 Agosto 2026',
    readTime: '6 min lettura',
    category: 'Enogastronomia',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    views: 2890,
    likes: 195,
    content: `A Clusane d'Iseo la tinca ripiena non è solo una pietanza, è un culto identitario tutelato da un severo disciplinare De.Co. (Denominazione Comunale). 

Il segreto risiede nella cottura lenta in tegami di coccio: la tinca viene aperta a libro, farcita con pangrattato, Grana Padano DOP, cannella, noce moscata e abbondante prezzemolo fresco, quindi irrorata di burro fuso e infornata per oltre due ore finché la crosticina diventa croccante e dorata.`
  },
  {
    id: 'art-3',
    title: 'In Canoa e SUP tra le Tre Isole: Monte Isola, Loreto e San Paolo',
    subtitle: 'La rotta marina d’acqua dolce tra castelli neogotici, ville private e anse nascoste.',
    author: 'Davide Baresi',
    authorRole: 'Istruttore Federale Kayak',
    date: '8 Agosto 2026',
    readTime: '5 min lettura',
    category: 'Outdoor & Acqua',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    views: 4120,
    likes: 340,
    content: `Pagaiare nel centro del Sebino significa sfiorare l'incanto di tre isole completamente diverse: la mastodontica Monte Isola con i suoi 4,5 km², la fiabesca Isola di Loreto con il suo castelletto e l'Isola di San Paolo a sud, sede storica di conventi cluniacensi.`
  }
];

export const PARTNERS_DATA: PartnerPlace[] = [
  {
    id: 'part-1',
    name: 'Trattoria del Pescatore 1932',
    type: 'Ristorante / Osteria',
    municipality: 'Iseo (Clusane)',
    address: 'Via Risorgimento 18, Clusane d’Iseo',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    badge: 'Punto I Love Lake Iseo',
    specialty: 'Tinca al Forno De.Co. con polenta e Franciacorta Brut',
    nfcEnabled: true,
    nfcDiscount: 'Calice di benvenuto Franciacorta DOCG e 10% sul conto',
    phone: '+39 030 989012',
    rating: 4.9,
    reviewsCount: 312
  },
  {
    id: 'part-2',
    name: 'Bottega dell’Olio DOP & Salumi Tipici',
    type: 'Bottega Tipica',
    municipality: 'Monte Isola (Siviano)',
    address: 'Piazza Municipio 4, Monte Isola',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    badge: 'Eccellenza Sebina',
    specialty: 'Salame nostrano di Monte Isola e Olio EVO extravergine dei terrazzamenti',
    nfcEnabled: true,
    nfcDiscount: 'Degustazione bruschette all’olio EVO in omaggio',
    phone: '+39 030 988610',
    rating: 4.8,
    reviewsCount: 184
  },
  {
    id: 'part-3',
    name: 'Sebino E-Bike Experience & Rental',
    type: 'Noleggio & Outdoor',
    municipality: 'Pisogne / Marone',
    address: 'Lungolago Tempini 8, Pisogne',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Punto I Love Lake Iseo',
    specialty: 'E-bike biammortizzate, tour guidati Vello-Toline e Valeriana',
    nfcEnabled: true,
    nfcDiscount: 'Casco omaggio e 15% sul noleggio giornaliero con app',
    phone: '+39 035 961022',
    rating: 4.9,
    reviewsCount: 220
  },
  {
    id: 'part-4',
    name: 'Lounge Bar Vento Sebino & Vista Lago',
    type: 'Cantina / Wine Bar',
    municipality: 'Lovere',
    address: 'Piazza XIII Martiri 12, Lovere',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    badge: 'Partner Ufficiale',
    specialty: 'Cocktail botanici al gin del Sebino e taglieri di formaggella camuna',
    nfcEnabled: true,
    nfcDiscount: 'Finger food gourmet con ogni aperitivo',
    phone: '+39 035 981144',
    rating: 4.7,
    reviewsCount: 156
  }
];

export const RESIDENT_REPORTS_DATA: ResidentReport[] = [
  {
    id: 'rep-1',
    author: 'Pietro R. (Comitato Viabilità Sulzano)',
    municipality: 'Sulzano',
    title: 'Viabilità SS510 Sebina Orientale fluida verso Pisogne',
    category: 'Viabilità',
    content: 'Completati i piccoli interventi nella galleria Trentapassi. Traffico scorrevole in entrambe le direzioni senza code.',
    timeAgo: '18 minuti fa',
    upvotes: 42,
    verified: true
  },
  {
    id: 'rep-2',
    author: 'Chiara V. (Pro Loco Sarnico)',
    municipality: 'Sarnico',
    title: 'Farmacia di turno notturna aperta in Corso Europa',
    category: 'Avviso Utile',
    content: 'Farmacia Comunale aperta con servizio notturno continuativo fino alle ore 08:30 di domani.',
    timeAgo: '1 ora fa',
    upvotes: 29,
    verified: true
  },
  {
    id: 'rep-3',
    author: 'Matteo Z. (Club Velico Castro)',
    municipality: 'Castro',
    title: 'Vento termico perfetto per vela e windsurf tra Lovere e Castro',
    category: 'Meteo Locale',
    content: 'L’Ora del Garda è salita a 14 nodi costanti. Ottima visibilità e acqua a 22°C.',
    timeAgo: '2 ore fa',
    upvotes: 67,
    verified: true
  }
];

export const DEFAULT_ELEMENTOR_WIDGETS: ElementorWidgetConfig[] = [
  {
    id: 'widget-now-lake',
    title: 'Adesso sul Lago (Real-Time Hub)',
    subtitle: 'Meteo, vento, orari battelli in diretta, affollamento e webcam',
    visible: true,
    order: 1,
    iconName: 'Activity',
    priorityFor: ['turista', 'sportivo', 'residente']
  },
  {
    id: 'widget-events',
    title: 'Eventi Consigliati & Prossimi (Open Events)',
    subtitle: 'Concerti, sagre, regate e rassegne sul Sebino',
    visible: true,
    order: 2,
    iconName: 'Calendar',
    priorityFor: ['turista', 'residente', 'organizzatore']
  },
  {
    id: 'widget-interactive-map',
    title: 'La tua Mappa del Lago (Side-by-Side)',
    subtitle: 'Eventi, POI, percorsi e servizi sincronizzati',
    visible: true,
    order: 3,
    iconName: 'MapPin',
    priorityFor: ['turista', 'sportivo']
  },
  {
    id: 'widget-municipality-guide',
    title: 'Guida al tuo Comune (17 Comuni)',
    subtitle: 'Info pratiche, mercati, parcheggi e segreti locali',
    visible: true,
    order: 4,
    iconName: 'Compass',
    priorityFor: ['turista', 'residente']
  },
  {
    id: 'widget-passport',
    title: 'Passaporto del Lago (Gamification)',
    subtitle: 'Timbri digitali, 10 tappe iconiche e premi partner',
    visible: true,
    order: 5,
    iconName: 'Award',
    priorityFor: ['turista', 'sportivo']
  },
  {
    id: 'widget-stories',
    title: 'Racconti dal Territorio (Magazine & UGC)',
    subtitle: 'Articoli, consigli autentici e itinerari segreti',
    visible: true,
    order: 6,
    iconName: 'BookOpen',
    priorityFor: ['turista', 'residente']
  },
  {
    id: 'widget-showcase',
    title: 'Vetrina Consigliati & Punti NFC Partner',
    subtitle: 'Ristoranti, cantine e noleggi convenzionati I Love Lake Iseo',
    visible: true,
    order: 7,
    iconName: 'Sparkles',
    priorityFor: ['turista', 'organizzatore']
  },
  {
    id: 'widget-community',
    title: 'Angolo Residenti & Community',
    subtitle: 'Segnalazioni in tempo reale, Instagram wall e canale WhatsApp',
    visible: true,
    order: 8,
    iconName: 'Users',
    priorityFor: ['residente', 'organizzatore']
  }
];
