import React from 'react';
import type { Economy, Consensus, TechTree } from '../../types';

interface StatsPanelProps {
  economy: Economy | null;
  consensus: Consensus | null;
  tech: TechTree | null;
  turnNumber: number;
  nationName?: string;
}

const formatNumber = (num: number | undefined, decimals: number = 1): string => {
  if (num === undefined) return '-';
  return num.toFixed(decimals);
};

const formatPercent = (num: number | undefined): string => {
  if (num === undefined) return '-';
  return `${num.toFixed(1)}%`;
};

const getTechLevelName = (key: keyof TechTree): string => {
  const names: Record<string, string> = {
    launchers: 'Lanciatori',
    satellites: 'Satelliti',
    stations: 'Stazioni',
    lunar: 'Luna',
    mars: 'Marte',
  };
  return names[key] || key;
};

export const StatsPanel: React.FC<StatsPanelProps> = ({
  economy,
  consensus,
  tech,
  turnNumber,
  nationName,
}) => {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-200">Statistiche</h3>
        {nationName && (
          <span className="text-sm text-slate-400">{nationName}</span>
        )}
      </div>
      
      <div className="text-xs text-slate-500 uppercase tracking-wider">
        Turno {turnNumber}
      </div>

      {economy && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-1">Economia</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-slate-400">GDP:</div>
            <div className="text-slate-200 text-right">{formatNumber(economy.gdp)}</div>
            
            <div className="text-slate-400">Crescita:</div>
            <div className={`text-right ${economy.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(economy.growth)}
            </div>
            
            <div className="text-slate-400">Inflazione:</div>
            <div className="text-slate-200 text-right">{formatPercent(economy.inflation)}</div>
            
            <div className="text-slate-400">Debito/GDP:</div>
            <div className="text-slate-200 text-right">{formatPercent(economy.debt_gdp)}</div>
            
            <div className="text-slate-400">Disoccupazione:</div>
            <div className="text-slate-200 text-right">{formatPercent(economy.unemployment)}</div>
            
            <div className="text-slate-400">Riserve:</div>
            <div className="text-slate-200 text-right">{formatNumber(economy.reserves)}</div>
          </div>
        </div>
      )}

      {consensus && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-1">Consenso</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Generale</span>
              <span className="text-slate-200">{formatPercent(consensus.general)}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all" 
                style={{ width: `${consensus.general}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm mt-2">
              <span className="text-slate-400">Economico</span>
              <span className="text-slate-200">{formatPercent(consensus.economic)}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{ width: `${consensus.economic}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm mt-2">
              <span className="text-slate-400">Sicurezza</span>
              <span className="text-slate-200">{formatPercent(consensus.security)}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all" 
                style={{ width: `${consensus.security}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {tech && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-1">Tecnologia</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {(['launchers', 'satellites', 'stations', 'lunar', 'mars'] as const).map(key => (
              <React.Fragment key={key}>
                <div className="text-slate-400">{getTechLevelName(key)}:</div>
                <div className="text-slate-200 text-right">
                  Lv. {tech[key]?.level || 0} ({tech[key]?.progress || 0}%)
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;