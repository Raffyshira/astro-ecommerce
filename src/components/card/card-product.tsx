import { Card, CardTitle } from "@/components/ui/card.tsx";

interface CardByCategoryProps {
   src: string;
   title: string;
}
export const CardByCategory = ({ src, title }: CardByCategoryProps) => {
   return (
      <>
         <Card className="max-w-md w-full h-full relative z-20 hover:scale-95 transition-transform duration-500 ease-in-out">
            <img
               src={src}
               alt={title}
               loading="lazy"
               width="1600"
               height="400"
               className="rounded-xl w-full h-full"
            />
            <h3 className="absolute top-5 left-5 z-10 font-SatoshiBold text-2xl text-white">
               {title}
            </h3>
         </Card>
      </>
   );
};
