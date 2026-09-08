/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_METRICS,
  MUNICIPALITIES_DATA,
  EVENTS_DATA,
  POINTS_OF_INTEREST,
  PASSPORT_STOPS,
  FERRY_ROUTES,
  STORIES_DATA,
  PARTNERS_DATA,
  RESIDENT_REPORTS_DATA,
  DEFAULT_ELEMENTOR_WIDGETS
} from './data/mockData';
import { 
  PersonaType, 
  TimeOfDay, 
  LakeLiveMetrics, 
  Municipality, 
  LakeEvent, 
  PointOfInterest, 
  PassportStop, 
  StoryArticle, 
  PartnerPlace, 
  ResidentReport,
  ElementorWidgetConfig
} from './types';

// Components
import { LiveLakeCanvas } from './components/LiveLakeCanvas';
import { LiveHeader } from './components/LiveHeader';
import { HeroPersonaSelector } from './components/HeroPersonaSelector';
import { RealtimeLakeHub } from './components/RealtimeLakeHub';
import { OpenEventsGrid } from './components/OpenEventsGrid';
import { InteractiveLakeMap } from './components/InteractiveLakeMap';
import { MunicipalityGuide } from './components/MunicipalityGuide';
import { LakePassport } from './components/LakePassport';
import { RecommendedShowcase } from './components/RecommendedShowcase';
import { TerritoryStories } from './components/TerritoryStories';
import { ResidentCommunity } from './components/ResidentCommunity';
import { Footer } from './components/Footer';

// Modals
import { EventModal } from './components/EventModal';
import { SmartSearchModal } from './components/SmartSearchModal';
import { StoryModal } from './components/StoryModal';
import { OrganizerModal } from './components/OrganizerModal';
import { ElementorCustomizer } from './components/ElementorCustomizer';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  // State
  const [metrics, setMetrics] = useState<LakeLiveMetrics>(INITIAL_METRICS);
  const [atmosphere, setAtmosphere] = useState<TimeOfDay>('giorno');
  const [activePersona, setActivePersona] = useState<PersonaType>('turista');
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality>(MUNICIPALITIES_DATA[0]);

  // Data State
  const [events, setEvents] = useState<LakeEvent[]>(EVENTS_DATA);
  const [points] = useState<PointOfInterest[]>(POINTS_OF_INTEREST);
  const [passportStops, setPassportStops] = useState<PassportStop[]>(PASSPORT_STOPS);
  const [stories] = useState<StoryArticle[]>(STORIES_DATA);
  const [partners] = useState<PartnerPlace[]>(PARTNERS_DATA);
  const [reports, setReports] = useState<ResidentReport[]>(RESIDENT_REPORTS_DATA);
  const [ferries] = useState(FERRY_ROUTES);
  const [favorites, setFavorites] = useState<string[]>(['ev-1', 'ev-2']);

  // Elementor Modular Widgets layout
  const [widgets, setWidgets] = useState<ElementorWidgetConfig[]>(DEFAULT_ELEMENTOR_WIDGETS);

  // Modals
  const [selectedEvent, setSelectedEvent] = useState<LakeEvent | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isElementorOpen, setIsElementorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);

  // Keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Soft auto-reordering of Elementor widgets when Persona changes
  useEffect(() => {
    // Reorder widgets so that the ones prioritizing the active persona move to the top
    setWidgets(prevWidgets => {
      const priorityWidgets = prevWidgets.filter(w => w.priorityFor.includes(activePersona));
      const nonPriorityWidgets = prevWidgets.filter(w => !w.priorityFor.includes(activePersona));
      const reordered = [...priorityWidgets, ...nonPriorityWidgets];
      return reordered.map((w, index) => ({ ...w, order: index + 1 }));
    });
  }, [activePersona]);

  // Atmosphere CSS class mapping
  const getAtmosphereThemeClass = () => {
    switch (atmosphere) {
      case 'alba': return 'theme-morning';
      case 'giorno': return 'theme-daylight';
      case 'tramonto': return 'theme-sunset';
      case 'notte': return 'theme-night';
      default: return 'theme-daylight';
    }
  };

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStampStop = (stopId: string) => {
    setPassportStops(prev => 
      prev.map(s => s.id === stopId ? { ...s, isStamped: true, stampedDate: 'Oggi' } : s)
    );
  };

  const handleAddReport = (newReport: Partial<ResidentReport>) => {
    const report: ResidentReport = {
      id: `rep-${Date.now()}`,
      author: newReport.author || 'Residente Sebino',
      municipality: newReport.municipality || selectedMunicipality.name,
      title: newReport.title || '',
      category: newReport.category as any || 'Viabilità',
      content: newReport.content || '',
      timeAgo: 'Pochi secondi fa',
      upvotes: 1,
      verified: true
    };
    setReports(prev => [report, ...prev]);
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'ferries' || actionId === 'wind') {
      const element = document.getElementById('widget-now-lake');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'food') {
      const element = document.getElementById('widget-showcase');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'passport') {
      const element = document.getElementById('widget-passport');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'pharmacy' || actionId === 'market') {
      const element = document.getElementById('widget-municipality-guide');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'community') {
      const element = document.getElementById('widget-community');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'ebike') {
      const element = document.getElementById('widget-interactive-map');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (actionId === 'add-event' || actionId === 'nfc-kit') {
      setIsOrganizerOpen(true);
    }
  };

  const handleMoveWidget = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= widgets.length) return;

    const newWidgets = [...widgets];
    const temp = newWidgets[index];
    newWidgets[index] = newWidgets[targetIndex];
    newWidgets[targetIndex] = temp;

    setWidgets(newWidgets.map((w, idx) => ({ ...w, order: idx + 1 })));
  };

  const handleToggleWidget = (id: string) => {
    setWidgets(prev => 
      prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w)
    );
  };

  const handleResetWidgets = () => {
    setWidgets(DEFAULT_ELEMENTOR_WIDGETS);
  };

  const handleFilterEventsByMunicipality = (mName: string) => {
    const el = document.getElementById('widget-events');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Render Widget based on its ID
  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'widget-now-lake':
        return (
          <div id="widget-now-lake" key="widget-now-lake">
            <RealtimeLakeHub 
              metrics={metrics}
              ferries={ferries}
              liveEvents={events.filter(e => e.isLiveNow)}
              onSelectEvent={(e) => setSelectedEvent(e)}
            />
          </div>
        );

      case 'widget-events':
        return (
          <div id="widget-events" key="widget-events">
            <OpenEventsGrid 
              events={events}
              onSelectEvent={(e) => setSelectedEvent(e)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        );

      case 'widget-interactive-map':
        return (
          <div id="widget-interactive-map" key="widget-interactive-map">
            <InteractiveLakeMap 
              points={points}
              onSelectPoint={(poi) => {
                const matchMunicipality = MUNICIPALITIES_DATA.find(m => m.name.toLowerCase().includes(poi.municipality.toLowerCase()));
                if (matchMunicipality) setSelectedMunicipality(matchMunicipality);
              }}
            />
          </div>
        );

      case 'widget-municipality-guide':
        return (
          <div id="widget-municipality-guide" key="widget-municipality-guide">
            <MunicipalityGuide 
              municipalities={MUNICIPALITIES_DATA}
              selectedMunicipality={selectedMunicipality}
              onSelectMunicipality={(m) => setSelectedMunicipality(m)}
              onFilterEventsByMunicipality={handleFilterEventsByMunicipality}
            />
          </div>
        );

      case 'widget-passport':
        return (
          <div id="widget-passport" key="widget-passport">
            <LakePassport 
              stops={passportStops}
              onStampStop={handleStampStop}
            />
          </div>
        );

      case 'widget-stories':
        return (
          <div id="widget-stories" key="widget-stories">
            <TerritoryStories 
              stories={stories}
              onSelectStory={(s) => setSelectedStory(s)}
            />
          </div>
        );

      case 'widget-showcase':
        return (
          <div id="widget-showcase" key="widget-showcase">
            <RecommendedShowcase 
              partners={partners}
              onSelectPartner={(p) => {
                const matchMunicipality = MUNICIPALITIES_DATA.find(m => m.name.toLowerCase().includes(p.municipality.toLowerCase()));
                if (matchMunicipality) setSelectedMunicipality(matchMunicipality);
              }}
            />
          </div>
        );

      case 'widget-community':
        return (
          <div id="widget-community" key="widget-community">
            <ResidentCommunity 
              reports={reports}
              onAddReport={handleAddReport}
              onOpenOrganizer={() => setIsOrganizerOpen(true)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${getAtmosphereThemeClass()}`}>
      {/* Live Animated Lake Background Canvas */}
      <div className="relative">
        <LiveLakeCanvas atmosphere={atmosphere} />
      </div>

      {/* Sticky Live Header */}
      <LiveHeader 
        metrics={metrics}
        atmosphere={atmosphere}
        onAtmosphereChange={(mode) => setAtmosphere(mode)}
        activePersona={activePersona}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenElementorModal={() => setIsElementorOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        liveEventsCount={events.filter(e => e.isLiveNow).length}
      />

      {/* Hero "Chi sei oggi?" Persona Switcher Module */}
      <HeroPersonaSelector 
        activePersona={activePersona}
        onSelectPersona={(p) => setActivePersona(p)}
        selectedMunicipality={selectedMunicipality}
        onSelectMunicipality={(m) => setSelectedMunicipality(m)}
        municipalities={MUNICIPALITIES_DATA}
        onQuickAction={handleQuickAction}
      />

      {/* Main Dynamic Hub (Ordered Elementor Widgets) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {widgets.filter(w => w.visible).map((w) => renderWidget(w.id))}
      </main>

      {/* Footer */}
      <Footer 
        municipalities={MUNICIPALITIES_DATA}
        onSelectMunicipality={(m) => {
          setSelectedMunicipality(m);
          const el = document.getElementById('widget-municipality-guide');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      <EventModal 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isFavorite={selectedEvent ? favorites.includes(selectedEvent.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <SmartSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={events}
        municipalities={MUNICIPALITIES_DATA}
        points={points}
        stories={stories}
        ferries={ferries}
        onSelectEvent={(e) => setSelectedEvent(e)}
        onSelectMunicipality={(m) => setSelectedMunicipality(m)}
        onSelectPoint={(p) => {
          const matchMunicipality = MUNICIPALITIES_DATA.find(m => m.name.toLowerCase().includes(p.municipality.toLowerCase()));
          if (matchMunicipality) setSelectedMunicipality(matchMunicipality);
        }}
        onSelectStory={(s) => setSelectedStory(s)}
      />

      <StoryModal 
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      <OrganizerModal 
        isOpen={isOrganizerOpen}
        onClose={() => setIsOrganizerOpen(false)}
        onSubmitSuccess={() => {
          // Success toast or notification handled in modal
        }}
      />

      <ElementorCustomizer 
        isOpen={isElementorOpen}
        onClose={() => setIsElementorOpen(false)}
        widgets={widgets}
        onToggleWidget={handleToggleWidget}
        onMoveWidget={handleMoveWidget}
        onResetWidgets={handleResetWidgets}
        activePersona={activePersona}
      />

      <UserProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stops={passportStops}
        favoriteEvents={events.filter(e => favorites.includes(e.id))}
        onSelectEvent={(e) => setSelectedEvent(e)}
      />
    </div>
  );
}
