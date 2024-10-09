import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function ModalDetailProduk({ description }: string) {
   return (
      <div className="w-full h-full max-w-3xl mx-auto p-4 bg-white rounded-lg mt-2.5">
         <h3 className="text-xl font-bold">Detail produk</h3>
         <div className="grid gap-4 mt-3.5">
            <div className="grid grid-cols-2 gap-2">
               <div className="text-sm font-medium text-muted-foreground">
                  Tipe Garansi
               </div>
               <div className="text-sm">Garansi Toko</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-b py-2">
               <div className="text-sm font-medium text-muted-foreground">
                  Tahun Rilis
               </div>
               <div className="text-sm">2024</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
               <div className="text-sm font-medium text-muted-foreground">
                  Etalase
               </div>
               <div className="text-sm text-green-600">
                  TWS dan Earphone Bluetooth
               </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-b py-2">
               <div className="text-sm font-medium text-muted-foreground">
                  Kategori
               </div>
               <div className="flex items-center text-sm text-green-600">
                  Home
                  <ChevronRight className="h-4 w-4" />
                  Audio, Kamera & Elektronik
               </div>
            </div>
            <div className="mt-4">
               <h3 className="mb-2 text-xl font-bold">Deskripsi produk</h3>
               <p className="mb-3.5">{description}</p>
               <a className="text-green-500" href="/">
                  Baca Selengkapnya
               </a>
            </div>
         </div>
      </div>
   );
}
