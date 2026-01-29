import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

interface SearchProps {
  onSearch?: (searchTerm: string) => void;
  onUpdateUrl?: (searchTerm: string) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  debounceTime?: number;
  initialValue?: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  onUpdateUrl,
  placeholder = "Search by mobile number, name of vendor",
  loading = false,
  className = "",
  debounceTime = 300,
  initialValue = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Create a memoized debounced search function
  const debouncedSearch = useCallback(
    _.debounce((text: string) => {
      // Trigger external search handler if provided
      onSearch?.(text.trim());

      // Optional URL update callback
      onUpdateUrl?.(text);
    }, debounceTime),
    [onSearch, onUpdateUrl, debounceTime]
  );

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          className={`
            block w-full pl-10 p-2 text-sm text-gray-900 
            border border-gray-300 rounded-lg 
            bg-gray-50 
            focus:ring-primary-500 focus:border-primary-500
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin h-5 w-5 border-2 border-gray-200 rounded-full border-t-primary-500" />
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;
