import React from 'react';
import { CouncilResponse, Persona, CSRAssessmentItem, OptionSummary } from '../types';
import { PERSONA_DETAILS } from '../constants';
import { EnvironmentalIcon, SocialIcon, GovernanceIcon } from './Icons';


const PersonaCard: React.FC<{ persona: Persona }> = ({ persona }) => {
    const details = PERSONA_DETAILS[persona.id] || { icon: '🧑‍⚖️', color: 'bg-gray-100 text-gray-800' };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{details.icon}</span>
                <h3 className="text-lg font-bold text-text-dark">{persona.title}</h3>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
                {persona.primary_concerns.map((concern, i) => (
                    <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${details.color}`}>
                        {concern}
                    </span>
                ))}
            </div>
            <p className="text-text-light text-sm leading-relaxed">{persona.statement}</p>
        </div>
    );
};

const AssessmentCard: React.FC<{ title: string; rating: string; points: string[], icon: React.ReactNode }> = ({ title, rating, points, icon }) => (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-center mb-2 text-primary">
            {icon}
            <h4 className="text-lg font-semibold ml-2">{title}</h4>
        </div>
        <p className="font-bold text-text-dark mb-2">Rating: <span className="font-semibold text-primary">{rating}</span></p>
        <ul className="list-disc list-inside space-y-1 text-sm text-text-light">
            {points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
    </div>
);


const OptionCard: React.FC<{ option: OptionSummary, isRecommended: boolean }> = ({ option, isRecommended }) => (
    <div className={`p-5 rounded-lg border ${isRecommended ? 'bg-green-50 border-primary shadow-md' : 'bg-white'}`}>
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-primary">{option.option_name}</h4>
            {isRecommended && <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Recommended</span>}
        </div>
        <p className="text-sm text-text-light my-2">{option.description}</p>
        <div className="mt-3 space-y-2 text-sm">
            <p><strong className="text-green-700">Environmental:</strong> {option.csr_implications.environmental}</p>
            <p><strong className="text-yellow-700">Social:</strong> {option.csr_implications.social}</p>
            <p><strong className="text-indigo-700">Governance/Economic:</strong> {option.csr_implications.governance_economic}</p>
        </div>
    </div>
);

const CouncilResults: React.FC<{ results: CouncilResponse }> = ({ results }) => {
    return (
        <div className="mt-10 space-y-8 animate-fade-in">
            {/* Scenario Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-primary mb-2">Scenario Summary</h2>
                <p className="text-text-light mb-4">{results.scenario_summary}</p>
                <h3 className="font-semibold text-text-dark mb-2">Key Assumptions Made:</h3>
                <div className="flex flex-wrap gap-2">
                    {results.assumptions.map((assumption, i) => (
                        <span key={i} className="text-sm bg-secondary bg-opacity-20 text-yellow-800 px-3 py-1 rounded-full">{assumption}</span>
                    ))}
                </div>
            </div>

            {/* Personas */}
            <div>
                <h2 className="text-3xl font-bold text-center text-text-dark mb-6">Council Perspectives</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.personas.map(persona => (
                        <PersonaCard key={persona.id} persona={persona} />
                    ))}
                </div>
            </div>
            
            {/* CSR Assessment */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-text-dark mb-6">CSR Assessment</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <AssessmentCard title="Environmental" rating={results.csr_assessment.environmental.rating} points={results.csr_assessment.environmental.key_points} icon={<EnvironmentalIcon />} />
                    <AssessmentCard title="Social" rating={results.csr_assessment.social.rating} points={results.csr_assessment.social.key_points} icon={<SocialIcon />} />
                    <AssessmentCard title="Governance/Economic" rating={results.csr_assessment.governance_economic.rating} points={results.csr_assessment.governance_economic.key_points} icon={<GovernanceIcon />} />
                </div>
            </div>

            {/* Options & Recommendation */}
             <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-text-dark mb-6">Options & Recommendation</h2>
                <div className="space-y-6">
                    {results.options_and_recommendation.option_summaries.map(option => (
                        <OptionCard key={option.option_name} option={option} isRecommended={option.option_name === results.options_and_recommendation.recommended_option.option_name} />
                    ))}
                </div>
                 <div className="mt-8 bg-gray-50 p-5 rounded-lg border">
                    <h3 className="text-xl font-bold text-primary mb-2">Overall Recommendation: {results.options_and_recommendation.recommended_option.option_name}</h3>
                    <p className="text-text-light leading-relaxed">{results.options_and_recommendation.recommended_option.csr_rationale}</p>
                </div>
            </div>
        </div>
    );
};

export default CouncilResults;
