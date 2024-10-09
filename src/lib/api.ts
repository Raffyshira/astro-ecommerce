export const prerender = false;
const API_BASE_URL = "https://dummyjson.com/products";

/**
 * Mengambil semua produk dari API
 * @returns {Promise<Array>} Array produk
 */
export async function getAllProducts() {
   try {
      const response = await fetch(`${API_BASE_URL}?limit=30`); // Menyesuaikan limit sesuai kebutuhan
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
      const response = await fetch(
         "https://dummyjson.com/products/category-list"
      );
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
