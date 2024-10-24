import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_B7VyQGdv.mjs';
import 'kleur/colors';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../chunks/_astro_assets_C9Nkrvwx.mjs';
import { b as Button, $ as $$Container, c as $$Layout } from '../chunks/badge_DmT3D4ir.mjs';
import { b as getAllProducts, C as CardProduct, c as getProductByCategory, T as TestCarousel } from '../chunks/card-product_Czv-Vd9W.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback, useEffect, useRef } from 'react';
import { C as Card } from '../chunks/card_DPGYi5l5.mjs';
export { renderers } from '../renderers.mjs';

const useInfiniteScroll = (callback) => {
  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback]
  );
  return lastElementRef;
};
function ProductLists() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newProducts = await getAllProducts((page - 1) * 10);
      const randomProduct = newProducts.sort(() => Math.random() - 0.5);
      if (randomProduct.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...randomProduct]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  const lastProductRef = useInfiniteScroll(loadMoreProducts);
  useEffect(() => {
    loadMoreProducts();
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-fit columns-2 sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4", children: products.map((product, index) => /* @__PURE__ */ jsx(
      "div",
      {
        ref: index === products.length - 1 ? lastProductRef : null,
        className: "mb-4",
        children: /* @__PURE__ */ jsx(
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
                className: "w-full h-fit w-full aspect-square object-cover bg-gray-100",
                src: product.thumbnail,
                width: "200",
                height: "200",
                loading: "lazy"
              }
            )
          }
        )
      },
      product.id
    )) }),
    loading && /* @__PURE__ */ jsx("p", { className: "text-center mt-4", children: "Loading more products..." }),
    !hasMore && /* @__PURE__ */ jsx("p", { className: "text-center mt-4", children: "No more products to load" })
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

const LandingPage = new Proxy({"src":"/_astro/landing_page.0quDChz2.jpg","width":735,"height":517,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/data/data/com.termux/files/home/astro-ecommerce/src/assets/images/landing_page.jpg";
							}
							
							return target[name];
						}
					});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getAllProducts();
  const productsCategory = await getProductByCategory();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative z-20 mt-14"> ${renderComponent($$result2, "Image", $$Image, { "class": "w-full h-full aspect-video object-cover", "src": LandingPage, "alt": "photo", "width": 1600, "height": 600 })} <div class="absolute top-10 right-10 z-10 text-end text-white w-fit sm:top-20 sm:right-20"> <h1 class="text-2xl font-SatoshiBold sm:text-4xl">New Collections</h1> <p class="w-64 sm:text-xl sm:w-full">sint proident occaecat laborum amet officia non</p> ${renderComponent($$result2, "Button", Button, { "className": "mt-2 font-SatoshiMedium uppercase h-8 rounded-md px-3" }, { "default": ($$result3) => renderTemplate`Shop Now` })} </div> </div> ${renderComponent($$result2, "Container", $$Container, { "class": "max-w-full" }, { "default": ($$result3) => renderTemplate` <div class="w-full flex justify-between items-center"> <h2 class="font-SatoshiBold sm:text-2xl">Shop By Category</h2> <a class="font-SatoshiLight hover:underline underline-offset-4 sm:text-xl " href="/">See All</a> </div> <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3"> ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/Furniture.png", "title": "Furniture", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/handbag.png", "title": "HandBag", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/books.png", "title": "Books", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/tech.png", "title": "Tech", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/sneakers.png", "title": "Sneakers", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} ${renderComponent($$result3, "CardByCategory", CardByCategory, { "src": "/assets/images/travel.png", "title": "Travel", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/card-product.tsx", "client:component-export": "CardByCategory" })} </div> ` })} ${renderComponent($$result2, "Container", $$Container, { "class": "py-0 -mb-12" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TestCarousel", TestCarousel, { "client:load": true, "initialScroll": 0, "client:component-hydration": "load", "client:component-path": "@/features/product/ProductCarousel.tsx", "client:component-export": "TestCarousel" }, { "default": ($$result4) => renderTemplate`${products.slice(0, 7).map((item) => renderTemplate`${renderComponent($$result4, "CardProduct", CardProduct, { "id": item.id, "discount": item.discountPercentage, "name": item.title, "price": item.price, "rating": item.rating, "className": "w-40 sm:w-50" }, { "default": ($$result5) => renderTemplate` <img${addAttribute(item.title, "alt")} class="w-full h-fit w-full aspect-square object-cover bg-gray-100"${addAttribute(item.thumbnail, "src")} width="200" height="200" loading="lazy"> ` })}`)}` })} ` })} ${renderComponent($$result2, "Container", $$Container, { "class": "sticky top-14 bg-white z-40" }, { "default": ($$result3) => renderTemplate` <div class="flex flex-row w-full h-full overflow-x-scroll gap-x-3.5 scrollbar"> ${productsCategory.slice(0, 8).map((item) => renderTemplate`<a href="/" class="shrink-0 rounded-full font-SatoshiMedium border border-slate-500 px-2 rounded-md">${item.name}</a>`)} </div> ` })} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ProductLists", ProductLists, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/data/data/com.termux/files/home/astro-ecommerce/src/features/product/ProductsLists.tsx", "client:component-export": "default" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro", void 0);

const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Index,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
