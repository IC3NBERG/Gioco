import { useState, useMemo } from 'react';
import type { Choice, ChoiceCategory } from '../types';
import { ALL_CHOICES, getChoicesByCategory } from '../choices';

interface ChoiceBrowserProps {
  onSelectChoice: (choice: Choice) => void;
  selectedNation?: string;
}

export function ChoiceBrowser({ onSelectChoice, selectedNation }: ChoiceBrowserProps) {
  const [category, setCategory] = useState<ChoiceCategory>('diplomazia');
  const [search, setSearch] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const choices = useMemo(() => {
    let result = getChoicesByCategory(category);
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower) ||
        c.id.toLowerCase().includes(lower)
      );
    }
    return result;
  }, [category, search]);

  const categories: ChoiceCategory[] = ['diplomazia', 'economia', 'militare', 'politica', 'tecnologia', 'cultura'];

  const handleSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    onSelectChoice(choice);
  };

  return (
    <div className="choice-browser">
      <div className="browser-header">
        <input
          type="text"
          placeholder="Cerca scelte..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="choices-grid">
        {choices.map(choice => (
          <div
            key={choice.id}
            className={`choice-card ${selectedChoice?.id === choice.id ? 'selected' : ''}`}
            onClick={() => handleSelect(choice)}
          >
            <h4>{choice.name}</h4>
            <p>{choice.description}</p>
            <div className="choice-cost">
              {choice.cost.pa} PA
              {choice.cost.resources?.money && ` • ${choice.cost.resources.money}$`}
            </div>
          </div>
        ))}
      </div>

      {selectedChoice && (
        <div className="choice-detail">
          <h3>{selectedChoice.name}</h3>
          <p className="description">{selectedChoice.description}</p>
          
          {selectedChoice.effects.length > 0 && (
            <div className="effects">
              <h4>Effetti Immediati:</h4>
              {selectedChoice.effects.map((e, i) => (
                <div key={i} className="effect">
                  {e.target}: +{e.value} ({e.type})
                </div>
              ))}
            </div>
          )}
          
          {selectedChoice.risk && (
            <div className="risk">
              Rischio: {selectedChoice.risk.type} ({Math.round(selectedChoice.risk.probability * 100)}%)
            </div>
          )}
        </div>
      )}
    </div>
  );
}