import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel";
interface PropsDataImage {
   dataImage: [];
}
export const ProductCarousel = ({ dataImage }: PropsDataImage) => {
   return (
      <>
         <Carousel
            opts={{
               align: "start",
               loop: true
            }}
            className="mt-10 w-full max-w-full overflow-hidden"
         >
            <CarouselContent>
               {dataImage.map((item, index) => (
                  <CarouselItem key={index} className=" w-full">
                     <img
                        src={item}
                        className="w-full aspect-square object-cover mx-auto sm:aspect-video"
                        alt="Tailwind CSS Carousel component"
                     />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      </>
   );
};
