import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_APlSdSn6.mjs';
import 'kleur/colors';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
import '../../chunks/astro/assets-service_Cx2YwZUn.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_BJPmXjLT.mjs';
import { P as ProductCarousel, g as getProductById, a as getRelatedProducts, b as getAllProducts, C as CardProduct } from '../../chunks/card-product_MUTKjlaG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { u as useCartStore, c as useToast, a as Button, b as $$Layout, $ as $$Container } from '../../chunks/badge_CpRJWjHR.mjs';
import { Heart, Star, Camera, MessagesSquare, ChevronRight, StarIcon, ClockIcon } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const ProductDetailMobile = ({
  id,
  price,
  discountPercentage = 0,
  title,
  rating = 0,
  reviews,
  description,
  brand,
  thumbnail,
  images,
  sku,
  category
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();
  const handleNotWork = () => {
    toast({
      title: "Maaf, Masih Tahap Development :)",
      variant: "destructive"
    });
  };
  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      brand,
      thumbnail,
      sku,
      discountPercentage
    });
    toast({
      title: "Yeay, Product Mu Sudah Di Keranjang"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-full w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:mt-20 md:px-5 overflow-hidden", children: [
    /* @__PURE__ */ jsx(ProductCarousel, { className: "md:col-span-1", dataImage: images }),
    /* @__PURE__ */ jsxs("div", { className: "w-full h-full overflow-hidden bg-slate-100 md:col-span-2 sm:bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white px-5 py-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-SatoshiBold text-xl", children: [
            "$",
            price
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm line-through text-slate-500 sm:text-base", children: "Rp.299.000" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base text-red-500 font-bold", children: [
            discountPercentage,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-center mt-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-SatoshiBold sm:text-2xl", children: title }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 hover:fill-red-500" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center gap-x-3 mt-2.5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Terjual 4 rb+" }),
          /* @__PURE__ */ jsxs("div", { className: "flex p-1 items-center border border-slate-300 rounded-lg space-x-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-yellow-500 stroke-0" }),
            /* @__PURE__ */ jsxs("p", { children: [
              rating,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "(1 rb)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex p-1 items-center border border-slate-300 rounded-lg space-x-1", children: [
            /* @__PURE__ */ jsx(Camera, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("p", { children: "200" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex p-1 items-center border border-slate-300 rounded-lg space-x-1", children: [
            /* @__PURE__ */ jsx(MessagesSquare, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("p", { children: reviews.length })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white px-5 py-5 mt-2.5", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Detail produk" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mt-3.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 ", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-muted-foreground sm:text-base ", children: "Tipe Garansi" }),
            /* @__PURE__ */ jsx("h4", { className: "text-sm sm:text-base", children: "Garansi Toko" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 border-t border-b py-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-muted-foreground sm:text-base", children: "Tahun Rilis" }),
            /* @__PURE__ */ jsx("h4", { className: "text-sm sm:text-base", children: "2024" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-muted-foreground sm:text-base", children: "Etalase" }),
            /* @__PURE__ */ jsx("h4", { className: "text-sm text-green-600 sm:text-base", children: "Acme Inc" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 border-t border-b py-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-muted-foreground sm:text-base", children: "Kategori" }),
            /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-sm text-green-600 sm:text-base capitalize", children: [
              "Home",
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }),
              category
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-bold", children: "Deskripsi produk" }),
            /* @__PURE__ */ jsx("p", { className: "mb-3.5", children: description }),
            /* @__PURE__ */ jsx("a", { className: "text-green-500", href: "/", children: "Baca Selengkapnya" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white px-5 py-5 mt-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center ", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center", children: brand ? /* @__PURE__ */ jsx("span", { className: "text-white text-xl font-bold", children: brand.charAt(0) }) : null }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: brand ? /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: brand }) : /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Acme Inc" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full mr-2" }),
                /* @__PURE__ */ jsx("span", { className: "text-green-500 text-sm font-medium", children: "Online" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Kota Tangerang" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              className: "text-green-600 border-green-600 font-SatoshiMedium hover:bg-green-50",
              children: "Follow"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "py-3 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-yellow-400" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-sm font-medium text-gray-700", children: "4.6" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-sm text-gray-500", children: "(1 rb)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-sm text-gray-600", children: "± 32 menit pesanan diproses" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white px-5 py-5 mt-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-SatoshiBold", children: "Ulasan pembeli" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-green-600 hover:underline", children: "Lihat Semua" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold mr-2", children: rating }),
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-yellow-400 fill-current" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600 ml-2", children: [
            reviews.length,
            " rating • 20 ulasan"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t pt-4", children: reviews.map((review, index) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-300 rounded-full mr-3" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: review.reviewerName }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                  Star,
                  {
                    className: `w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`
                  },
                  i
                )),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm ml-2", children: review.date })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Varian: Lorem" }),
          /* @__PURE__ */ jsx("p", { className: "mb-2 sm:text-lg", children: review.comment }),
          /* @__PURE__ */ jsx("button", { className: "text-sm text-gray-600 hover:underline", children: "10 terbantu" })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex justify-between  items-center fixed bottom-0 left-0 right-0 z-50 px-5 py-3 bg-white shadow gap-x-4\n            ",
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleNotWork,
                variant: "outline",
                className: "w-fit",
                children: /* @__PURE__ */ jsx(MessagesSquare, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: "font-SatoshiBold w-full",
                onClick: handleAddToCart,
                children: "Masukkan Keranjang"
              }
            )
          ]
        }
      )
    ] })
  ] });
};

const $$Astro = createAstro("http://localhost:4321/");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let product = null;
  let relatedProducts = [];
  let productRecomend = [];
  if (id !== void 0 && (typeof id === "string" || typeof id === "number")) {
    product = await getProductById(id);
    if (product) {
      console.log("Product Category:", product.category);
      relatedProducts = await getRelatedProducts(product.category, product.id);
      productRecomend = await getAllProducts(0, 15);
      productRecomend = productRecomend.sort(() => Math.random() - 0.5);
    } else {
      Astro2.response.status = 404;
    }
  } else {
    Astro2.response.status = 400;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": product?.title || "Astro Ecommerce", "description": product?.description || "Acme Inc" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-full mb-5"> <!-- Hanya render komponen jika produk ditemukan --> ${product ? renderTemplate`${renderComponent($$result2, "ProductDetailMobile", ProductDetailMobile, { "id": product.id, "price": product.price, "images": product.images, "category": product.category, "thumbnail": product.thumbnail, "title": product.title, "discountPercentage": product.discountPercentage, "rating": product.rating, "reviews": product.reviews, "description": product.description, "sku": product.sku, "brand": product.brand, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/features/product/product.tsx", "client:component-export": "ProductDetailMobile" })}
      ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <h2 class="text-lg font-SatoshiBold mb-5">Produk Terkait</h2> <div class="w-full flex overflow-x-scroll sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4"> ${relatedProducts.length > 0 ? relatedProducts.map((item) => renderTemplate`${renderComponent($$result3, "CardProduct", CardProduct, { "id": item.id, "discount": item.discountPercentage, "name": item.title, "price": item.price, "rating": item.rating }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Image", $$Image, { "alt": item.title, "class": "w-full h-fit w-full aspect-square object-cover bg-gray-100", "src": item.thumbnail, "width": "200", "height": "200", "loading": "lazy" })} ` })}`) : renderTemplate`<p>Tidak ada produk terkait.</p>`} </div> ` })}
      ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` <h2 class="text-lg font-SatoshiBold mb-5">Pilihan lain untuk mu</h2> <div class="w-full flex overflow-x-scroll sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4"> ${productRecomend.length > 0 ? productRecomend.map((item) => renderTemplate`${renderComponent($$result3, "CardProduct", CardProduct, { "id": item.id, "discount": item.discountPercentage, "name": item.title, "price": item.price, "rating": item.rating }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Image", $$Image, { "alt": item.title, "class": "w-full h-fit w-full aspect-square object-cover bg-gray-100", "src": item.thumbnail, "width": "200", "height": "200", "loading": "lazy" })} ` })}`) : renderTemplate`<p>Tidak ada produk terkait.</p>`} </div> ` })}` : renderTemplate`<p>Produk tidak ditemukan.</p>`} </div> ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/product/[id].astro", void 0);

const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/product/[id].astro";
const $$url = "/product/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$id,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
