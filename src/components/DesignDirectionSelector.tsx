import React from 'react';
import { useGameStore } from '../store/gameStore';

type Dir = 'A' | 'B' | 'C';

const DIRECTIONS: { key: Dir; label: string; description: string }[] = [
  {
    key: 'A',
    label: 'Opzione A — Cyber-minimal moderno',
    description: 'Palette scura, neon soft, profondità controllata, massima leggibilità.'
  },
  {
    key: 'B',
    label: 'Opzione B — Mondo isometrico narrativo',
    description: 'Atmosfera giocosa con nodi interattivi e mappe di interesse.'
  },
  {
    key: 'C',
    label: 'Opzione C — AAA cinematografico discreto',
    description: 'Luci filmiche, transizioni fluide, premium feel.'
  },
];

export const DesignDirectionSelector: React.FC = () => {
  const { designDirection, setDesignDirection } = useGameStore();

  const onSelect = (dir: Dir) => {
    setDesignDirection(dir);
  };

  return (
    <div className="design-direction-select p-2 rounded-lg bg-slate-800 border border-slate-700">
      <div className="text-sm text-slate-300 mb-2">Seleziona direzione estetica</div>
      <div className="flex flex-wrap gap-4">
        {DIRECTIONS.map((d) => {
          const isActive = designDirection === d.key;
          return (
            <button
              key={d.key}
              onClick={() => onSelect(d.key)}
              className={`w-72 p-4 rounded-lg border ${isActive ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-700 bg-slate-800 text-slate-200'}`}
              aria-label={d.label}
              title={d.description}
            >
              <div className="font-semibold mb-1">{d.label}</div>
              <div className="text-xs text-slate-400">{d.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesignDirectionSelector;
