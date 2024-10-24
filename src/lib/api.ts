import type { AllProductTypes } from "../types.d.ts";

export const prerender = false;

const API_BASE_URL = "https://dummyjson.com/products";

/**
 * Mengambil semua produk dari API
 * @returns {Promise<Array>} Array produk
 */
export async function getAllProducts(
   offset: number = 0,
   limit: number = 15
): Promise<AllProductTypes[]> {
   const cacheKey = `product-${limit}-${offset}`;
   const isBrowser = typeof window !== "undefined";
   if (isBrowser && localStorage.getItem(cacheKey)) {
      return JSON.parse(localStorage.getItem(cacheKey) || "[]");
   }
   try {
      const response = await fetch(
         `${API_BASE_URL}?limit=${limit}&skip=${offset}`
      );
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const data = await response.json();
      if (isBrowser) {
         localStorage.setItem(cacheKey, JSON.stringify(data.products));
      }
      return data.products as AllProductTypes[]; // Mengembalikan array produk
   } catch (error) {
      console.error(error);
      return []; // Mengembalikan array kosong jika terjadi error
   }
}

/**
 * Mengambil produk berdasarkan ID dari API
 * @param {string | number} id - ID produk
 * @returns {Promise<Object | null>} Data produk atau null jika tidak ditemukan
 */
export async function getProductById(
   id: number | string
): Promise<AllProductTypes | null> {
   const cacheKey = `product-${id}`;
   const isBrowser = typeof window !== "undefined";
   if (isBrowser && localStorage.getItem(cacheKey)) {
      return JSON.parse(localStorage.getItem(cacheKey) || "null");
   }

   try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (response.status === 404) {
         return null;
      }
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const data = await response.json();
      if (isBrowser) {
         localStorage.setItem(cacheKey, JSON.stringify(data));
      }
      return data as AllProductTypes;
   } catch (error) {
      console.error(error);
      return null;
   }
}

export async function getProductByCategory(): Promise<any | null> {
   const cacheKey = "categories";
   const isBrowser = typeof window !== "undefined";
   if (isBrowser && localStorage.getItem(cacheKey)) {
      return JSON.parse(localStorage.getItem(cacheKey) || "null");
   }
   try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.status === 404) {
         return null;
      }
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const category = await response.json();
      if (isBrowser) {
         localStorage.setItem(cacheKey, JSON.stringify(category));
      }
      return category;
   } catch (error) {
      console.error(error);
      return null;
   }
}

export async function getRelatedProducts(
   category: string,
   excludeProductId: number
): Promise<any[]> {
   const cacheKey = `related-products-${category}`;
   const isBrowser = typeof window !== "undefined";
   if (isBrowser && localStorage.getItem(cacheKey)) {
      return JSON.parse(localStorage.getItem(cacheKey) || "[]").filter(
         (product: any) => product.id !== excludeProductId
      );
   }
   try {
      const response = await fetch(
         `${API_BASE_URL}/category/${category}?limit=10`
      );
      if (!response.ok) {
         throw new Error("Gagal mengambil produk terkait");
      }
      const data = await response.json();
      if (isBrowser) {
         localStorage.setItem(cacheKey, JSON.stringify(data.products));
      }
      return data.products.filter(
         (product: any) => product.id !== excludeProductId
      );
   } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
   }
}
