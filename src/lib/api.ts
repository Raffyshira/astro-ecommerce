export const prerender = false;
const API_BASE_URL = "https://dummyjson.com/products";

/**
 * Mengambil semua produk dari API
 * @returns {Promise<Array>} Array produk
 */
export async function getAllProducts(offset = 0, limit = 30) {
   try {
      const response = await fetch(
         `${API_BASE_URL}?limit=${limit}&skip=${offset}`
      ); // Menyesuaikan limit sesuai kebutuhan
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const data = await response.json();
      return data.products; // Mengembalikan array produk
   } catch (error) {
      console.error(error);
      return [];
   }
}

/**
 * Mengambil produk berdasarkan ID dari API
 * @param {string | number} id - ID produk
 * @returns {Promise<Object | null>} Data produk atau null jika tidak ditemukan
 */
export async function getProductById(id) {
   try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (response.status === 404) {
         return null;
      }
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const product = await response.json();
      return product;
   } catch (error) {
      console.error(error);
      return null;
   }
}

export async function getProductByCategory() {
   try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.status === 404) {
         return null;
      }
      if (!response.ok) {
         throw new Error("Gagal mengambil data produk");
      }
      const category = await response.json();
      return category;
   } catch (error) {
      console.error(error);
      return null;
   }
}

export async function getRelatedProducts(
   category: string,
   excludeProductId: number
) {
   try {
      const response = await fetch(
         `${API_BASE_URL}/category/${category}?limit=10`
      );
      if (!response.ok) {
         throw new Error("Gagal mengambil produk terkait");
      }
      const data = await response.json();
      return data.products.filter(product => product.id !== excludeProductId);
   } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
   }
}
