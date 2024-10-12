// src/features/search/SearchStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface Product {
   id: number;
   title: string;
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
   suggestions: string[];
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
         name: "search-storage", // Nama key di localStorage
         getStorage: () => localStorage // Opsional, default adalah localStorage
      }
   )
);
