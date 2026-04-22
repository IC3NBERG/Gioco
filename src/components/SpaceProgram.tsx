import React from 'react';
import { useGameStore } from '../store/gameStore';
import type { TechTree, TechProgress } from '../types';
import { SPACE_QUESTS, BRANCH_INFO } from '../choices/space/choices';

interface BranchProgress {
  name: string;
  color: string;
  progress: number;
  level: number;
}

const BranchCard: React.FC<{ branch: BranchProgress; description: string }> = ({ branch, description }) => {
  const isActive = branch.progress > 0;

  return (
    <div 
      className="p-4 rounded-lg border"
      style={{ 
        borderColor: isActive ? branch.color : '#334155',
        backgroundColor: isActive ? `${branch.color}15` : '#0f172a'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold" style={{ color: isActive ? branch.color : '#94a3b8' }}>
          {branch.name}
        </h4>
        {isActive && (
          <span 
            className="px-2 py-1 text-xs rounded"
            style={{ backgroundColor: `${branch.color}30`, color: branch.color }}
          >
            LIV {branch.level}
          </span>
        )}
      </div>
      <div className="text-sm text-slate-400 mb-2">{description}</div>
      {isActive && (
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500"
            style={{ 
              width: `${Math.min(100, branch.progress)}%`,
              backgroundColor: branch.color
            }}
          />
        </div>
      )}
    </div>
  );
};

const QuestCard: React.FC<{
  quest: typeof SPACE_QUESTS[0];
  onClick: () => void;
  paRemaining: number;
  isLoading: boolean;
}> = ({ quest, onClick, paRemaining, isLoading }) => {
  const canStart = quest.status === 'available' && paRemaining >= 1;

  return (
    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-sm font-medium text-slate-200">{quest.name}</h5>
          <p className="text-xs text-slate-500">{quest.description}</p>
        </div>
        <button
          onClick={onClick}
          disabled={!canStart || isLoading}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            !canStart || isLoading
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-blue-900/50 text-blue-400 hover:bg-blue-800'
          }`}
        >
          {quest.status === 'completed' ? '✅' : quest.status === 'in_progress' ? '⏳' : '▶'}
        </button>
      </div>
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

  const branches: BranchProgress[] = [
    { 
      name: 'Lanciatori Pesanti', 
      color: BRANCH_INFO.heavy.color,
      progress: (tech as any).heavy_launchers?.progress || 0,
      level: (tech as any).heavy_launchers?.level || 0
    },
    { 
      name: 'Costellazioni', 
      color: BRANCH_INFO.light.color,
      progress: (tech as any).light_launchers?.progress || 0,
      level: (tech as any).light_launchers?.level || 0
    },
    { 
      name: 'Risposta Rapida', 
      color: BRANCH_INFO.fast.color,
      progress: (tech as any).fast_launchers?.progress || 0,
      level: (tech as any).fast_launchers?.level || 0
    },
    { 
      name: 'Economia Spaziale', 
      color: BRANCH_INFO.economy.color,
      progress: (tech as any).economy_launchers?.progress || 0,
      level: (tech as any).economy_launchers?.level || 0
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
          <p className="text-slate-400 text-sm">Sviluppa la tua presenza nello spazio</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚀</span>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Rami Tecnologici</h3>
        <p className="text-slate-400 text-sm mb-4">
          Scegli il tuo percorso: ogni rama offre bonus unici
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {branches.map((branch, idx) => (
            <BranchCard 
              key={idx} 
              branch={branch} 
              description={Object.values(BRANCH_INFO)[idx].description} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-blue-900/50 bg-blue-950/30">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">Progressione Classica</h4>
          <div className="space-y-3">
            <TechProgressItem name="Lanciatori" level={tech.launchers.level} progress={tech.launchers.progress} />
            <TechProgressItem name="Satelliti" level={tech.satellites.level} progress={tech.satellites.progress} />
            <TechProgressItem name="Stazione" level={tech.stations.level} progress={tech.stations.progress} />
            <TechProgressItem name="Luna" level={tech.lunar.level} progress={tech.lunar.progress} />
            <TechProgressItem name="Marte" level={tech.mars.level} progress={tech.mars.progress} />
          </div>
        </div>
        <div className="p-4 rounded-lg border border-purple-900/50 bg-purple-950/30">
          <h4 className="text-lg font-semibold text-purple-300 mb-3">Missioni Attive</h4>
          <div className="space-y-2">
            {SPACE_QUESTS.slice(0, 4).map((quest) => (
              <QuestCard 
                key={quest.id}
                quest={quest}
                onClick={() => handleUpgrade(quest.id)}
                paRemaining={paRemaining}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Azioni Spaziali</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleUpgrade('launcher_upgrade')}
            disabled={isLoading || paRemaining < 1 || tech.launchers.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.launchers.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Potenzia Lanciatori
          </button>
          <button
            onClick={() => handleUpgrade('satellite_deployment')}
            disabled={isLoading || paRemaining < 1 || tech.launchers.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.launchers.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Lancia Satelliti
          </button>
          <button
            onClick={() => handleUpgrade('space_station_construction')}
            disabled={isLoading || paRemaining < 1 || tech.satellites.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.satellites.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Costruisci Stazione
          </button>
          <button
            onClick={() => handleUpgrade('lunar_program')}
            disabled={isLoading || paRemaining < 1 || tech.stations.level < 2}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.stations.level < 2
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Programma Lunare
          </button>
          <button
            onClick={() => handleUpgrade('mars_mission_prep')}
            disabled={isLoading || paRemaining < 1 || tech.lunar.level < 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLoading || paRemaining < 1 || tech.lunar.level < 1
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            Prepara Marcia
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Obiettivi di Vittoria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <div>
              <span className="text-slate-300 block">Base Lunare livello 3</span>
              <span className="text-slate-500 text-xs">Colonizzazione permanente</span>
            </div>
            <span className={tech.lunar.level >= 3 ? 'text-green-400' : 'text-slate-500'}>
              {tech.lunar.level >= 3 ? '✅' : `${tech.lunar.level}/3`}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <div>
              <span className="text-slate-300 block">Colonia Marziana</span>
              <span className="text-slate-500 text-xs">Presenza autonoma su Marte</span>
            </div>
            <span className={tech.mars.level >= 2 ? 'text-green-400' : 'text-slate-500'}>
              {tech.mars.level >= 2 ? '✅' : `${tech.mars.level}/2`}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <div>
              <span className="text-slate-300 block">Dominio Orbitale</span>
              <span className="text-slate-500 text-xs">Controllo costellazione</span>
            </div>
            <span className="text-slate-500">TODO</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <div>
              <span className="text-slate-300 block">Riserva Mineraria</span>
              <span className="text-slate-500 text-xs">Estrazione asteroidi</span>
            </div>
            <span className="text-slate-500">TODO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechProgressItem: React.FC<{ name: string; level: number; progress: number }> = ({ name, level, progress }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-300 text-sm">{name}</span>
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${level > 0 ? 'bg-blue-500' : 'bg-slate-700'}`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <span className={`text-xs ${level > 0 ? 'text-blue-400' : 'text-slate-600'}`}>
        {level > 0 ? `Lv${level}` : '🔒'}
      </span>
    </div>
  </div>
);

export default SpaceProgram;