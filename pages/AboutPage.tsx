import React from 'react';

const personas = [
    { name: "Climate Scientist", description: "Focuses on emissions pathways, physical climate risk, carbon budgets, and long-term climate goals." },
    { name: "Carbon Footprint Analyst", description: "Analyzes the approximate CO2e impact of the scenario, main emission drivers, and key reduction levers." },
    { name: "Biodiversity Ecologist", description: "Considers the impact on ecosystems, habitats, species, and the potential for nature-based solutions." },
    { name: "Community Representative", description: "Advocates for local livelihoods, equity, cultural heritage, health, and impacts on vulnerable groups." },
    { name: "Urban Planner / Infrastructure Engineer", description: "Evaluates technical feasibility, safety, integration with existing infrastructure, and project timelines." },
    { name: "Business Strategy / CSR Lead", description: "Assesses the business model, ESG/CSR positioning, long-term value, and brand or investor expectations." },
    { name: "Public Finance Minister / Budget Officer", description: "Examines the public budget impact, project affordability, fiscal risk, and competing government priorities." },
];

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
                
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-text-dark mb-4">About the Sustainability Council</h1>
                    <p className="text-xl text-text-light max-w-3xl mx-auto">
                        A tool designed to help you navigate the complex, multi-faceted nature of sustainability decisions.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                    <div className="space-y-4 text-text-light leading-relaxed">
                        <p>
                            Real-world sustainability decisions are never simple. They involve a delicate balance of environmental protection, social equity, and economic viability. A choice that reduces carbon emissions might impact local jobs, while a financially robust project could harm a sensitive ecosystem. Navigating these trade-offs requires diverse expertise and a structured way of thinking.
                        </p>
                        <p>
                            The Sustainability Council was created to help surface these critical perspectives. By simulating a panel of experts, this tool encourages a holistic view, ensuring that key considerations from climate science to community impact are not overlooked. It structures the output into a clear Corporate Social Responsibility (CSR) framework—Environmental, Social, and Governance/Economic (ESG)—to help you make more resilient and responsible decisions.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-6">Meet the Personas</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personas.map((persona, index) => (
                            <div key={index} className="border border-border-light bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-text-dark mb-2">{persona.name}</h3>
                                <p className="text-sm text-text-light">{persona.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">How the AI Works</h2>
                    <p className="text-text-light leading-relaxed">
                        This application leverages Google's powerful Gemini models. When you submit a scenario, we send it to the AI with a detailed system prompt. This prompt instructs the model to adopt seven distinct expert personas and a facilitator role. It also specifies a precise JSON schema for the response, which includes individual persona statements and a synthesized CSR assessment. Our user interface then parses this structured JSON data and renders it into the clear, organized cards and panels you see in the results.
                    </p>
                </section>
                
                <section>
                    <h2 className="text-3xl font-bold text-primary mb-4">Limitations & Responsible Use</h2>
                     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 rounded-r-lg">
                        <p className="font-bold">This is a decision-support tool, not a replacement for expert judgment.</p>
                        <p className="mt-2">
                           The insights generated are based on the AI's training data and the scenario you provide. It should be used as a starting point to identify potential risks and opportunities. Always combine its output with real-world data, thorough stakeholder engagement, and qualified professional advice. This tool does not provide legal, financial, or engineering advice.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
