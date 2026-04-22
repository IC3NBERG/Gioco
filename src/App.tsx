import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { Dashboard } from './components/Dashboard';
import { Globe3D } from './components/Globe3D';
import { SpaceProgram } from './components/SpaceProgram';
import type { GameEventDB } from './types';
import { NATIONS_LIST } from './data/nations';

const EventFeed: React.FC<{ events: GameEventDB[] }> = ({ events }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'positive': return 'border-green-500 bg-green-900/20';
      case 'negative': return 'border-red-500 bg-red-900/20';
      case 'critical': return 'border-red-600 bg-red-950/40';
      default: return 'border-slate-600 bg-slate-800/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diplomacy': return '🌐';
      case 'economy': return '💰';
      case 'crisis': return '⚠️';
      case 'election': return '🗳️';
      case 'space': return '🚀';
      case 'military': return '⚔️';
      case 'media': return '📢';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {events.length === 0 ? (
        <p className="text-slate-500 text-center py-8">Nessun evento</p>
      ) : (
        events.map((event, index) => (
          <div
            key={event.id || index}
            className={`p-3 rounded-lg border-l-4 ${getSeverityColor(event.severity)}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{getTypeIcon(event.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-slate-200 font-medium text-sm">{event.title}</div>
                {event.description && (
                  <div className="text-slate-400 text-xs mt-1">{event.description}</div>
                )}
                <div className="text-slate-500 text-xs mt-1">
                  {new Date(event.created_at).toLocaleString('it-IT')}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

type TabType = 'dashboard' | 'space';

const App: React.FC = () => {
  const { 
    currentNationId, 
    events, 
    isLoading,
    setCurrentNation,
  } = useGameStore();

  const [showFeed, setShowFeed] = useState(true);
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      useGameStore.getState().initSupabase(supabaseUrl, supabaseAnonKey);
      useGameStore.getState().loadNations();
    }
  }, []);

  const handleSelectNation = async (nationId: string) => {
    setSelectedNationId(nationId);
    await setCurrentNation(nationId);
  };

  const nations = NATIONS_LIST;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              GEOPOLITICA AVANZATA
            </h1>
            <p className="text-slate-500 text-sm">Simulazione Geopolitica 3D</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
              onChange={(e) => handleSelectNation(e.target.value)}
              value={currentNationId || ''}
            >
              <option value="">Seleziona Nazione...</option>
              {nations.map((nation) => (
                <option key={nation.id} value={nation.id}>
                  {nation.flag_emoji} {nation.name}
                </option>
              ))}
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setActiveTab('space')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'space' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🚀 Spazio
              </button>
              <button
                onClick={() => setShowFeed(!showFeed)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showFeed ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {showFeed ? '📋-' : '📋+'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-slate-400">Caricamento...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 xl:col-span-4 h-[600px] bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <Globe3D 
                currentNationId={currentNationId}
                selectedNationId={selectedNationId}
                onSelectNation={handleSelectNation}
              />
            </div>

            {activeTab === 'dashboard' ? (
              <div className="lg:col-span-4 xl:col-span-5">
                <Dashboard />
              </div>
            ) : (
              <div className="lg:col-span-4 xl:col-span-5">
                <SpaceProgram />
              </div>
            )}

            {showFeed && (
              <div className="lg:col-span-3">
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 h-[600px] overflow-hidden flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">Eventi</h3>
                  <EventFeed events={events} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-slate-500">
          <div>
            GEOPOLITICA AVANZATA v1.1.0 | Simulazione Geopolitica 3D
          </div>
          <div className="flex gap-4">
            <span> Nazioni: {nations.length}</span>
            <span>•</span>
            <span>PA: 3/turno</span>
            <span>•</span>
            <span>Vittoria: Consenso ≥80% o Luna liv.3</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;