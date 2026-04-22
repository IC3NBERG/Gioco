import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { DashboardStats, ChoiceCategory } from '../types';
import { CHOICES_BY_CATEGORY, ALL_CHOICES, getChoiceById } from '../choices';

const StatCard: React.FC<{
  label: string;
  value: number | string;
  subValue?: string;
  change?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}> = ({ label, value, subValue, change, variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-slate-800 border-slate-700',
    success: 'bg-green-900/30 border-green-700',
    warning: 'bg-amber-900/30 border-amber-700',
    danger: 'bg-red-900/30 border-red-700',
  };

  const valueClasses = {
    default: 'text-slate-100',
    success: 'text-green-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
  };

  return (
    <div className={`p-4 rounded-lg border ${variantClasses[variant]} transition-all hover:scale-[1.02]`}>
      <div className="text-sm text-slate-400 uppercase tracking-wider">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${valueClasses[variant]}`}>
        {typeof value === 'number' ? value.toLocaleString('it-IT') : value}
      </div>
      {subValue && (
        <div className="text-xs text-slate-500 mt-1">{subValue}</div>
      )}
      {change !== undefined && (
        <div className={`text-xs mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      )}
    </div>
  );
};

const ProgressBar: React.FC<{
  label: string;
  value: number;
  max?: number;
  color?: string;
}> = ({ label, value, max = 100, color = 'bg-blue-500' }) => {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{value}/{max}</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { 
    currentTurn, 
    currentNationId, 
    nations, 
    paRemaining,
    pendingActions,
    isLoading,
    addAction,
    removeAction,
    resolveTurn,
    error 
  } = useGameStore();

  if (!currentTurn) {
    return (
      <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
        <div className="text-slate-400 text-center py-12">
          <p className="text-lg">Seleziona una nazione per iniziare</p>
          <p className="text-sm mt-2 text-slate-500">Scegli la tua nazione dalla mappa</p>
        </div>
      </div>
    );
  }

  const economy = currentTurn.economy;
  const consensus = currentTurn.consensus;
  const nation = nations.find(n => n.id === currentNationId);

  const stats: DashboardStats = {
    turnNumber: currentTurn.turn_number,
    paRemaining: paRemaining,
    gdp: economy.gdp,
    gdpGrowth: economy.growth,
    inflation: economy.inflation,
    debt: economy.debt,
    debtGdp: economy.debt_gdp,
    consensus: consensus.general,
    unemployment: economy.unemployment,
    reserves: economy.reserves,
  };

  const paVariant = paRemaining === 3 ? 'success' : paRemaining === 2 ? 'warning' : 'danger';
  const gdpVariant = stats.gdpGrowth >= 3 ? 'success' : stats.gdpGrowth >= 0 ? 'default' : 'danger';
  const debtVariant = stats.debtGdp > 150 ? 'danger' : stats.debtGdp > 100 ? 'warning' : 'default';
  const consensusVariant = stats.consensus >= 60 ? 'success' : stats.consensus >= 40 ? 'warning' : 'danger';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            {nation?.name || 'Nazione'}
          </h2>
          <p className="text-slate-400 text-sm">
            Turno {stats.turnNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{nation?.flag_emoji}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Punti Azione"
          value={stats.paRemaining}
          subValue="disponibili"
          variant={paVariant}
        />
        <StatCard
          label="PIL"
          value={`$${(stats.gdp / 1000).toFixed(1)}M`}
          change={stats.gdpGrowth}
          variant={gdpVariant}
        />
        <StatCard
          label="Inflazione"
          value={`${stats.inflation}%`}
          variant={stats.inflation > 8 ? 'danger' : stats.inflation > 4 ? 'warning' : 'default'}
        />
        <StatCard
          label="Consenso"
          value={`${stats.consensus}%`}
          variant={consensusVariant}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Economia</h3>
          <div className="space-y-4">
            <ProgressBar label="PIL Disponibile" value={stats.gdp} max={2000} color="bg-emerald-500" />
            <ProgressBar label="Riserve" value={stats.reserves} max={200} color="bg-amber-500" />
            <ProgressBar label="Disoccupazione" value={stats.unemployment} max={25} color="bg-red-500" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Debito</div>
                <div className={`font-bold ${stats.debtVariant === 'danger' ? 'text-red-400' : stats.debtVariant === 'warning' ? 'text-amber-400' : 'text-slate-200'}`}>
                  ${stats.debt.toLocaleString('it-IT')}
                </div>
              </div>
              <div className="text-center p-3 bg-slate-900 rounded">
                <div className="text-xs text-slate-400">Debito/PIL</div>
                <div className={`font-bold ${debtVariant === 'danger' ? 'text-red-400' : debtVariant === 'warning' ? 'text-amber-400' : 'text-slate-200'}`}>
                  {stats.debtGdp}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Consenso</h3>
          <div className="space-y-3">
            <ProgressBar label="Generale" value={consensus.general} color="bg-blue-500" />
            <ProgressBar label="Economico" value={consensus.economic} color="bg-emerald-500" />
            <ProgressBar label="Sicurezza" value={consensus.security} color="bg-purple-500" />
            <ProgressBar label="Libertà" value={consensus.freedom} color="bg-cyan-500" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Azioni del Turno
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({pendingActions.length}/3 PA)
          </span>
        </h3>
        
        {pendingActions.length > 0 ? (
          <div className="space-y-2">
            {pendingActions.map((action, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-slate-900 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">{index + 1}.</span>
                  <span className="text-slate-200">{action.action_type}</span>
                  {action.target && (
                    <span className="text-slate-500 text-sm">→ {action.target}</span>
                  )}
                </div>
                <button
                  onClick={() => removeAction(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-4">
            Nessuna azione in coda. Aggiungi azioni dalla console sottostante.
          </p>
        )}

        <div className="mt-4">
          <CategoryActions 
            paRemaining={paRemaining} 
            isLoading={isLoading}
            onAddAction={addAction}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => resolveTurn()}
            disabled={isLoading || pendingActions.length === 0}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              isLoading || pendingActions.length === 0
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02]'
            }`}
          >
            {isLoading ? 'Elaborazione...' : 'Conferma Turno'}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
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

interface CategoryActionsProps {
  paRemaining: number;
  isLoading: boolean;
  onAddAction: (action: { action_type: string; target?: string; params?: Record<string, unknown> }) => boolean;
}

const CategoryActions: React.FC<CategoryActionsProps> = ({ paRemaining, isLoading, onAddAction }) => {
  const [activeCategory, setActiveCategory] = useState<ChoiceCategory | 'all'>('all');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const categories: ChoiceCategory[] = ['diplomazia', 'economia', 'militare', 'politica', 'tecnologia', 'cultura'];

  const getChoices = () => {
    if (activeCategory === 'all') return ALL_CHOICES;
    return CHOICES_BY_CATEGORY[activeCategory] || [];
  };

  const canAfford = (choice: any) => paRemaining >= choice.cost.pa;

  const handleChoiceClick = (choice: any) => {
    if (!canAfford(choice)) return;
    setSelectedChoiceId(choice.id);
  };

  const handleConfirm = () => {
    if (!selectedChoiceId) return;
    onAddAction({ action_type: selectedChoiceId });
    setSelectedChoiceId(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1 flex-wrap">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-slate-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Tutti
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              activeCategory === cat ? 'bg-slate-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto">
        {getChoices().slice(0, 15).map((choice) => {
          const affordable = canAfford(choice);
          return (
            <div
              key={choice.id}
              onClick={() => handleChoiceClick(choice)}
              className={`p-2 rounded border transition-all cursor-pointer ${
                affordable 
                  ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
                  : 'bg-slate-800/40 border-slate-700/50 opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] text-white ${getCategoryColor(choice.category)}`}>
                    {choice.category.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-slate-200 text-xs truncate">{choice.name}</span>
                </div>
                <span className={`text-xs shrink-0 ${affordable ? 'text-blue-400' : 'text-slate-600'}`}>
                  {choice.cost.pa}PA
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedChoiceId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 max-w-sm w-full">
            {(() => {
              const choice = getChoiceById(selectedChoiceId);
              if (!choice) return null;
              return (
                <>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">{choice.name}</h3>
                  <p className="text-slate-400 text-xs mb-3">{choice.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedChoiceId(null)}
                      className="flex-1 py-2 bg-slate-700 text-slate-300 rounded"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-2 bg-blue-600 text-white rounded"
                    >
                      Conferma
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

const ActionButton: React.FC<{
  action: string;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}> = ({ label, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      disabled
        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
    }`}
  >
    {label}
  </button>
);

export default Dashboard;