import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Choice, ChoiceCategory, ChoiceRequirement } from '../types';
import { ALL_CHOICES, CHOICES_BY_CATEGORY, getChoiceById } from '../choices';

interface ChoiceModalProps {
  choice: Choice;
  onConfirm: () => void;
  onCancel: () => void;
}

const ChoiceModal: React.FC<ChoiceModalProps> = ({ choice, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{choice.name}</h3>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">{choice.category} / {choice.subcategory}</div>
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

const getCategoryColor = (category: ChoiceCategory): string => {
  const colors: Record<ChoiceCategory, string> = {
    economia: 'bg-emerald-600',
    militare: 'bg-red-600',
    politica: 'bg-purple-600',
    diplomazia: 'bg-blue-600',
    tecnologia: 'bg-cyan-600',
    cultura: 'bg-pink-600',
  };
  return colors[category] || 'bg-slate-600';
};

const getCategoryLabel = (category: ChoiceCategory): string => {
  const labels: Record<ChoiceCategory, string> = {
    economia: 'Economia',
    militare: 'Militare',
    politica: 'Politica',
    diplomazia: 'Diplomazia',
    tecnologia: 'Tecnologia',
    cultura: 'Cultura',
  };
  return labels[category] || category;
};

interface ActionPanelProps {
  onSelectChoice: (action: { action_type: string; target?: string; params?: Record<string, unknown> }) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onSelectChoice }) => {
  const { currentTurn, paRemaining, isLoading } = useGameStore();
  const [activeCategory, setActiveCategory] = useState<ChoiceCategory | 'all'>('all');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const categories: ChoiceCategory[] = ['diplomazia', 'economia', 'militare', 'politica', 'tecnologia', 'cultura'];

  const checkRequirements = (requirements?: ChoiceRequirement): boolean => {
    if (!requirements || !currentTurn) return true;
    
    const economy = currentTurn.economy;
    
    if (requirements.stability !== undefined && (currentTurn.consensus?.general || 0) < requirements.stability) return false;
    if (requirements.gdp !== undefined && economy.gdp < requirements.gdp) return false;
    if (requirements.technology !== undefined && (currentTurn.tech?.launchers?.level || 0) < requirements.technology) return false;
    if (requirements.diplomacy !== undefined && (currentTurn.tech?.launchers?.level || 0) < requirements.diplomacy) return false;
    
    return true;
  };

  const getChoices = (): Choice[] => {
    if (activeCategory === 'all') {
      return ALL_CHOICES;
    }
    return CHOICES_BY_CATEGORY[activeCategory] || [];
  };

  const canAfford = (choice: Choice): boolean => {
    return paRemaining >= choice.cost.pa && checkRequirements(choice.requirements);
  };

  const handleChoiceClick = (choice: Choice) => {
    if (!canAfford(choice)) return;
    setSelectedChoice(choice);
  };

  const handleConfirm = () => {
    if (!selectedChoice) return;
    
    const action = {
      action_type: selectedChoice.id,
      target: undefined,
      params: {
        choice_id: selectedChoice.id,
        category: selectedChoice.category,
        subcategory: selectedChoice.subcategory,
      },
    };
    
    onSelectChoice(action);
    setSelectedChoice(null);
  };

  const displayedChoices = getChoices().slice(0, 20);

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            activeCategory === 'all' 
              ? 'bg-slate-500 text-white' 
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Tutti ({ALL_CHOICES.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-slate-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {getCategoryLabel(cat)} ({CHOICES_BY_CATEGORY[cat]?.length || 0})
          </button>
        ))}
      </div>

      {paRemaining < 3 && (
        <div className="text-xs text-amber-400 p-2 bg-amber-900/20 rounded">
          PA disponibili: {paRemaining}/3
        </div>
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {displayedChoices.map((choice) => {
          const affordable = canAfford(choice);
          return (
            <div
              key={choice.id}
              onClick={() => handleChoiceClick(choice)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                affordable 
                  ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
                  : 'bg-slate-800/40 border-slate-700/50 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] text-white ${getCategoryColor(choice.category)}`}>
                      {choice.category}
                    </span>
                    <span className="text-slate-200 text-sm font-medium truncate">{choice.name}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{choice.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xs font-medium ${affordable ? 'text-blue-400' : 'text-slate-600'}`}>
                    {choice.cost.pa} PA
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {displayedChoices.length === 0 && (
        <div className="text-center text-slate-500 py-4">
          Nessuna azione disponibile per questa categoria
        </div>
      )}

      {selectedChoice && (
        <ChoiceModal
          choice={selectedChoice}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedChoice(null)}
        />
      )}
    </div>
  );
};

export default ActionPanel;