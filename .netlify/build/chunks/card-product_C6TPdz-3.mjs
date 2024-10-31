import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useRef, useState, useEffect } from "react";
import { d as cn, B as Button } from "./Container_DymqdPQ5.mjs";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight, Star } from "lucide-react";
import { B as Badge } from "./badge__kECrbPe.mjs";
import { C as Card, a as CardContent, b as CardFooter } from "./card_DvsrwaWt.mjs";
const API_BASE_URL = "https://dummyjson.com/products";
async function getAllProducts(offset = 0, limit = 15, category) {
  const cacheKey = `product-${limit}-${offset}-${category || "all"} `;
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && localStorage.getItem(cacheKey)) {
    return JSON.parse(localStorage.getItem(cacheKey) || "[]");
  }
  try {
    const url = category ? `${API_BASE_URL}/category/${category}?limit=${limit}&skip=${offset}` : `${API_BASE_URL}?limit=${limit}&skip=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Gagal mengambil data produk");
    }
    const data = await response.json();
    if (isBrowser) {
      localStorage.setItem(cacheKey, JSON.stringify(data.products));
    }
    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function getProductById(id) {
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
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getProductByCategory() {
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
async function getRelatedProducts(category, excludeProductId) {
  const cacheKey = `related-products-${category}`;
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && localStorage.getItem(cacheKey)) {
    return JSON.parse(localStorage.getItem(cacheKey) || "[]").filter(
      (product) => product.id !== excludeProductId
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
      (product) => product.id !== excludeProductId
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}
const CarouselContext$1 = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext$1);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext$1.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "left-5 sm:left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "right-5 sm:right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const ProductCarousel = ({
  dataImage,
  className
}) => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
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
  return /* @__PURE__ */ jsxs("div", { className: cn("relative h-fit", className), children: [
    /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: {
          align: "start",
          loop: true
        },
        className: "mt-10 w-full max-w-full overflow-hidden sm:mt-0",
        setApi,
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { children: dataImage.map((item, index) => /* @__PURE__ */ jsx(CarouselItem, { className: " w-full", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: item,
              className: "w-full aspect-square object-cover mx-auto sm:w-96",
              alt: "...",
              width: "600",
              height: "400",
              loading: "lazy"
            }
          ) }, index)) }),
          /* @__PURE__ */ jsx(CarouselPrevious, {}),
          /* @__PURE__ */ jsx(CarouselNext, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 right-5 text-center text-sm bg-white px-2 rounded-lg", children: [
      "Slide ",
      current,
      " of ",
      count
    ] })
  ] });
};
const CarouselContext = createContext({
  onCardClose: () => {
  },
  currentIndex: 0
});
const TestCarousel = ({
  initialScroll = 0,
  children
}) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const currentIndex = 0;
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft: scrollLeft2, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft2 > 0);
      setCanScrollRight(scrollLeft2 < scrollWidth - clientWidth);
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
  return /* @__PURE__ */ jsx(CarouselContext.Provider, { value: { currentIndex }, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-SatoshiBold sm:text-2xl", children: "Todays Best Deals For You!" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            id: "previous-button",
            "aria-label": "previous-button-carousel",
            className: "relative z-40 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center disabled:opacity-50",
            onClick: scrollLeft,
            disabled: !canScrollLeft,
            children: /* @__PURE__ */ jsx(MoveLeft, { className: "h-5 w-5 text-black" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            id: "next-button",
            "aria-label": "next-button-carousel",
            className: "relative z-40 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center disabled:opacity-50",
            onClick: scrollRight,
            disabled: !canScrollRight,
            children: /* @__PURE__ */ jsx(MoveRight, { className: "h-5 w-5 text-black" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex w-full h-full overflow-x-scroll overscroll-x-auto py-5 md:py-5 scroll-smooth [scrollbar-width:none]",
        ref: carouselRef,
        onScroll: checkScrollability,
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-start gap-4 shrink-0 max-w-7xl mx-auto", children })
      }
    )
  ] }) });
};
const CardProduct = ({
  id,
  name,
  price,
  discount,
  rating,
  children,
  className,
  isLineClamp = true
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "max-w-md shadow-none w-50 h-fit border-none overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("a", { href: `/product/${id}`, children }),
        /* @__PURE__ */ jsxs(CardContent, { className: "p-3", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "destructive", children: [
            discount,
            "% Off"
          ] }),
          isLineClamp ? /* @__PURE__ */ jsx("h2", { className: "text-base mt-2 font-semibold line-clamp-1", children: name }) : /* @__PURE__ */ jsx("h2", { className: "text-base mt-2 font-semibold", children: name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between space-x-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-base font-SatoshiBold", children: [
              "$",
              price
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 line-through", children: "Rp299.000" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "w-full flex justify-start items-center px-3 pt-0", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-yellow-400 stroke-0" }),
          /* @__PURE__ */ jsxs("span", { className: "ml-1 text-sm", children: [
            rating,
            " • 3rb+ terjual"
          ] })
        ] })
      ]
    }
  ) });
};
export {
  CardProduct as C,
  ProductCarousel as P,
  TestCarousel as T,
  getRelatedProducts as a,
  getAllProducts as b,
  getProductByCategory as c,
  getProductById as g
};
