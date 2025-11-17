import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CouncilPage from './pages/CouncilPage';
import AboutPage from './pages/AboutPage';
import LoginModal from './components/LoginModal';
import ChatbotWidget from './components/ChatbotWidget';

type Page = 'home' | 'council' | 'about';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const navigate = useCallback((page: Page) => {
    if (page === 'council' && !isLoggedIn) {
      setLoginModalOpen(true);
    } else {
      setCurrentPage(page);
    }
  }, [isLoggedIn]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'council':
        if (isLoggedIn) {
          return <CouncilPage />;
        }
        return <HomePage navigate={navigate} />; // Fallback to home if not logged in
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };
  
  return (
    <div className="bg-page-bg min-h-screen font-sans text-text-dark">
      <Navbar navigate={navigate} openLoginModal={() => setLoginModalOpen(true)} />
      <main>
        {renderPage()}
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={() => navigate('council')} />
      <ChatbotWidget />
    </div>
  );
};


const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
