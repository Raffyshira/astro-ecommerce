import { c as createComponent, r as renderTemplate, a as renderComponent } from "../chunks/astro/server_BZopLqt2.mjs";
import "kleur/colors";
import "html-escaper";
import { u as useCartStore, B as Button, $ as $$Container, b as $$Layout } from "../chunks/Container_CglYaq8S.mjs";
import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { renderers } from "../renderers.mjs";
const CheckoutSuccess = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "checkout-success h-screen flex flex-col justify-center\n      items-center text-center",
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-red-500 uppercase font-SatoshiMedium text-xs", children: "*Ini hanyalah simulasi" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-SatoshiBold", children: "Checkout Berhasil!" }),
        /* @__PURE__ */ jsx("p", { children: "Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses." }),
        /* @__PURE__ */ jsx(Button, { variant: "gooeyLeft", className: "mt-3.5", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/", children: "Back to Homepage" }) })
      ]
    }
  );
};
const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CheckoutSuccess", CheckoutSuccess, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/features/cart/checkout-success.tsx", "client:component-export": "default" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/success.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/success.astro";
const $$url = "/success";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
