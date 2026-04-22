import React from 'react';
import type { Choice } from '../../types';

interface ChoiceModalProps {
  choice: Choice;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ChoiceModal: React.FC<ChoiceModalProps> = ({ choice, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{choice.name}</h3>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">
          {choice.category} / {choice.subcategory}
        </div>
        <p className="text-slate-400 mb-4">{choice.description}</p>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Costo PA:</span>
            <span className="text-slate-200">{choice.cost.pa}</span>
          </div>
          
          {choice.cost.resources && Object.keys(choice.cost.resources).length > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Risorse:</span>
              <span className="text-slate-200">
                {Object.entries(choice.cost.resources)
                  .filter(([, v]) => v !== undefined && v > 0)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(', ') || 'nessuna'}
              </span>
            </div>
          )}
          
          {choice.effects && choice.effects.length > 0 && (
            <div className="border-t border-slate-700 pt-2">
              <div className="text-slate-400 mb-1">Effetti:</div>
              {choice.effects.map((effect, i) => (
                <div key={i} className="text-slate-300 ml-2">
                  {effect.target}: {effect.value > 0 ? '+' : ''}{effect.value} ({effect.type}, {effect.duration} turni)
                </div>
              ))}
            </div>
          )}
          
          {choice.risk && (
            <div className="text-amber-400">
              Rischio: {choice.risk.type} ({Math.round(choice.risk.probability * 100)}%)
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceModal;