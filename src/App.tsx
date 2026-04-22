import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { Dashboard } from './components/Dashboard';
import { Globe3D } from './components/Globe3D';
import { Map2D } from './components/Map2D';
import { SpaceProgram } from './components/SpaceProgram';
import { ChoiceBrowser } from './components/ChoiceBrowser';
import { FactionOverview } from './components/FactionOverview';
import { VictoryProgress } from './components/VictoryProgress';
import type { GameEventDB, Choice } from './types';
import { NATIONS_LIST } from './data/nations';
import { executeChoice, checkVictory, skipTurn } from './services/turnExecutor';
import { runFullTurn } from './services/aiExecutor';
import GAME_CONFIG from './config/gameConfig';

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

type TabType = 'dashboard' | 'scelte' | 'fazioni' | 'vittoria' | 'space';
type MapView = '3d' | '2d';

const App: React.FC = () => {
  const { 
    currentNationId, 
    events, 
    isLoading,
    setCurrentNation,
    loadEvents,
  } = useGameStore();

  const [showFeed, setShowFeed] = useState(true);
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mapView, setMapView] = useState<MapView>('3d');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [executingChoice, setExecutingChoice] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);
  const [victoryState, setVictoryState] = useState<{ hasWon: boolean; hasLost: boolean; reason?: string } | null>(null);
  const [paRemaining, setPaRemaining] = useState<number>(GAME_CONFIG.PA_PER_TURN);

  const nations = NATIONS_LIST;

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
    setPaRemaining(GAME_CONFIG.PA_PER_TURN);
    setVictoryState(null);
  };

  const handleChoiceSelect = async (choice: Choice) => {
    if (!currentNationId || executingChoice || paRemaining < choice.cost.pa) return;
    
    setSelectedChoice(choice);
    setExecutingChoice(true);

    try {
      const result = await executeChoice(currentNationId, choice);
      
      if (result.success) {
        console.log('Azione eseguita:', result);
        setPaRemaining(prev => prev - choice.cost.pa);
        await loadEvents();
        
        if (result.winLose) {
          setVictoryState({ 
            hasWon: result.winLose === 'win', 
            hasLost: result.winLose === 'lose',
            reason: result.winLose === 'win' ? 'Hai vinto!' : 'Hai perso!'
          });
        }
      } else {
        console.error('Errore azione:', result.error);
      }
    } catch (error) {
      console.error('Execution error:', error);
    } finally {
      setExecutingChoice(false);
    }
  };

  const handleEndTurn = async () => {
    if (!currentNationId || executingChoice) return;
    
    setExecutingChoice(true);
    try {
      await skipTurn(currentNationId);
      
      const allNations = nations as any;
      const result = await runFullTurn(
        currentNationId,
        allNations,
        [],
        turnNumber
      );
      
      setTurnNumber(result.newTurn);
      setPaRemaining(GAME_CONFIG.PA_PER_TURN);
      await loadEvents();
      
      const victory = await checkVictory(currentNationId, turnNumber);
      if (victory.hasWon || victory.hasLost) {
        setVictoryState(victory);
      }
    } catch (error) {
      console.error('End turn error:', error);
    } finally {
      setExecutingChoice(false);
    }
  };

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
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setActiveTab('scelte')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'scelte' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                ⚡ Scelte
              </button>
              <button
                onClick={() => setActiveTab('fazioni')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'fazioni' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🏛️ Fazioni
              </button>
              <button
                onClick={() => setActiveTab('vittoria')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'vittoria' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🏆 Vittoria
              </button>
              <button
                onClick={() => setActiveTab('space')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'space' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🚀 Spazio
              </button>
              <button
                onClick={() => setShowFeed(!showFeed)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            {/* MAP VIEW */}
            <div className="lg:col-span-5 xl:col-span-4 h-[600px] bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-2 border-b border-slate-800">
                <span className="text-sm text-slate-400 px-2">Mappa</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setMapView('3d')}
                    className={`px-2 py-1 rounded text-xs ${
                      mapView === '3d' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    3D
                  </button>
                  <button
                    onClick={() => setMapView('2d')}
                    className={`px-2 py-1 rounded text-xs ${
                      mapView === '2d' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    2D
                  </button>
                </div>
              </div>
              <div className="flex-1">
                {mapView === '3d' ? (
                  <Globe3D 
                    currentNationId={currentNationId}
                    selectedNationId={selectedNationId}
                    onSelectNation={handleSelectNation}
                  />
                ) : (
                  <Map2D 
                    nations={nations as any}
                    selectedNation={selectedNationId || currentNationId || undefined}
                    onSelectNation={handleSelectNation}
                  />
                )}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-4 xl:col-span-5">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'scelte' && (
                <div className="h-[600px] overflow-hidden">
                  <ChoiceBrowser 
                    onSelectChoice={handleChoiceSelect} 
                    selectedNation={currentNationId || undefined}
                  />
                </div>
              )}
              {activeTab === 'fazioni' && (
                <div className="h-[600px] overflow-auto">
                  <FactionOverview 
                    factions={[
                      { id: 'progressives', name: 'Progressisti', type: 'Progressive', baseApproval: 35, weight: 0.3, demands: {}, mobilization: 30, status: 'neutral' },
                      { id: 'conservatives', name: 'Conservatori', type: 'Conservative', baseApproval: 30, weight: 0.25, demands: {}, mobilization: 25, status: 'neutral' },
                      { id: 'nationalists', name: 'Nazionalisti', type: 'Nationalist', baseApproval: 20, weight: 0.2, demands: {}, mobilization: 20, status: 'neutral' },
                      { id: 'globalists', name: 'Globalisti', type: 'Globalist', baseApproval: 15, weight: 0.15, demands: {}, mobilization: 15, status: 'neutral' },
                      { id: 'technocrats', name: 'Tecnocrati', type: 'Technocratic', baseApproval: 25, weight: 0.2, demands: {}, mobilization: 25, status: 'neutral' },
                    ]}
                    currentNationId={currentNationId || undefined}
                  />
                </div>
              )}
              {activeTab === 'vittoria' && (
                <VictoryProgress 
                  nations={nations as any}
                  currentNationId={currentNationId || ''}
                  turnNumber={turnNumber}
                />
              )}
              {activeTab === 'space' && <SpaceProgram />}
              
              {/* Turn Controls */}
              <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-slate-400 text-sm">Turno:</span>
                    <span className="ml-2 text-xl font-bold">{turnNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">PA:</span>
                    <span className="ml-2 text-xl font-bold text-blue-400">{paRemaining}</span>
                    <span className="text-slate-500">/{GAME_CONFIG.PA_PER_TURN}</span>
                  </div>
                </div>
                <button
                  onClick={handleEndTurn}
                  disabled={!currentNationId || executingChoice}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    executingChoice || !currentNationId
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  {executingChoice ? '⏳ Eseguendo...' : '▶️ Termina Turno (AI esegue)'}
                </button>
              </div>
              
              {/* Victory Alert */}
              {victoryState && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  victoryState.hasWon 
                    ? 'bg-green-900/30 border-green-500' 
                    : 'bg-red-900/30 border-red-500'
                }`}>
                  <span className={`text-lg font-bold ${
                    victoryState.hasWon ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {victoryState.hasWon ? '🎉 VITTORIA!' : '💀 SCONFITTA!'}
                  </span>
                  <p className="text-slate-300">{victoryState.reason}</p>
                </div>
              )}
            </div>

            {/* EVENT FEED */}
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
            GEOPOLITICA AVANZATA v1.3.0 | Simulazione Geopolitica 3D
          </div>
          <div className="flex gap-4">
            <span>Nazioni: {nations.length}</span>
            <span>•</span>
            <span>PA: {GAME_CONFIG.PA_PER_TURN}/turno</span>
            <span>•</span>
            <span>Vittoria: Consenso ≥{GAME_CONFIG.VICTORY_CONSENSUS_THRESHOLD}%</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;