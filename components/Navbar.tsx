import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  navigate: (page: 'home' | 'council' | 'about') => void;
  openLoginModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ navigate, openLoginModal }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('home')}>
            <h1 className="text-xl font-bold text-primary">Sustainability Council</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigate('home')} className="text-gray-500 hover:text-primary transition-colors">Home</button>
            <button onClick={() => navigate('council')} className="text-gray-500 hover:text-primary transition-colors">Council</button>
            <button onClick={() => navigate('about')} className="text-gray-500 hover:text-primary transition-colors">About</button>
          </nav>
          <div className="flex items-center">
            {isLoggedIn && user ? (
              <div className="relative group">
                 <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold cursor-pointer">
                    {user.initials}
                 </div>
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                    <div className="px-4 py-2 text-sm text-gray-700">{user.name}</div>
                    <div className="border-t border-gray-100"></div>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                 </div>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
