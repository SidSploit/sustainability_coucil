import React from 'react';

interface HomePageProps {
  navigate: (page: 'council' | 'about') => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark">Sustainability Council</h1>
        <p className="mt-4 text-xl text-text-light max-w-3xl mx-auto">
          An AI-powered CSR panel that debates your sustainability decisions from multiple expert perspectives.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('council')}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200"
          >
            Start a Council Session
          </button>
          <button
            onClick={() => navigate('about')}
            className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-md border border-primary hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-bold text-primary mb-2">Multiple Expert Personas</h3>
            <p className="text-text-light">Our AI council includes climate, carbon, biodiversity, community, engineering, business/CSR, and public finance experts to provide a holistic view.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-bold text-primary mb-2">CSR-Style Assessment</h3>
            <p className="text-text-light">Receive a structured assessment covering Environmental (E), Social (S), and Governance/Economic (G) dimensions of your project.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
            <h3 className="text-xl font-bold text-primary mb-2">Decision Support, Not Just Answers</h3>
            <p className="text-text-light">The tool surfaces diverse perspectives and CSR implications to help you make more informed and robust sustainability decisions.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-text-dark mb-12">How It Works in 3 Simple Steps</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="text-center max-w-xs">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="text-lg font-semibold mb-2">Describe Your Scenario</h4>
                <p className="text-text-light">Provide a detailed description of the sustainability challenge or decision you are facing.</p>
            </div>
             <div className="text-center max-w-xs">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="text-lg font-semibold mb-2">Run the Council</h4>
                <p className="text-text-light">Our AI panel analyzes your scenario, with each persona offering their unique expert viewpoint.</p>
            </div>
             <div className="text-center max-w-xs">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="text-lg font-semibold mb-2">Review Assessment</h4>
                <p className="text-text-light">Explore the CSR assessment, persona statements, and actionable options to guide your decision.</p>
            </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white rounded-xl shadow-lg p-10 my-16 text-center">
         <h2 className="text-2xl font-bold text-text-dark mb-4">Ready to stress-test your next sustainability decision?</h2>
         <button
            onClick={() => navigate('council')}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200"
          >
            Go to Council
          </button>
      </section>
    </div>
  );
};

export default HomePage;
