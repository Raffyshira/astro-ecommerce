import React, { useEffect } from "react";
import { useSearchStore } from "@/features/search/SearchStore.ts";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";
import { CardSkeletonProduct } from "@/components/CardSkeleton.tsx";
import { Heart, Star } from "lucide-react";

interface SearchResultsProps {
   query: string;
}

const SearchResult: React.FC<SearchResultsProps> = ({ query }) => {
   const { setSearchTerm, searchResults, loading, error, performSearch } =
      useSearchStore();

   useEffect(() => {
      if (query) {
         setSearchTerm(query);
         performSearch();
      }
   }, [query, setSearchTerm, performSearch]);

   return (
      <div>
         {/* Loading Spinner */}
         {loading ? (
            <div className="columns-2">
               {Array(6)
                  .fill(0)
                  .map((_, index) => (
                     <div key={index}>
                        <CardSkeletonProduct />
                     </div>
                  ))}
            </div>
         ) : (
            <>
               {/* Error Handling */}
               {error && <p className="text-red-500">{error}</p>}
               <div className="columns-2 sm:grid  sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {searchResults.length > 0
                     ? searchResults.map(product => (
                          <Card className="max-w-sm w-50 h-fit border-none overflow-hidden shrink-0 shadow-none">
                             <a href={`/product/${product.id}`}>
                                <img
                                   alt={product.title}
                                   className="h-56 w-full aspect-square object-cover bg-gray-100"
                                   src={product.images[0]}
                                />
                             </a>
                             <CardContent className="p-3">
                                <Badge variant="destructive">
                                   {product.discountPercentage}% Off
                                </Badge>
                                <h2 className="text-base mt-2 font-semibold">
                                   {product.title}
                                </h2>
                                <div className="mt-2 flex items-baseline justify-between space-x-1">
                                   <span className="text-base font-SatoshiBold">
                                      ${product.price}
                                   </span>
                                   <div className="flex">
                                      <p className="text-base text-gray-500 line-through">
                                         Rp299.000
                                      </p>
                                   </div>
                                </div>
                             </CardContent>
                             <CardFooter className="flex justify-between items-start -ml-2.5">
                                <div className="flex items-center">
                                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                   <span className="ml-1 text-sm">
                                      {product.rating} • 3rb+ terjual
                                   </span>
                                </div>
                             </CardFooter>
                          </Card>
                       ))
                     : !loading && <p className="mt-20">No products found.</p>}
               </div>
            </>
         )}
      </div>
   );
};

export default SearchResult;
