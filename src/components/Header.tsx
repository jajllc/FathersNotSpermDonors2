import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigateHome && onNavigateHome()}
          >
            <Scale className={`h-8 w-8 ${isScrolled ? 'text-blue-800' : 'text-white'}`} />
            <span className={`font-bold text-xl md:text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Equal Rights
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {['About', 'Facts', 'Petition', 'Gallery', 'Stories', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium transition-colors py-2 px-3 rounded-md hover:bg-white/10 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-800' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md hover:bg-white/10 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-gray-200">
            <nav className="py-2">
              {['About', 'Facts', 'Petition', 'Gallery', 'Stories', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors text-lg font-medium border-b border-gray-100 last:border-b-0"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};