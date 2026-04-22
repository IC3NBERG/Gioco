import React from 'react';
import type { Faction } from '../../types';

interface FactionsPanelProps {
  factions: Faction[];
  maxShow?: number;
}

const getStatusColor = (status?: Faction['status']): string => {
  switch (status) {
    case 'loyal': return 'text-green-400';
    case 'opposition': return 'text-red-400';
    case 'hostile': return 'text-red-600';
    default: return 'text-slate-400';
  }
};

const getStatusLabel = (status?: Faction['status']): string => {
  switch (status) {
    case 'loyal': return 'Leale';
    case 'opposition': return 'Opposizione';
    case 'hostile': return 'Ostile';
    default: return 'Neutrale';
  }
};

const formatApproval = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
};

export const FactionsPanel: React.FC<FactionsPanelProps> = ({ 
  factions,
  maxShow = 6 
}) => {
  const sortedFactions = [...factions].sort((a, b) => b.influence - a.influence);
  const displayFactions = sortedFactions.slice(0, maxShow);

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-200">Fazioni</h3>
        <span className="text-xs text-slate-500">{factions.length} totali</span>
      </div>

      <div className="space-y-3">
        {displayFactions.length === 0 ? (
          <div className="text-center text-slate-500 py-4">
            Nessuna fazione
          </div>
        ) : (
          displayFactions.map((faction) => (
            <div key={faction.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-200 font-medium">{faction.name}</span>
                  <span className={`text-xs ${getStatusColor(faction.status)}`}>
                    {getStatusLabel(faction.status)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-300 text-sm">
                    {faction.influence}%
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all ${
                    faction.influence >= 50 ? 'bg-blue-500' :
                    faction.influence >= 30 ? 'bg-cyan-500' :
                    'bg-slate-500'
                  }`}
                  style={{ width: `${Math.min(faction.influence, 100)}%` }}
                />
              </div>

              {faction.demands && Object.keys(faction.demands).length > 0 && (
                <div className="text-xs text-slate-500 pl-2">
                  Richieste: {Object.keys(faction.demands).length}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {factions.length > maxShow && (
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-700">
          +{factions.length - maxShow} altre
        </div>
      )}
    </div>
  );
};

export default FactionsPanel;