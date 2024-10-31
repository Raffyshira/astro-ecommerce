// src/features/search/SearchStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface Product {
   id: number;
   title: string;
   rating: number;
   price: number;
   discountPercentage: number;
   thumbnail: string;
}

interface APIResponse {
   products: Product[];
   total: number;
   skip: number;
   limit: number;
}

interface SearchState {
   searchTerm: string;
   searchResults: Product[];
   loading: boolean;
   error: string | null;
   searchHistory: string[];
   addSearchHistory: (term: string) => void;
   clearSearchHistory: () => void;
   suggestions: string[];
   fetchSuggestions: any;
   suggestionsLoading: boolean;
   suggestionsError: string | null;
   setSearchTerm: (term: string) => void;
   performSearch: () => Promise<void>;
}

export const useSearchStore = create<SearchState>()(
   persist(
      (set, get) => ({
         searchTerm: "",
         searchResults: [],
         loading: false,
         error: null,
         suggestions: [],
         suggestionsLoading: false,
         suggestionsError: null,
         searchHistory: [],
         setSearchTerm: (term: string) => set({ searchTerm: term }),
         performSearch: async () => {
            const { searchTerm } = get();
            console.log(`Performing search for: ${searchTerm}`);
            if (searchTerm.trim() === "") {
               set({ searchResults: [], error: null });
               console.log("Search term is empty. Resetting search results.");
               return;
            }

            set({ loading: true, error: null });

            try {
               const response = await axios.get<APIResponse>(
                  `https://dummyjson.com/products/search?q=${encodeURIComponent(
                     searchTerm
                  )}`
               );
               set({ searchResults: response.data.products, loading: false });
               console.log("Search results updated:", response.data.products);
            } catch (error) {
               set({
                  error: "Terjadi Kesalahan Saat Mencari Produk",
                  loading: false
               });
               console.error("Error during search:", error);
            }
         },
         addSearchHistory: term =>
            set(state => ({
               searchHistory: [
                  ...new Set([term, ...state.searchHistory])
               ].slice(0, 10) // Membatasi riwayat hingga 10 entri unik
            })),
         clearSearchHistory: () => set({ searchHistory: [] }),

         fetchSuggestions: async () => {
            const { searchTerm } = get();
            if (searchTerm.trim() === "") {
               set({ suggestions: [], suggestionsError: null });
               return;
            }

            set({ suggestionsLoading: true, suggestionsError: null });

            try {
               const response = await axios.get<APIResponse>(
                  `https://dummyjson.com/products/search?q=${encodeURIComponent(
                     searchTerm
                  )}&limit=10`
               );

               const uniqueTitles = Array.from(
                  new Set(response.data.products.map(product => product.title))
               );

               set({ suggestions: uniqueTitles, suggestionsLoading: false });
            } catch (error) {
               set({
                  suggestionsError: "Terjadi Kesalahan Saat Memuat Saran",
                  suggestionsLoading: false
               });
            }
         }
      }),
      {
         name: "search-storage",
         storage: createJSONStorage(() => localStorage)
      }
   )
);
