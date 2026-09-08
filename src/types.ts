export type PersonaType = 'turista' | 'residente' | 'sportivo' | 'organizzatore';

export type TimeOfDay = 'auto' | 'alba' | 'giorno' | 'tramonto' | 'notte';

export type Season = 'primavera' | 'estate' | 'autunno' | 'inverno';

export type EventCategory = 
  | 'Musica & Concerti'
  | 'Sagre & Enogastronomia'
  | 'Outdoor & Sport'
  | 'Cultura & Arte'
  | 'Famiglie & Bambini'
  | 'Mercati & Fiere';

export interface LakeEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO or human format
  time: string;
  endDate?: string;
  location: string;
  municipality: string;
  price: string;
  isFree: boolean;
  isRecommended: boolean;
  badgeColor?: string; // hex or tailwind
  description: string;
  image: string;
  lat: number;
  lng: number;
  organizer: string;
  isLiveNow?: boolean;
  attendeesCount?: number;
  tags: string[];
}

export type POICategory = 
  | 'borgo'
  | 'panchina_gigante'
  | 'natura'
  | 'ristorante'
  | 'ebike'
  | 'porto'
  | 'farmacia'
  | 'spiaggia'
  | 'cultura';

export interface PointOfInterest {
  id: string;
  name: string;
  category: POICategory;
  municipality: string;
  description: string;
  lat: number;
  lng: number;
  image: string;
  rating?: number;
  isPartner?: boolean;
  tags: string[];
  perk?: string;
  address?: string;
}

export interface Municipality {
  id: string;
  name: string;
  province: 'Brescia' | 'Bergamo';
  description: string;
  image: string;
  tagline: string;
  coordinates: { lat: number; lng: number };
  practicalInfo: {
    marketDay: string;
    parkingZones: string;
    ztlHours: string;
    touristOffice: string;
    emergencyPharmacy: string;
    eBikeChargers: number;
  };
  highlights: string[];
  topFood: string;
  webcamAvailable?: boolean;
}

export interface PassportStop {
  id: string;
  title: string;
  municipality: string;
  category: string;
  description: string;
  stampIcon: string;
  lat: number;
  lng: number;
  clue: string;
  rewardTier: string;
  image: string;
  isStamped?: boolean;
  stampedDate?: string;
}

export interface FerryRoute {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  status: 'In orario' | 'Imbarco' | 'Traghettamento rapido' | 'Partito';
  boatName: string;
  type: 'Battello Tradizionale' | 'Motonave' | 'Traghetto Veicoli';
}

export interface LakeLiveMetrics {
  waterLevelCm: number; // e.g. +24 cm
  waterLevelTrend: 'in salita' | 'stabile' | 'in discesa';
  waterTempC: number;
  airTempC: number;
  weatherCondition: 'Soleggiato' | 'Brezza leggera' | 'Nuvoloso' | 'Temporale estivo' | 'Sereno';
  windName: 'Ora del Garda' | 'Vént de la Al' | 'Brezza da Nord' | 'Calma di Vento';
  windSpeedKnots: number;
  windSuitability: {
    sailing: 'Ideale' | 'Moderato' | 'Non consigliato';
    kayak: 'Ottimo' | 'Attenzione onde' | 'Sconsigliato';
    windsurf: 'Perfetto a Lovere' | 'Buono' | 'Basso';
  };
  crowdStatus: {
    monteIsola: 'Verde (Scorrevole)' | 'Giallo (Attesa 15m)' | 'Rosso (Affollato)';
    iseoCenter: 'Verde (Parcheggi liberi)' | 'Giallo (Parcheggi medi)' | 'Rosso (Completo)';
    velloToline: 'Verde (Scorrevole)' | 'Giallo (Frequenza alta)' | 'Rosso (Molto trafficato)';
  };
}

export interface StoryArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  views: number;
  likes: number;
}

export interface PartnerPlace {
  id: string;
  name: string;
  type: 'Ristorante / Osteria' | 'Cantina / Wine Bar' | 'Noleggio & Outdoor' | 'Hotel & Resort' | 'Bottega Tipica';
  municipality: string;
  address: string;
  image: string;
  badge: 'Punto I Love Lake Iseo' | 'Partner Ufficiale' | 'Eccellenza Sebina';
  specialty: string;
  nfcEnabled: boolean;
  nfcDiscount: string;
  phone: string;
  rating: number;
  reviewsCount: number;
}

export interface ResidentReport {
  id: string;
  author: string;
  municipality: string;
  title: string;
  category: 'Viabilità' | 'Meteo Locale' | 'Iniziative' | 'Avviso Utile' | 'Consiglio';
  content: string;
  timeAgo: string;
  upvotes: number;
  verified: boolean;
}

export interface ElementorWidgetConfig {
  id: string;
  title: string;
  subtitle: string;
  visible: boolean;
  order: number;
  iconName: string;
  priorityFor: PersonaType[];
}
