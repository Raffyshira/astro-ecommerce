export interface AllProductTypes {
   id: number;
   price: number;
   discountPercentage?: number;
   title: string;
   rating: number;
   reviews?: any;
   desc?: string;
   brand: string;
   thumbnail: string;
   images: string[];
   sku: string;
   category: string;
   description: string;
}

export interface CardProductProps {
   id: number;
   name: string;
   price: number;
   image: string;
   discount?: number;
   rating: number;
   children: React.ReactNode;
}
