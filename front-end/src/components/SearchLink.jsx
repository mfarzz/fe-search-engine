import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'sequelize cli - Google Search',
    'yt',
    'vanta',
    'wallpaper gratis',
    'laravel install;',
    'react vite',
    'preline ui',
    'github'
  ]);

  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const mockSuggestions = [
    'react tutorial',
    'react native',
    'react hooks',
    'react router',
    'react redux',
    'mpsi'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = mockSuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (term) => {
    if (term.trim()) {
      setRecentSearches(prev => [term, ...prev.slice(0, 7)]);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-4" ref={searchRef}>
      <div
        className={`bg-white rounded-3xl mt-10 text-white border-2 border-blue-200 ${
          isOpen ? 'shadow-lg' : 'hover:shadow-md'
        } transition-shadow duration-200 relative`}
      >
        <div className="flex items-center px-4 py-3 border-blue">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="flex-1 px-4 outline-none text-gray-700 bg-transparent"
            placeholder="Search or type a URL"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
          />
        </div>

        {isOpen && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-lg z-10 rounded-lg mt-2"
            style={{ maxHeight: '300px', overflowY: 'auto' }}
          >
            <div className="px-2 pb-2">
              <div className="h-px bg-gray-100 mx-2 mb-2" />
              {(!searchTerm ? recentSearches : suggestions).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleSearch(item)}
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchLink;
