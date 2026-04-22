import { useMemo } from 'react';
import { countryColors, type GameNation } from '../types';

interface Map2DProps {
  nations: GameNation[];
  selectedNation?: string;
  onSelectNation: (nationId: string) => void;
}

export function Map2D({ nations, selectedNation, onSelectNation }: Map2DProps) {
  const grid = useMemo(() => {
    const cells: Array<{ nation: GameNation | null; x: number; y: number }> = [];
    
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const index = y * 10 + x;
        cells.push({
          nation: nations[index] || null,
          x,
          y,
        });
      }
    }
    return cells;
  }, [nations]);

  const getNationColor = (nation: GameNation | null) => {
    if (!nation) return '#1a1a2e';
    
    if (nation.id === selectedNation) return '#fbbf24';
    
    if (nation.isPlayer) return '#22d3ee';
    
    const relation = nation.relations?.find(r => r.nationId === selectedNation)?.value;
    if (relation !== undefined) {
      if (relation > 50) return '#4ade80';
      if (relation > 0) return '#22c55e';
      if (relation > -50) return '#f97316';
      return '#ef4444';
    }
    
    return countryColors[nation.id] || '#6366f1';
  };

  return (
    <div className="map-2d">
      <div className="map-grid">
        {grid.map(({ nation, x, y }) => (
          <div
            key={`${x}-${y}`}
            className={`map-cell ${nation ? 'has-nation' : ''} ${selectedNation === nation?.id ? 'selected' : ''}`}
            style={{ backgroundColor: getNationColor(nation) }}
            onClick={() => nation && onSelectNation(nation.id)}
            title={nation?.name}
          >
            {nation && (
              <span className="cell-label">
                {nation.code}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#22d3ee' }} />
          <span>La tua nazione</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4ade80' }} />
          <span>Alleati</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#22c55e' }} />
          <span>Neutrali positivi</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f97316' }} />
          <span>Neutrali negativi</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ef4444' }} />
          <span>Hostili</span>
        </div>
      </div>
    </div>
  );
}