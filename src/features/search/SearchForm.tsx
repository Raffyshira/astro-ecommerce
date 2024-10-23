// src/features/search/SearchForm.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSearchStore } from "@/features/search/SearchStore.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search } from "lucide-react";

const SearchForm: React.FC = () => {
   const {
      searchTerm,
      setSearchTerm,
      performSearch,
      suggestions,
      fetchSuggestions,
      suggestionsLoading,
      suggestionsError
   } = useSearchStore();

   const [showSuggestions, setShowSuggestions] = useState(false);
   const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
   const wrapperRef = useRef<HTMLDivElement | null>(null);

   // Handle klik di luar untuk menutup saran
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target as Node)
         ) {
            setShowSuggestions(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setShowSuggestions(true);

      if (debounceTimeout.current) {
         clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
         fetchSuggestions();
      }, 300);
   };

   const handleSearch = () => {
      if (searchTerm.trim() !== "") {
         window.location.href = `/search/${encodeURIComponent(
            searchTerm.trim()
         )}`;
      }

      setShowSuggestions(false);
      performSearch();
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchTerm.trim() !== "") {
         window.location.href = `/search/${encodeURIComponent(
            searchTerm.trim()
         )}`;
         setShowSuggestions(false);
         performSearch();
      }
   };

   const handleSuggestionClick = (suggestion: string) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
      performSearch();
   };

   return (
      <div className="relative" ref={wrapperRef}>
         <div className="flex items-center gap-x-5 mb-4 sm:mb-0">
            <div className="relative w-full">
               <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
               <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-8"
               />
            </div>
            <Button className="sm:hidden" onClick={handleSearch}>
               Search
            </Button>
         </div>
         {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-10 max-h-60 overflow-y-auto">
               {suggestionsLoading ? (
                  <div className="p-4">
                     <p>Loading ..</p>
                  </div>
               ) : suggestionsError ? (
                  <div className="p-4 text-red-500">{suggestionsError}</div>
               ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                     <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                     >
                        {suggestion}
                     </div>
                  ))
               ) : (
                  <div className="p-4 text-gray-500">No suggestions found.</div>
               )}
            </div>
         )}
      </div>
   );
};

export default SearchForm;
