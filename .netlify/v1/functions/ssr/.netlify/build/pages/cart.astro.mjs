import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_APlSdSn6.mjs';
import 'kleur/colors';
import 'html-escaper';
import { u as useCartStore, B as Badge, a as Button, $ as $$Container, b as $$Layout } from '../chunks/badge_CpRJWjHR.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Trash2, Heart } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [totalHarga, setTotalHarga] = useState(0);
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - price * discountPercentage / 100;
  };
  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };
  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };
  useEffect(() => {
    const total = cart.reduce((acc, product) => {
      const discountedPrice = calculateDiscountedPrice(
        product.price,
        product.discountPercentage || 0
      );
      return acc + discountedPrice * product.quantity;
    }, 0);
    setTotalHarga(total);
  }, [cart]);
  return /* @__PURE__ */ jsx("div", { className: "mt-14", children: cart.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-2xl font-SatoshiBold", children: "Your cart is empty." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-SatoshiBold", children: "Keranjang" }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full h-fit grid grid-cols-1 sm:grid-cols-3 gap-4 ", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col gap-4 sm:col-span-2", children: cart.map((item) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "border-b px-5 pb-2 sm:shadow rounded-lg bg-white py-5",
          children: /* @__PURE__ */ jsx("div", { className: "max-w-full w-full h-full mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 mb-4", children: item.brand ? /* @__PURE__ */ jsxs("span", { className: "font-semibold text-lg inline-flex items-center gap-x-1", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "w-6",
                  src: "/assets/icon/badge_os.png",
                  alt: "official store"
                }
              ),
              " ",
              item.brand
            ] }) : /* @__PURE__ */ jsx("span", { className: "font-semibold text-lg", children: "Acme Inc" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "relative w-24 h-24", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.thumbnail,
                  alt: item.name,
                  className: "rounded object-cover bg-slate-100",
                  loading: "lazy",
                  width: "200",
                  height: "200"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "sm:flex justify-between items-center", children: [
                  " ",
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg leading-tight sm:text-xl", children: item.name }),
                  /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg sm:text-xl", children: [
                    "$",
                    item.price
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  item.discountPercentage ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
                    item.discountPercentage,
                    "% Off"
                  ] }) : null,
                  item.sku ? /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: item.sku }) : null
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-x-3", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => removeFromCart(item.id),
                    size: "icon",
                    className: "rounded-full",
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "remove product from cart" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "icon",
                    className: "rounded-full",
                    children: [
                      /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 hover:fill-destructive hover:stroke-0" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to favorites" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center border rounded-full", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "rounded-full",
                    onClick: () => decreaseQuantity(
                      item.id,
                      item.quantity
                    ),
                    children: "-"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "mx-2", children: item.quantity }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "rounded-full",
                    onClick: () => increaseQuantity(
                      item.id,
                      item.quantity
                    ),
                    children: "+"
                  }
                )
              ] })
            ] })
          ] }) })
        },
        item.id
      )) }),
      cart.length > 0 && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 px-5 py-3 bg-white shadow gap-x-4 sm:static sm:col-span-1 sm:h-full sm:rounded-lg sm:flex sm:flex-col sm:justify-between sm:items-start", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-SatoshiBold sm:mb-5 hidden sm:flex", children: "Ringkasan Belanja" }),
        /* @__PURE__ */ jsxs("h3", { className: "w-full text-end mb-2.5 font-SatoshiMedium text-sm sm:text-lg sm:inline-flex sm:justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Harga:" }),
          " $",
          totalHarga.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between gap-x-3 sm:mt-5  items-center", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "font-SatoshiBold w-fit",
              variant: "outline",
              onClick: clearCart,
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-1" }),
                "Clear Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Button, { className: "w-full font-SatoshiBold", children: [
            "Checkout (",
            cart.length,
            ")"
          ] })
        ] })
      ] })
    ] })
  ] }) });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Cart", Cart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/features/cart/Cart.tsx", "client:component-export": "default" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro", void 0);

const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Index,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
