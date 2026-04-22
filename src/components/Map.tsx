import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { useGameStore } from '../store/gameStore';
import type { Nation, Position } from '../types';
import { getNationById, NATIONS_LIST } from '../data/nations';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const NATION_COORDINATES: Record<string, { coordinates: [number, number]; labelOffset?: [number, number] }> = {};
NATIONS_LIST.forEach(n => {
  if (n.position) {
    NATION_COORDINATES[n.id] = { 
      coordinates: [n.position.lng, n.position.lat],
      labelOffset: [15, -15]
    };
  }
});

interface NationMarkerProps {
  nation: Nation;
  isSelected: boolean;
  isCurrentPlayer: boolean;
  gdp?: number;
  consensus?: number;
  onClick: () => void;
  onHover: (nation: Nation | null) => void;
}

const NationMarker: React.FC<NationMarkerProps> = ({
  nation,
  isSelected,
  isCurrentPlayer,
  gdp,
  consensus,
  onClick,
  onHover,
}) => {
  const position = NATION_POSITIONS[nation.id];
  
  if (!position) return null;

  const markerSize = isSelected ? 14 : isCurrentPlayer ? 12 : 10;
  const borderWidth = isCurrentPlayer ? 3 : 2;

  return (
    <Marker
      coordinates={position.coordinates}
      onMouseEnter={() => onHover(nation)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r={markerSize}
        fill={nation.color}
        stroke={isCurrentPlayer ? '#fff' : isSelected ? '#94a3b8' : 'transparent'}
        strokeWidth={borderWidth}
        className="transition-all hover:scale-125"
      />
      {isCurrentPlayer && (
        <circle
          r={markerSize + 4}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
          opacity={0.5}
          className="animate-pulse"
        />
      )}
      <title>{nation.name}</title>
    </Marker>
  );
};

const NATION_POSITIONS: Record<string, { coordinates: [number, number]; labelOffset?: [number, number] }> = NATION_COORDINATES;

export const Map: React.FC = () => {
  const { 
    nations, 
    currentNationId, 
    currentTurn,
    relations,
    setCurrentNation 
  } = useGameStore();

  const [hoveredNation, setHoveredNation] = useState<Nation | null>(null);
  const [selectedNation, setSelectedNation] = useState<string | null>(null);

  const currentNationRelations = useMemo(() => {
    if (!currentNationId) return {};
    return relations.reduce((acc, rel) => {
      const otherNation = rel.nation_a === currentNationId ? rel.nation_b : rel.nation_a;
      acc[otherNation] = rel.value;
      return acc;
    }, {} as Record<string, number>);
  }, [relations, currentNationId]);

  const handleNationClick = async (nation: Nation) => {
    setSelectedNation(nation.id);
    await setCurrentNation(nation.id);
  };

  const getRelationColor = (value: number): string => {
    if (value >= 50) return 'text-green-400';
    if (value >= 20) return 'text-emerald-400';
    if (value >= 0) return 'text-slate-400';
    if (value >= -20) return 'text-amber-400';
    if (value >= -50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRelationLabel = (value: number): string => {
    if (value >= 50) return 'Alleato';
    if (value >= 20) return 'Amico';
    if (value >= 0) return 'Neutrale';
    if (value >= -20) return 'Freddo';
    if (value >= -50) return 'Avversario';
    return 'Nemico';
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [10, 45],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#334155', outline: 'none' },
                    pressed: { fill: '#475569', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {nations.map((nation) => (
            <NationMarker
              key={nation.id}
              nation={nation}
              isSelected={selectedNation === nation.id}
              isCurrentPlayer={currentNationId === nation.id}
              gdp={currentTurn?.economy.gdp}
              consensus={currentTurn?.consensus.general}
              onClick={() => handleNationClick(nation)}
              onHover={setHoveredNation}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <div className="absolute top-4 left-4 bg-slate-900/95 p-4 rounded-lg border border-slate-700 max-w-xs">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">
          {hoveredNation ? hoveredNation.name : currentNationId ? 'Le Tue Relazioni' : 'Seleziona una Nazione'}
        </h3>
        
        {currentNationId && (
          <div className="space-y-2">
            {nations
              .filter(n => n.id !== currentNationId)
              .map(nation => {
                const relationValue = currentNationRelations[nation.id] ?? 0;
                return (
                  <div
                    key={nation.id}
                    className="flex items-center justify-between p-2 bg-slate-800 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{nation.flag_emoji}</span>
                      <span className="text-slate-300 text-sm">{nation.name}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getRelationColor(relationValue)}`}>
                        {relationValue > 0 ? '+' : ''}{relationValue}
                      </div>
                      <div className={`text-xs ${getRelationColor(relationValue)}`}>
                        {getRelationLabel(relationValue)}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
        <div className="bg-slate-900/95 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-400">Alleato (50+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span className="text-slate-400">Neutrale (0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-400">Nemico (-50)</span>
          </div>
        </div>
      </div>

      {hoveredNation && (
        <div className="absolute top-4 right-4 bg-slate-900/95 p-4 rounded-lg border border-slate-700 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{hoveredNation.flag_emoji}</span>
            <div>
              <div className="font-semibold text-slate-200">{hoveredNation.name}</div>
              <div className="text-xs text-slate-400">{hoveredNation.leader.name}</div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Ideologia</span>
              <span className="text-slate-200">{hoveredNation.leader.ideology}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Personalità</span>
              <span className="text-slate-200">{hoveredNation.leader.personality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Relazione</span>
              <span className={getRelationColor(currentNationRelations[hoveredNation.id] ?? 0)}>
                {currentNationRelations[hoveredNation.id] ?? 0}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleNationClick(hoveredNation)}
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Seleziona
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;