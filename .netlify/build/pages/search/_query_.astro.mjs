import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from "../../chunks/astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
import { d as cn, e as useSearchStore, $ as $$Container, f as BottomNav, b as $$Layout } from "../../chunks/Container_BKhQ0jDb.mjs";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { C as Card, a as CardContent, b as CardFooter } from "../../chunks/card_DLAtJZXg.mjs";
import { B as Badge } from "../../chunks/badge_DD5pvvNR.mjs";
import { Star } from "lucide-react";
import { renderers } from "../../renderers.mjs";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
const CardSkeletonProduct = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Card, { className: "flex bg-transparent flex-col max-w-sm w-50 h-fit border-none overflow-hidden space-y-3 my-3.5", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-[200px] w-50 rounded-xl" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[250px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[180px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[100px]" })
    ] })
  ] }) });
};
const SearchResult = ({ query }) => {
  const { setSearchTerm, searchResults, loading, error, performSearch } = useSearchStore();
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch();
    }
  }, [query, setSearchTerm, performSearch]);
  return /* @__PURE__ */ jsx("div", { children: loading ? /* @__PURE__ */ jsx("div", { className: "columns-2", children: Array(6).fill(0).map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CardSkeletonProduct, {}) }, index)) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: error }),
    /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "columns-2 sm:grid  sm:grid-cols-3 md:grid-cols-4 gap-4", children: searchResults.length > 0 ? searchResults.map((product) => /* @__PURE__ */ jsxs(Card, { className: "max-w-sm w-50 h-fit border-none overflow-hidden bg-background shrink-0 shadow-none", children: [
      /* @__PURE__ */ jsx("a", { href: `/product/${product.id}`, children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: product.title,
          className: "h-56 w-full aspect-square object-cover bg-slate-100",
          src: product.thumbnail,
          width: "200",
          height: "200"
        }
      ) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "p-3", children: [
        /* @__PURE__ */ jsxs(Badge, { variant: "destructive", children: [
          product.discountPercentage,
          "% Off"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-base mt-2 font-semibold", children: product.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-baseline justify-between space-x-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-base font-SatoshiBold", children: [
            "$",
            product.price
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx("p", { className: "text-base text-gray-500 line-through", children: "Rp299.000" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-between items-start -ml-2.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-1 text-sm", children: [
          product.rating,
          " • 3rb+ terjual"
        ] })
      ] }) })
    ] })) : !loading && /* @__PURE__ */ jsx("p", { className: "mt-20", children: "No products found." }) }) })
  ] }) });
};
const $$Astro = createAstro("http://localhost:4321/");
const $$query = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$query;
  const { query } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-14" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-5 text-base font-SatoshiBold">Search Result For : ${query}</h1> ${renderComponent($$result3, "SearchResults", SearchResult, { "query": query, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/features/search/SearchResults.tsx", "client:component-export": "default" })} <div class="mt-5 pb-10"> <a href="/" role="button" class="btn btn-neutral  w-full ">Back To Home</a> </div> ` })} ${renderComponent($$result2, "BottomNav", BottomNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/navbar/bottom-nav.tsx", "client:component-export": "default" })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/search/[query].astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/search/[query].astro";
const $$url = "/search/[query]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$query,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
