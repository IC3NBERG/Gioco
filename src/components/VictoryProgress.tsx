import { useMemo } from 'react';
import type { GameNation } from '../types';

interface VictoryProgressProps {
  nations: GameNation[];
  currentNationId: string;
  turnNumber: number;
}

export function VictoryProgress({ nations, currentNationId, turnNumber }: VictoryProgressProps) {
  const currentNation = nations.find(n => n.id === currentNationId);
  
  const victoryMetrics = useMemo(() => {
    if (!currentNation) return null;
    
    const metrics = {
      consensus: currentNation.consensus?.general || 0,
      economy: Math.min(100, (currentNation.economy?.gdp || 0) / 20),
      military: Math.min(100, (currentNation.military?.size || 0) / 2),
      tech: Math.min(100, (currentNation.tech?.space?.level || 0) * 10),
      diplomacy: 0,
    };
    
    for (const rel of currentNation.relations || []) {
      if (rel.value > 50) metrics.diplomacy += 10;
      if (rel.value > 80) metrics.diplomacy += 5;
    }
    metrics.diplomacy = Math.min(100, metrics.diplomacy);
    
    return metrics;
  }, [currentNation]);

  const overallProgress = useMemo(() => {
    if (!victoryMetrics) return 0;
    return (
      victoryMetrics.consensus * 0.3 +
      victoryMetrics.economy * 0.25 +
      victoryMetrics.military * 0.2 +
      victoryMetrics.tech * 0.15 +
      victoryMetrics.diplomacy * 0.1
    );
  }, [victoryMetrics]);

  const getMilestone = (progress: number) => {
    if (progress >= 100) return { name: 'Vittoria Assoluta', achieved: true };
    if (progress >= 80) return { name: 'Superpotenza', achieved: progress >= 80 };
    if (progress >= 60) return { name: 'Potenza Regionale', achieved: progress >= 60 };
    if (progress >= 40) return { name: 'Nazione Stabilita', achieved: progress >= 40 };
    return { name: 'Nazione emergentes', achieved: false };
  };

  const milestone = getMilestone(overallProgress);

  const rankedNations = useMemo(() => {
    return [...nations]
      .map(n => ({
        id: n.id,
        name: n.name,
        progress: calculateProgress(n),
      }))
      .sort((a, b) => b.progress - a.progress);
  }, [nations]);

  function calculateProgress(nation: GameNation) {
    const m = {
      consensus: nation.consensus?.general || 0,
      economy: Math.min(100, (nation.economy?.gdp || 0) / 20),
      military: Math.min(100, (nation.military?.size || 0) / 2),
      tech: Math.min(100, (nation.tech?.space?.level || 0) * 10),
      diplomacy: (nation.relations || []).reduce((sum, r) => r.value > 50 ? sum + 10 : sum, 0),
    };
    return (
      m.consensus * 0.3 +
      m.economy * 0.25 +
      m.military * 0.2 +
      m.tech * 0.15 +
      m.diplomacy * 0.1
    );
  }

  if (!victoryMetrics) return null;

  return (
    <div className="victory-progress">
      <h3>Progresso Verso la Vittoria</h3>
      
      <div className="current-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <span className="progress-value">{Math.round(overallProgress)}%</span>
      </div>

      <div className="milestone">
        {milestone.achieved && <span className="milestone-badge">✓</span>}
        <span>{milestone.name}</span>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <span className="label">Consenso</span>
          <div className="metric-bar">
            <div style={{ width: `${victoryMetrics.consensus}%` }} />
          </div>
          <span className="value">{Math.round(victoryMetrics.consensus)}%</span>
        </div>
        
        <div className="metric">
          <span className="label">Economia</span>
          <div className="metric-bar">
            <div style={{ width: `${victoryMetrics.economy}%` }} />
          </div>
          <span className="value">{Math.round(victoryMetrics.economy)}%</span>
        </div>
        
        <div className="metric">
          <span className="label">Militare</span>
          <div className="metric-bar">
            <div style={{ width: `${victoryMetrics.military}%` }} />
          </div>
          <span className="value">{Math.round(victoryMetrics.military)}%</span>
        </div>
        
        <div className="metric">
          <span className="label">Tecnologia</span>
          <div className="metric-bar">
            <div style={{ width: `${victoryMetrics.tech}%` }} />
          </div>
          <span className="value">{Math.round(victoryMetrics.tech)}%</span>
        </div>
        
        <div className="metric">
          <span className="label">Diplomazia</span>
          <div className="metric-bar">
            <div style={{ width: `${victoryMetrics.diplomacy}%` }} />
          </div>
          <span className="value">{Math.round(victoryMetrics.diplomacy)}%</span>
        </div>
      </div>

      <div className="rankings">
        <h4>Classifica Mondiale</h4>
        {rankedNations.map((n, i) => (
          <div 
            key={n.id} 
            className={`rank-entry ${n.id === currentNationId ? 'current' : ''}`}
          >
            <span className="rank">#{i + 1}</span>
            <span className="name">{n.name}</span>
            <span className="progress">{Math.round(n.progress)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}