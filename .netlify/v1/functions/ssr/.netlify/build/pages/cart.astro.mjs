import { c as createComponent, r as renderTemplate, a as renderComponent } from "../chunks/astro/server_BZopLqt2.mjs";
import "kleur/colors";
import "html-escaper";
import { u as useCartStore, a as useToast, B as Button, $ as $$Container, b as $$Layout } from "../chunks/Container_CglYaq8S.mjs";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Trash2, Heart, Loader2 } from "lucide-react";
import { B as Badge } from "../chunks/badge_BZPtyY9U.mjs";
import { renderers } from "../renderers.mjs";
var V3_URL = "https://js.stripe.com/v3";
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = "";
  var script = document.createElement("script");
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "4.8.0",
    startTime
  });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError2(reject) {
  return function() {
    reject(new Error("Failed to load Stripe.js"));
  };
};
var onLoad = function onLoad2(resolve, reject) {
  return function() {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error("Stripe.js not available"));
    }
  };
};
var loadScript = function loadScript2(params) {
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise(function(resolve, reject) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;
        script.removeEventListener("load", onLoadListener);
        script.removeEventListener("error", onErrorListener);
        (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener("load", onLoadListener);
      script.addEventListener("error", onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise$1["catch"](function(error) {
    stripePromise$1 = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var stripe = maybeStripe.apply(void 0, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var stripePromise$1$1;
var loadCalled = false;
var getStripePromise = function getStripePromise2() {
  if (stripePromise$1$1) {
    return stripePromise$1$1;
  }
  stripePromise$1$1 = loadScript(null)["catch"](function(error) {
    stripePromise$1$1 = null;
    return Promise.reject(error);
  });
  return stripePromise$1$1;
};
Promise.resolve().then(function() {
  return getStripePromise();
})["catch"](function(error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now();
  return getStripePromise().then(function(maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};
const stripePromise = loadStripe("pk_test_51QHPW500Ve0FplXnDmsPCpks8z0oLjUYORlf35tZSBFKCm7kQtegebq1XSgsWv1pY6iw2Bl3KbbC0xBvCQBeAIH800LmLKNQst");
const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [loading, setLoading] = useState(false);
  useToast();
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
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: cart })
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: cart.length === 0 ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full h-screen flex flex-col justify-center\n            items-center",
      children: [
        /* @__PURE__ */ jsx("h4", { className: "text-center text-2xl font-SatoshiBold", children: "Ohh no, Your cart is empty" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: "It seems you dont have a items in your cart" }),
        /* @__PURE__ */ jsx(Button, { className: "mt-3.5", variant: "gooeyRight", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/", children: "Explore our product" }) })
      ]
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5 mt-14  ", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-SatoshiBold", children: [
      "Keranjang (",
      cart.length,
      ")"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full h-fit grid grid-cols-1 pb-20 sm:grid-cols-3 gap-4 ", children: [
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
      cart.length > 0 && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "fixed bottom-0 left-0 right-0 z-30 px-5\n                     py-3 bg-white shadow gap-x-4 sm:static sm:col-span-1\n                     sm:max-h-52 sm:rounded-lg sm:flex sm:flex-col sm:justify-between\n                     sm:items-start",
          children: [
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
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleCheckout,
                  disabled: loading,
                  className: "w-full font-SatoshiBold",
                  children: loading ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
                    /* @__PURE__ */ jsx(
                      Loader2,
                      {
                        className: "w-4 h-4 mr-2\n                                    animate-spin duration-1000"
                      }
                    ),
                    "Processing"
                  ] }) : "Checkout"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] }) });
};
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Cart", Cart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/features/cart/Cart.tsx", "client:component-export": "default" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro";
const $$url = "/cart";
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
