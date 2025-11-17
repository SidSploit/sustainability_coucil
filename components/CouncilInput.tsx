import React, { useState } from 'react';
import { SCENARIO_TYPES } from '../constants';

interface CouncilInputProps {
  onRunCouncil: (scenario: string, type: string) => void;
  isLoading: boolean;
}

const CouncilInput: React.FC<CouncilInputProps> = ({ onRunCouncil, isLoading }) => {
  const [scenario, setScenario] = useState('');
  const [scenarioType, setScenarioType] = useState(SCENARIO_TYPES[0]);
  const [error, setError] = useState('');

  const handleRun = () => {
    if (!scenario.trim()) {
      setError('Please describe your scenario before running the council.');
      return;
    }
    setError('');
    onRunCouncil(scenario, scenarioType);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
      <div className="space-y-6">
        <div>
          <label htmlFor="scenario-description" className="block text-lg font-semibold text-text-dark mb-2">
            Describe your sustainability scenario
          </label>
          <textarea
            id="scenario-description"
            rows={5}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full p-3 border border-border-light rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white text-text-dark placeholder-gray-400"
            placeholder="Example: We want to build a 50 MW solar farm 2 km from a village in a water-stressed region. Locals are concerned about land use and jobs."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <label htmlFor="scenario-type" className="block text-lg font-semibold text-text-dark mb-2">
            Scenario type
          </label>
          <select
            id="scenario-type"
            value={scenarioType}
            onChange={(e) => setScenarioType(e.target.value)}
            className="w-full p-3 border border-border-light rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white text-text-dark"
          >
            {SCENARIO_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
          >
            {isLoading ? 'Debating...' : 'Run Council Debate'}
          </button>
          <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto">
            The AI council will generate multiple expert viewpoints and a CSR assessment. This is a decision-support tool, not legal or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouncilInput;
