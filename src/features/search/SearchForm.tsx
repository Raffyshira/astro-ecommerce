// src/features/search/SearchForm.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSearchStore } from "@/features/search/SearchStore.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search, History } from "lucide-react";

const SearchForm: React.FC = () => {
   const {
      searchTerm,
      setSearchTerm,
      performSearch,
      suggestions,
      fetchSuggestions,
      suggestionsLoading,
      suggestionsError,
      searchHistory,
      clearSearchHistory,
      addSearchHistory
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
      addSearchHistory(searchTerm.trim());
      setShowSuggestions(false);
      performSearch();
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchTerm.trim() !== "") {
         window.location.href = `/search/${encodeURIComponent(
            searchTerm.trim()
         )}`;
         addSearchHistory(searchTerm.trim());
         setShowSuggestions(false);
         performSearch();
      }
   };

   const handleSuggestionClick = (suggestion: string) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
      addSearchHistory(suggestion);
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
            <Button
               className="sm:hidden font-SatoshiMedium"
               onClick={handleSearch}
            >
               Search
            </Button>
         </div>
         {showSuggestions && (
            <div className="absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-10 max-h-60 overflow-y-auto">
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
         {searchHistory.length > 0 && (
            <div className="md:hidden">
               <h3 className="mt-4 font-SatoshiMedium text-xl">
                  Riwayat Pencarian:
               </h3>
               <ul className="flex flex-col gap-2 mt-3.5">
                  {searchHistory.map((term, index) => (
                     <li
                        key={index}
                        className="cursor-pointer inline-flex items-center text-muted-foreground hover:underline"
                        onClick={() => handleSuggestionClick(term)}
                     >
                        <History className="w-4 h-4 mr-2" />
                        <span>{term}</span>
                     </li>
                  ))}
               </ul>
               <div className="left-5 right-5 fixed bottom-5">
                  <Button
                     onClick={clearSearchHistory}
                     className="mt-2 w-full font-SatoshiMedium "
                  >
                     Hapus Riwayat
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
};

export default SearchForm;
