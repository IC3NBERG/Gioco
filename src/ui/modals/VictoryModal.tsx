import React from 'react';

interface VictoryModalProps {
  result: 'win' | 'lose';
  turnNumber: number;
  stats?: {
    finalGdp?: number;
    finalConsensus?: number;
    gdpRank?: number;
  };
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ 
  result, 
  turnNumber, 
  stats,
  onPlayAgain, 
  onMainMenu 
}) => {
  const isWin = result === 'win';
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className={`bg-slate-900 rounded-xl border-2 p-8 max-w-md w-full text-center ${
        isWin ? 'border-green-500' : 'border-red-500'
      }`}>
        <div className={`text-6xl mb-4`}>
          {isWin ? '🏆' : '💀'}
        </div>
        
        <h2 className={`text-3xl font-bold mb-2 ${
          isWin ? 'text-green-400' : 'text-red-400'
        }`}>
          {isWin ? 'VITTORIA!' : 'SCONFITTA'}
        </h2>
        
        <p className="text-slate-400 mb-6">
          {isWin 
            ? 'Hai conquistato il mondo!' 
            : 'Il tuo mandato è terminato.'}
        </p>
        
        <div className="space-y-2 text-sm mb-6 bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Turni giocati:</span>
            <span className="text-slate-200">{turnNumber}</span>
          </div>
          
          {stats?.finalGdp && (
            <div className="flex justify-between">
              <span className="text-slate-400">GDP Finale:</span>
              <span className="text-slate-200">{stats.finalGdp.toLocaleString()}</span>
            </div>
          )}
          
          {stats?.finalConsensus && (
            <div className="flex justify-between">
              <span className="text-slate-400">Consenso:</span>
              <span className="text-slate-200">{stats.finalConsensus}%</span>
            </div>
          )}
          
          {stats?.gdpRank && (
            <div className="flex justify-between">
              <span className="text-slate-400">Posizione GDP:</span>
              <span className="text-slate-200">#{stats.gdpRank}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onMainMenu}
            className="flex-1 py-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 font-medium"
          >
            Menu Principale
          </button>
          <button
            onClick={onPlayAgain}
            className={`flex-1 py-3 rounded-lg font-medium ${
              isWin 
                ? 'bg-green-600 text-white hover:bg-green-500' 
                : 'bg-red-600 text-white hover:bg-red-500'
            }`}
          >
            Gioca Ancora
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;