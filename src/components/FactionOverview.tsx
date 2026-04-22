import type { Faction } from '../../types';

interface FactionOverviewProps {
  factions: Faction[];
  currentNationId?: string;
}

export function FactionOverview({ factions, currentNationId }: FactionOverviewProps) {
  const getInfluenceValue = (faction: Faction) => {
    return faction.influence ?? faction.baseApproval ?? faction.base_approval ?? Math.round((faction.baseApproval ?? 50) * 0.5);
  };

  const getStatus = (faction: Faction): 'loyal' | 'neutral' | 'opposition' | 'hostile' => {
    return faction.status || (faction.baseApproval && faction.baseApproval >= 60 ? 'loyal' : 'neutral');
  };

  const getInfluenceClass = (influence: number) => {
    if (influence >= 80) return 'dominant';
    if (influence >= 60) return 'strong';
    if (influence >= 40) return 'moderate';
    if (influence >= 20) return 'weak';
    return 'marginal';
  };

  const getStatusColor = (status: 'loyal' | 'neutral' | 'opposition' | 'hostile') => {
    switch (status) {
      case 'loyal': return '#4ade80';
      case 'neutral': return '#fbbf24';
      case 'opposition': return '#f97316';
      case 'hostile': return '#ef4444';
    }
  };

  return (
    <div className="faction-overview">
      <h3>Fazioni Politiche</h3>
      
      <div className="factions-list">
        {factions.map(faction => (
          <div 
            key={faction.id} 
            className={`faction-card ${faction.id === currentNationId ? 'current' : ''}`}
          >
            <div className="faction-header">
              <span className="faction-name">{faction.name}</span>
              <span 
                className="faction-status"
                style={{ color: getStatusColor(getStatus(faction)) }}
              >
                {getStatus(faction)}
              </span>
            </div>
            
            <div className="influence-bar">
              <div 
                className="influence-fill"
                style={{ 
                  width: `${getInfluenceValue(faction)}%`,
                  backgroundColor: getStatusColor(getStatus(faction))
                }}
              />
              <span className="influence-value">{getInfluenceValue(faction)}%</span>
            </div>
            
            <div className="faction-stats">
              <div className="stat">
                <span className="label">Mobilitazione</span>
                <span className="value">{faction.mobilization || 30}%</span>
              </div>
              <div className="stat">
                <span className="label">Approvazione</span>
                <span className="value">{faction.baseApproval ?? 50}%</span>
              </div>
            </div>
            
            {faction.demandsList && faction.demandsList.length > 0 && (
              <div className="faction-demands">
                <strong>Richieste:</strong>
                {faction.demandsList.map((demand, i) => (
                  <span key={i} className="demand-tag">{demand}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}