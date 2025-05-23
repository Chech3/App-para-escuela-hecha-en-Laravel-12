import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface SearchBarProps {
  placeholder?: string;
  routeName: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  routeName,
  initialValue = ''
}) => {
  const [search, setSearch] = useState(initialValue);

  const handleSearch = () => {
    router.get(route(routeName), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleClear = () => {
    setSearch('');
    router.get(route(routeName), {}, {
      preserveState: true,
      replace: true,
    });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 400); // delay para evitar demasiadas llamadas

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-white rounded-md shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="px-3 py-1 flex-grow border-r-0 rounded-l-md bg-transparent focus:outline-none"
        />
        <div className="text-white py-1 px-2 border-l border-gray-200 flex space-x-2 items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-600 "
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <div onClick={handleClear} className="cursor-pointer hover:opacity-80">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-600 "
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;