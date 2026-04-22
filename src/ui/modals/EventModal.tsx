import React from 'react';
import type { GameEventData } from '../../core/eventSystem';

interface EventModalProps {
  event: GameEventData;
  onClose: () => void;
}

const getSeverityColor = (severity: GameEventData['severity']) => {
  const colors = {
    positive: 'text-green-400 border-green-600',
    neutral: 'text-slate-400 border-slate-600',
    negative: 'text-amber-400 border-amber-600',
    critical: 'text-red-400 border-red-600',
  };
  return colors[severity] || colors.neutral;
};

const getCategoryLabel = (category: GameEventData['category']) => {
  const labels = {
    disastro: 'Disastro',
    crisi: 'Crisi',
    scoperta: 'Scoperta',
    rivelazione: 'Rivelazione',
    movimento: 'Movimento',
    unico: 'Evento Unico',
  };
  return labels[category] || category;
};

const formatEffect = (effect: { target: string; value: number; type: string; duration: number }) => {
  return `${effect.target}: ${effect.value > 0 ? '+' : ''}${effect.value} (${effect.type}, ${effect.duration} turni)`;
};

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-slate-900 rounded-xl border-2 p-6 max-w-md w-full ${getSeverityColor(event.severity)}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider bg-slate-800 px-2 py-1 rounded">
            {getCategoryLabel(event.category)}
          </span>
          <span className={`text-xs uppercase ${
            event.severity === 'critical' ? 'text-red-400' :
            event.severity === 'positive' ? 'text-green-400' :
            event.severity === 'negative' ? 'text-amber-400' : 'text-slate-400'
          }`}>
            {event.severity}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 mb-2">{event.name}</h3>
        <p className="text-slate-400 mb-4">{event.description}</p>
        
        {event.effects.length > 0 && (
          <div className="border-t border-slate-700 pt-2 mb-4">
            <div className="text-slate-400 mb-1">Effetti:</div>
            {event.effects.map((effect, i) => (
              <div key={i} className="text-slate-300 ml-2">
                {formatEffect(effect)}
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
        >
          Continua
        </button>
      </div>
    </div>
  );
};

export default EventModal;