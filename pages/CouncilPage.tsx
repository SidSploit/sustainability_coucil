import React, { useState } from 'react';
import CouncilInput from '../components/CouncilInput';
import CouncilResults from '../components/CouncilResults';
import { runCouncilDebate } from '../services/geminiService';
import { CouncilResponse } from '../types';

const CouncilPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CouncilResponse | null>(null);

  const handleRunCouncil = async (scenario: string, type: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await runCouncilDebate(scenario, type);
      setResults(response);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-text-dark">Run a Sustainability Council Session</h1>
        <p className="mt-2 text-lg text-text-light">
          Describe your scenario and let the council evaluate it through a CSR lens.
        </p>
      </div>

      <CouncilInput onRunCouncil={handleRunCouncil} isLoading={isLoading} />

      <div className="mt-10">
        {isLoading && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-light font-semibold">The council is debating your scenario...</p>
          </div>
        )}
        {error && (
          <div className="text-center p-8 bg-red-50 text-red-700 rounded-xl shadow-lg border border-red-200">
            <h3 className="font-bold">An Error Occurred</h3>
            <p>{error}</p>
          </div>
        )}
        {results && <CouncilResults results={results} />}
      </div>
    </div>
  );
};

export default CouncilPage;
