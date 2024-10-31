import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, d as addAttribute } from "../chunks/astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
import "@astrojs/internal-helpers/path";
import { $ as $$Image } from "../chunks/_astro_assets_8ZRGQkCu.mjs";
import { d as cn, B as Button, $ as $$Container, b as $$Layout } from "../chunks/Container_LDLqM13Q.mjs";
import { b as getAllProducts, C as CardProduct, c as getProductByCategory, T as TestCarousel } from "../chunks/card-product_CIkhEL-M.mjs";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { C as Card } from "../chunks/card_mvzUTpgv.mjs";
import { renderers } from "../renderers.mjs";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-start justify-start rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-start whitespace-nowrap rounded-sm px-3 py-1.5 text-sm sm:text-base font-SatoshiMedium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function ProductLists() {
  const [products, setProducts] = useState([]);
  const [page2, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayedProductIds, setDisplayedProductIds] = useState(
    /* @__PURE__ */ new Set()
  );
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newProducts = await getAllProducts(
        (page2 - 1) * 10,
        15,
        selectedCategory === "all" ? void 0 : selectedCategory
      );
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => {
          const uniqueNewProducts = newProducts.filter(
            (product) => !displayedProductIds.has(product.id)
          );
          setDisplayedProductIds(
            (prevIds) => /* @__PURE__ */ new Set([
              ...prevIds,
              ...uniqueNewProducts.map((product) => product.id)
            ])
          );
          return [...prevProducts, ...uniqueNewProducts];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      alert("Error fetching products: " + error);
    } finally {
      setLoading(false);
    }
  }, [page2, loading, hasMore, selectedCategory, displayedProductIds]);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDisplayedProductIds(/* @__PURE__ */ new Set());
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };
  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getProductByCategory();
      setCategories([
        { name: "All", value: "all" },
        ...categoriesData || []
      ]);
    };
    loadCategories();
    loadMoreProducts();
  }, [selectedCategory]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      Tabs,
      {
        onValueChange: handleCategoryChange,
        value: selectedCategory,
        defaultValue: "all",
        children: [
          /* @__PURE__ */ jsx("div", { className: "sticky top-16 z-40", children: /* @__PURE__ */ jsx(TabsList, { className: "flex flex-row overflow-x-auto bg-white", children: categories.map((category) => /* @__PURE__ */ jsx(
            TabsTrigger,
            {
              value: category.value || category.name.toLowerCase().replace(/\s+/g, "-"),
              className: "shrink-0 bg-white data-[state=active]:underline underline-offset-4",
              children: category.name
            },
            category.name
          )) }) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 0 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 0 },
              transition: { duration: 0.3 },
              className: "mt-4",
              children: categories.map((category) => /* @__PURE__ */ jsxs(
                TabsContent,
                {
                  value: category.value || category.name.toLowerCase().replace(/\s+/g, "-"),
                  children: [
                    products.length === 0 && !loading && /* @__PURE__ */ jsx("p", { className: "text-center mt-4", children: "No products found for this category." }),
                    /* @__PURE__ */ jsx("div", { className: "w-full h-fit columns-2 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4", children: products.map((product) => /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
                      CardProduct,
                      {
                        id: product.id,
                        discount: product.discountPercentage,
                        name: product.title,
                        price: product.price,
                        rating: product.rating,
                        className: "shrink-0 h-fit",
                        isLineClamp: false,
                        children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            alt: product.title,
                            className: "w-full aspect-square object-cover bg-gray-100",
                            src: product.thumbnail,
                            width: "200",
                            height: "200",
                            loading: "lazy"
                          }
                        )
                      }
                    ) }, product.id)) })
                  ]
                },
                category.name
              ))
            },
            selectedCategory
          ) })
        ]
      }
    ),
    loading && /* @__PURE__ */ jsx("p", { className: "text-center mb-16", children: "Loading more products..." }),
    !hasMore ? /* @__PURE__ */ jsx("p", { className: "text-center mb-16", children: "No more products to load" }) : /* @__PURE__ */ jsx("div", { className: "text-center mt-4 mb-16 px-5", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: loadMoreProducts,
        className: "font-SatoshiMedium w-full",
        disabled: loading,
        children: loading ? "Loading..." : "Load More"
      }
    ) })
  ] });
}
const CardByCategory = ({ src, title }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Card, { className: "max-w-md w-full h-full relative z-20 hover:scale-95 transition-transform duration-500 ease-in-out", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: title,
        loading: "lazy",
        width: "1600",
        height: "600",
        className: "rounded-xl w-full h-full"
      }
    ),
    /* @__PURE__ */ jsx("h3", { className: "absolute top-5 left-5 z-10 font-SatoshiBold text-2xl text-white", children: title })
  ] }) });
};
const LandingPage = new Proxy({ "src": "/_astro/landing_page.0quDChz2.jpg", "width": 735, "height": 517, "format": "jpg" }, {
  get(target, name, receiver) {
    if (name === "clone") {
      return structuredClone(target);
    }
    if (name === "fsPath") {
      return "/data/data/com.termux/files/home/astro-ecommerce/src/assets/images/landing_page.jpg";
    }
    return target[name];
  }
});
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getAllProducts();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="z-20 mt-16 p-2"> ${renderComponent($$result2, "Image", $$Image, { "class": "w-full h-full aspect-video object-cover rounded-xl", "src": LandingPage, "alt": "photo", "width": 1600, "height": 600 })} </div> ${renderComponent($$result2, "Container", $$Container, { "class": "max-w-full" }, { "default": ($$result3) => renderTemplate` <div class="w-full flex justify-between items-center"> <h2 class="font-SatoshiBold sm:text-2xl">Shop By Category</h2> <a class="font-SatoshiLight hover:underline underline-offset-4 sm:text-xl " href="/">See All</a> </div> <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3"> ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/Furniture.png", "title": "Furniture", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/handbag.png", "title": "HandBag", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/books.png", "title": "Books", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/tech.png", "title": "Tech", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/sneakers.png", "title": "Sneakers", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/travel.png", "title": "Travel", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} </div> ` })} ${renderComponent($$result2, "Container", $$Container, { "class": "py-0 -mb-12" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TestCarousel", TestCarousel, { "client:load": true, "initialScroll": 0, "client:component-hydration": "load", "client:component-path": "@/features/product/ProductCarousel.tsx", "client:component-export": "TestCarousel" }, { "default": ($$result4) => renderTemplate`${products.slice(0, 7).map((item) => renderTemplate`${renderComponent($$result4, "CardProduct", CardProduct, { "id": item.id, "discount": item.discountPercentage, "name": item.title, "price": item.price, "rating": item.rating, "className": "w-40 sm:w-50" }, { "default": ($$result5) => renderTemplate` <img${addAttribute(item.title, "alt")} class="w-full h-fit w-full aspect-square object-cover bg-gray-100"${addAttribute(item.thumbnail, "src")} width="200" height="200" loading="lazy"> ` })}`)}` })} ` })} ${renderComponent($$result2, "Container", $$Container, { "class": "px-0" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ProductLists", ProductLists, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/features/product/ProductsLists.tsx", "client:component-export": "default" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
