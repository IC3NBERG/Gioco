import React from 'react';
import './world-preview.css';

// Simple placeholder world map grid to showcase the design language
const regions = [
  'Americhe', 'Europa', 'Africa', 'Medio Oriente', 'Asia', 'Oceania'
];

export const WorldMapPreview: React.FC = () => {
  return (
    <div className="ds-world-map" aria-label="World map preview">
      {regions.map((r, idx) => (
        <div key={idx} className={`ds-world-node ${idx === 2 ? 'active' : ''}`} title={r}>
        </div>
      ))}
    </div>
  );
};

export default WorldMapPreview;
