import React from 'react';
import { useGameStore } from '../store/gameStore';
import type { TechTree, TechProgress } from '../types';

interface TechCardProps {
  name: string;
  tech: TechProgress;
  description: string;
  cost: number;
  unlockReq: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, tech, description, cost, unlockReq }) => {
  const progressPercent = Math.min(100, tech.progress);
  const isUnlocked = tech.level > 0;
  const canUpgrade = tech.level > 0 || unlockReq === 'None';

  return (
    <div className={`p-4 rounded-lg border ${isUnlocked ? 'bg-slate-800/50 border-blue-700' : 'bg-slate-900 border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-slate-200">{name}</h4>
        {isUnlocked && <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded">LIVELLO {tech.level}</span>}
      </div>
      <div className="text-sm text-slate-400 mb-2">{description}</div>
      {!isUnlocked && (
        <div className="text-xs text-slate-500 mb-2">Richiede: {unlockReq}</div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Progresso</span>
          <span className="text-slate-300">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isUnlocked ? 'bg-blue-500' : 'bg-slate-600'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      {canUpgrade && !isUnlocked && (
        <div className="mt-3 text-xs text-amber-400">
          Costo upgrade: {cost} unità
        </div>
      )}
    </div>
  );
};

export const SpaceProgram: React.FC = () => {
  const { currentTurn, addAction, paRemaining, isLoading } = useGameStore();
  
  const tech = currentTurn?.tech;
  
  if (!tech) {
    return (
      <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
        <div className="text-slate-400 text-center py-12">
          <p className="text-lg">Seleziona una nazione per accedere al programma spaziale</p>
        </div>
      </div>
    );
  }

  const techs: TechCardProps[] = [
    { 
      name: 'Lanciatori', 
      tech: tech.launchers, 
      description: 'Razzi vettore per lancio orbitali',
      cost: 80,
      unlockReq: 'None'
    },
    { 
      name: 'Satelliti', 
      tech: tech.satellites, 
      description: 'Satelliti per osservazione e comunicazione',
      cost: 100,
      unlockReq: 'Lanciatori livello 1'
    },
    { 
      name: 'Stazione Spaziale', 
      tech: tech.stations, 
      description: 'Piattaforma orbitale abitata',
      cost: 150,
      unlockReq: 'Satelliti livello 2'
    },
    { 
      name: 'Base Lunare', 
      tech: tech.lunar, 
      description: 'Presenza umana permanente sulla Luna',
      cost: 300,
      unlockReq: 'Stazione Spaziale livello 2'
    },
    { 
      name: 'Missione Marziana', 
      tech: tech.mars, 
      description: 'Primo sbarco su Marte',
      cost: 500,
      unlockReq: 'Base Lunare livello 2'
    },
  ];

  const handleUpgrade = (actionType: string) => {
    if (paRemaining < 1) return;
    addAction({ action_type: actionType });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Programma Spaziale</h2>
          <p className="text-slate-400 text-sm">Sviluppa la tua capacità spaziale</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚀</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {techs.map((t) => (
          <TechCard key={t.name} {...t} />
        ))}
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Progetti Spaziali</h3>
        <p className="text-slate-400 text-sm mb-4">
          Usa i Punti Azione (PA) per avviare progetti spaziali. Ogni progetto richiede risorse e tempo.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleUpgrade('space_launch')}
            disabled={isLoading || paRemaining < 1 || tech.launchers.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.launchers.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Lancio Spaziale
          </button>
          <button
            onClick={() => handleUpgrade('deploy_satellite')}
            disabled={isLoading || paRemaining < 1 || tech.satellites.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.satellites.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Dispiegamento Satelliti
          </button>
          <button
            onClick={() => handleUpgrade('build_station')}
            disabled={isLoading || paRemaining < 1 || tech.stations.level < 2}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.stations.level < 2
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Costruisci Stazione
          </button>
          <button
            onClick={() => handleUpgrade('lunar_mission')}
            disabled={isLoading || paRemaining < 1 || tech.lunar.level < 2}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.lunar.level < 2
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Missione Lunare
          </button>
          <button
            onClick={() => handleUpgrade('mars_mission')}
            disabled={isLoading || paRemaining < 1 || tech.mars.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.mars.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Missione Marziana
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Condizioni di Vittoria Spaziale</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
            <span className="text-slate-300">Base Lunare livello 3</span>
            <span className={tech.lunar.level >= 3 ? 'text-green-400' : 'text-slate-500'}>
              {tech.lunar.level >= 3 ? '✅ Completato' : `_progress: ${tech.lunar.level}/3`}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
            <span className="text-slate-300">Missione Marziana completata</span>
            <span className={tech.mars.level >= 2 ? 'text-green-400' : 'text-slate-500'}>
              {tech.mars.level >= 2 ? '✅ Completato' : 'In progresso'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceProgram;