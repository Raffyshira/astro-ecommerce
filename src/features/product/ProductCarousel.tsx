import React, { useEffect, useRef, useState, createContext } from "react";
import { cn } from "@/lib/utils";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import { MoveLeft, MoveRight } from "lucide-react";

interface CarouselContextType {
   onCardClose?: () => void;
   currentIndex: number;
}

interface PropsDataImage {
   dataImage: string[];
   className: string;
}

interface TestCarouselProps {
   initialScroll?: number;
   children: React.ReactNode;
}

export const ProductCarousel: React.FC<PropsDataImage> = ({
   dataImage,
   className,
}) => {
   const [api, setApi] = useState<CarouselApi>();
   const [current, setCurrent] = useState<number>(0);
   const [count, setCount] = useState<number>(0);

   useEffect(() => {
      if (!api) {
         return;
      }
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
         setCurrent(api.selectedScrollSnap() + 1);
      });
   }, [api]);

   return (
      <div className={cn("relative h-fit", className)}>
         <Carousel
            opts={{
               align: "start",
               loop: true
            }}
            className="mt-10 w-full max-w-full overflow-hidden sm:mt-0"
            setApi={setApi}
         >
            <CarouselContent>
               {dataImage.map(item => (
                  <CarouselItem key={item.id} className=" w-full">
                     <img
                        src={item}
                        className="w-full aspect-square object-cover mx-auto sm:w-96"
                        alt="..."
                        width="600"
                        height="400"
                        loading="lazy"
                        
                     />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
         <div className="absolute bottom-3 right-5 text-center text-sm bg-white px-2 rounded-lg">
            Slide {current} of {count}
         </div>
      </div>
   );
};

export const CarouselContext = createContext<CarouselContextType>({
   onCardClose: () => {},
   currentIndex: 0
});

export const TestCarousel: React.FC<TestCarouselProps> = ({
   initialScroll = 0,
   children
}) => {
   const carouselRef = useRef<HTMLDivElement>(null);
   const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
   const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
   const currentIndex = 0;

   useEffect(() => {
      if (carouselRef.current) {
         carouselRef.current.scrollLeft = initialScroll;
         checkScrollability();
      }
   }, [initialScroll]);

   const checkScrollability = () => {
      if (carouselRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
         setCanScrollLeft(scrollLeft > 0);
         setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
   };

   const scrollLeft = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
   };

   const scrollRight = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
   };

   return (
      <CarouselContext.Provider value={{ currentIndex }}>
         <div className="relative w-full">
            <div className="flex justify-between items-center w-full">
               <h2 className="font-SatoshiBold sm:text-2xl">
                  Todays Best Deals For You!
               </h2>
               <div className="flex justify-end gap-2">
                  <button
                     id="previous-button"
                     aria-label="previous-button-carousel"
                     className="relative z-40 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center disabled:opacity-50"
                     onClick={scrollLeft}
                     disabled={!canScrollLeft}
                  >
                     <MoveLeft className="h-5 w-5 text-black" />
                  </button>
                  <button
                     id="next-button"
                     aria-label="next-button-carousel"
                     className="relative z-40 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center disabled:opacity-50"
                     onClick={scrollRight}
                     disabled={!canScrollRight}
                  >
                     <MoveRight className="h-5 w-5 text-black" />
                  </button>
               </div>
            </div>
            <div
               className="flex w-full h-full overflow-x-scroll overscroll-x-auto py-5 md:py-5 scroll-smooth [scrollbar-width:none]"
               ref={carouselRef}
               onScroll={checkScrollability}
            >
               <div className="flex flex-row justify-start gap-4 shrink-0 max-w-7xl mx-auto">
                  {children}
               </div>
            </div>
         </div>
      </CarouselContext.Provider>
   );
};
