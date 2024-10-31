import { useState, useEffect, useCallback } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CardProduct from "@/features/product/card-product.tsx";

import { motion, AnimatePresence } from "framer-motion";

import { getAllProducts, getProductByCategory } from "@/lib/api.ts";

type Category = {
   name: string;
};

export default function ProductLists() {
   const [products, setProducts] = useState<any[]>([]);
   const [page, setPage] = useState<number>(1);
   const [loading, setLoading] = useState<boolean>(false);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const [categories, setCategories] = useState<Category[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
      undefined
   );
   const [displayedProductIds, setDisplayedProductIds] = useState<Set<number>>(
      new Set()
   );

   const loadMoreProducts = useCallback(async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
         const newProducts = await getAllProducts(
            (page - 1) * 10,
            15,
            selectedCategory === "all" || selectedCategory === null
               ? undefined
               : selectedCategory
         );

         if (newProducts.length === 0) {
            setHasMore(false);
         } else {
            setProducts(prevProducts => {
               const uniqueNewProducts = newProducts.filter(
                  product => !displayedProductIds.has(product.id)
               );
               setDisplayedProductIds(
                  prevIds =>
                     new Set([
                        ...prevIds,
                        ...uniqueNewProducts.map(product => product.id)
                     ])
               );
               return [...prevProducts, ...uniqueNewProducts];
            });
            setPage(prevPage => prevPage + 1);
         }
      } catch (error) {
         alert("Error fetching products: " + error);
      } finally {
         setLoading(false);
      }
   }, [page, loading, hasMore, selectedCategory, displayedProductIds]);

   const handleCategoryChange = (category: string) => {
      setSelectedCategory(category === "all" ? undefined : category);
      setDisplayedProductIds(new Set());

      setProducts([]); // Clear existing products
      setPage(1); // Reset the page
      setHasMore(true); // Reset the hasMore state
   };

   useEffect(() => {
      const loadCategories = async () => {
         const categoriesData = await getProductByCategory();
         setCategories([{ name: "All" }, ...(categoriesData || [])]);
      };
      loadCategories();
      loadMoreProducts(); // Load products when categories are fetched
   }, [selectedCategory]);

   return (
      <div>
         <Tabs onValueChange={handleCategoryChange} value={selectedCategory}>
            <div className="sticky top-16 z-40">
               <TabsList className="flex flex-row overflow-scroll bg-white">
                  {categories.map(category => (
                     <TabsTrigger
                        key={category.name}
                        value={category.name.toLowerCase().replace(/\s+/g, "-")}
                        className="shrink-0 bg-white data-[state=active]:underline underline-offset-4"
                     >
                        {category.name}
                     </TabsTrigger>
                  ))}
               </TabsList>
            </div>
            <AnimatePresence>
               <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
               >
                  {/* Content here */}
                  {/* Content for each specific category */}
                  {categories.map(category => (
                     <TabsContent
                        key={category.name}
                        value={category.name.toLowerCase().replace(/\s+/g, "-")}
                     >
                        {products.length === 0 && !loading && (
                           <p className="text-center mt-4">
                              No products found for this category.
                           </p>
                        )}
                        <div className="w-full h-fit columns-2 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                           {products.map(product => (
                              <div key={product.id} className="mb-4">
                                 <CardProduct
                                    id={product.id}
                                    discount={product.discountPercentage}
                                    name={product.title}
                                    price={product.price}
                                    rating={product.rating}
                                    className="shrink-0 h-fit"
                                    isLineClamp={false}
                                 >
                                    <img
                                       alt={product.title}
                                       className="w-full aspect-square object-cover bg-gray-100"
                                       src={product.thumbnail}
                                       width="200"
                                       height="200"
                                       loading="lazy"
                                    />
                                 </CardProduct>
                              </div>
                           ))}
                        </div>
                     </TabsContent>
                  ))}
               </motion.div>
            </AnimatePresence>
         </Tabs>
         {loading && (
            <p className="text-center mb-16">Loading more products...</p>
         )}
         {!hasMore ? (
            <p className="text-center mb-16">No more products to load</p>
         ) : (
            <div className="text-center mt-4 mb-16 px-5">
               <Button
                  onClick={loadMoreProducts}
                  className="font-SatoshiMedium w-full"
                  disabled={loading}
               >
                  {loading ? "Loading..." : "Load More"}
               </Button>
            </div>
         )}
      </div>
   );
}

// features: infinite scroll product

// const useInfiniteScroll = (callback: () => void) => {
//    const observer = useRef<IntersectionObserver | null>(null);
//
//    const lastElementRef = useCallback(
//       (node: HTMLDivElement | null) => {
//          if (observer.current) observer.current.disconnect();
//          observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting) {
//                callback();
//             }
//          });
//          if (node) observer.current.observe(node);
//       },
//       [callback]
//    );
//
//    return lastElementRef;
// };
