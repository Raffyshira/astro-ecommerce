"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import CardProduct from "@/features/product/card-product.tsx";
import { getAllProducts } from "@/lib/api.ts";

const useInfiniteScroll = (callback: () => void) => {
   const observer = useRef<IntersectionObserver | null>(null);

   const lastElementRef = useCallback(
      (node: HTMLDivElement | null) => {
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
               callback();
            }
         });
         if (node) observer.current.observe(node);
      },
      [callback]
   );

   return lastElementRef;
};

export default function ProductLists() {
   const [products, setProducts] = useState<any[]>([]);
   const [page, setPage] = useState<number>(1);
   const [loading, setLoading] = useState<boolean | null>(false);
   const [hasMore, setHasMore] = useState<boolean | null>(true);

   const loadMoreProducts = useCallback(async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
         const newProducts = await getAllProducts((page - 1) * 10);
         const randomProduct = newProducts.sort(() => Math.random() - 0.5);
         if (randomProduct.length === 0) {
            setHasMore(false);
         } else {
            setProducts(prevProducts => [...prevProducts, ...randomProduct]);
            setPage(prevPage => prevPage + 1);
         }
      } catch (error) {
         console.error("Error fetching products:", error);
      } finally {
         setLoading(false);
      }
   }, [page, loading, hasMore]);

   const lastProductRef = useInfiniteScroll(loadMoreProducts);

   useEffect(() => {
      loadMoreProducts();
   }, []);

   return (
      <div>
         <div className="columns-2 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product, index) => (
               <div
                  key={product.id}
                  ref={index === products.length - 1 ? lastProductRef : null}
                  className="mb-4"
               >
                  <CardProduct
                     id={product.id}
                     image={product.thumbnail}
                     discount={product.discountPercentage}
                     name={product.title}
                     price={product.price}
                     rating={product.rating}
                  >
                     <img
                        alt={product.title}
                        className="w-full h-fit w-full aspect-square object-cover bg-gray-100"
                        src={product.thumbnail}
                        width="200"
                        height="200"
                        loading="lazy"
                     />
                  </CardProduct>
               </div>
            ))}
         </div>
         {loading && (
            <p className="text-center mt-4">Loading more products...</p>
         )}
         {!hasMore && (
            <p className="text-center mt-4">No more products to load</p>
         )}
      </div>
   );
}
