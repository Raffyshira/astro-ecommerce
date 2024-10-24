import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, d as addAttribute, e as renderHead, f as renderSlot, m as maybeRenderHead } from './astro/server_B7VyQGdv.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                         */
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X, Search, ShoppingCart, Menu } from 'lucide-react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const SITE_TITLE = "Astro | E-commerce";
const SITE_DESCRIPTION = "E-commerce build with astro js";
const X_ACCOUNT = "@Raffyshira";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

const useCartStore = create()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(
          (entry) => entry.id === item.id
        );
        if (existingItem) {
          return {
            cart: state.cart.map(
              (entry) => entry.id === item.id ? {
                ...entry,
                quantity: entry.quantity + item.quantity
              } : entry
            )
          };
        }
        return {
          cart: [...state.cart, item]
        };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),
      clearCart: () => set({ cart: [] }),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(
          (item) => item.id === productId ? { ...item, quantity } : item
        )
      }))
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const useSearchStore = create()(
  persist(
    (set, get) => ({
      searchTerm: "",
      searchResults: [],
      loading: false,
      error: null,
      suggestions: [],
      suggestionsLoading: false,
      suggestionsError: null,
      setSearchTerm: (term) => set({ searchTerm: term }),
      performSearch: async () => {
        const { searchTerm } = get();
        console.log(`Performing search for: ${searchTerm}`);
        if (searchTerm.trim() === "") {
          set({ searchResults: [], error: null });
          console.log("Search term is empty. Resetting search results.");
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              searchTerm
            )}`
          );
          set({ searchResults: response.data.products, loading: false });
          console.log("Search results updated:", response.data.products);
        } catch (error) {
          set({
            error: "Terjadi Kesalahan Saat Mencari Produk",
            loading: false
          });
          console.error("Error during search:", error);
        }
      },
      fetchSuggestions: async () => {
        const { searchTerm } = get();
        if (searchTerm.trim() === "") {
          set({ suggestions: [], suggestionsError: null });
          return;
        }
        set({ suggestionsLoading: true, suggestionsError: null });
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              searchTerm
            )}&limit=10`
          );
          const uniqueTitles = Array.from(
            new Set(response.data.products.map((product) => product.title))
          );
          set({ suggestions: uniqueTitles, suggestionsLoading: false });
        } catch (error) {
          set({
            suggestionsError: "Terjadi Kesalahan Saat Memuat Saran",
            suggestionsLoading: false
          });
        }
      }
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const SearchForm = () => {
  const {
    searchTerm,
    setSearchTerm,
    performSearch,
    suggestions,
    fetchSuggestions,
    suggestionsLoading,
    suggestionsError
  } = useSearchStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions();
    }, 300);
  };
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      window.location.href = `/search/${encodeURIComponent(
        searchTerm.trim()
      )}`;
    }
    setShowSuggestions(false);
    performSearch();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      window.location.href = `/search/${encodeURIComponent(
        searchTerm.trim()
      )}`;
      setShowSuggestions(false);
      performSearch();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    performSearch();
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: wrapperRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-5 mb-4 sm:mb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Search products...",
            value: searchTerm,
            onChange: handleInputChange,
            onKeyDown: handleKeyDown,
            className: "w-full pl-8"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "sm:hidden", onClick: handleSearch, children: "Search" })
    ] }),
    showSuggestions && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-10 max-h-60 overflow-y-auto", children: suggestionsLoading ? /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("p", { children: "Loading .." }) }) : suggestionsError ? /* @__PURE__ */ jsx("div", { className: "p-4 text-red-500", children: suggestionsError }) : suggestions.length > 0 ? suggestions.map((suggestion, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "p-2 hover:bg-gray-100 cursor-pointer",
        onClick: () => handleSuggestionClick(suggestion),
        children: suggestion
      },
      index
    )) : /* @__PURE__ */ jsx("div", { className: "p-4 text-gray-500", children: "No suggestions found." }) })
  ] });
};

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const total = cart.length;
    setCartCount(total);
  }, [cart]);
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 z-50 w-full bg-white border-b transition-all duration-300 data-[scrolled=true]:bg-white data-[scrolled=true]:shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "container max-w-full w-full flex h-16 items-center justify-between px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "w-10 h-full invert dark:brightness-0",
          src: "/assets/logo-baru.png",
          alt: "logo",
          width: "100",
          height: "100"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-SatoshiBold", children: "Acme Inc" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden gap-6 text-sm font-medium md:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "/", className: "transition-colors hover:text-primary", children: "Home" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Services" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-x-2 flex justify-end items-center", children: [
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "sm:hidden",
            variant: "outline",
            size: "icon",
            "aria-label": "search-button",
            children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
          }
        ) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "h-full", side: "top", children: [
          /* @__PURE__ */ jsx(SheetTitle, { className: "mb-5", children: "Cari Di Acme Inc" }),
          /* @__PURE__ */ jsx(SearchForm, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "indicator", children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/cart", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsx("div", { className: "indicator-item px-1.5 bg-black text-sm text-white rounded-full font-SatoshiMedium", children: cartCount })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden sm:flex", children: /* @__PURE__ */ jsx(SearchForm, {}) }),
      /* @__PURE__ */ jsx(Button, { className: "hidden md:inline-flex md:items-center", children: "Get Started" }),
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "md:hidden",
            children: [
              /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle navigation" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 p-6", children: [
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "w-10 h-full invert dark:brightness-0",
                src: "/assets/logo-baru.png",
                alt: "logo",
                width: "100",
                height: "100"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-SatoshiMedium", children: "Acme Inc" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "grid gap-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/",
                className: "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                children: "About"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                children: "Services"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                children: "Contact"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Get Started" })
        ] }) })
      ] })
    ] })
  ] }) });
}

const $$MainHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/navbar/navbar.tsx", "client:component-export": "default" })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/components/main-components/MainHeader.astro", void 0);

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

const $$Astro$1 = createAstro("https://astroecommerce.netlify.app/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<html class="scroll-smooth" lang="id"> <head><title>${title || SITE_TITLE}</title><meta charset="UTF-8"><meta name="description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta name="viewport" content="width=device-width"><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><link rel="icon" type="image/svg+xml" href="/assets/logo-baru.png"><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title || SITE_TITLE, "content")}><meta property="og:description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:image"${addAttribute(Astro2.site + "logo-baru.png", "content")}><meta property="og:locale" content="id"><meta property="twitter:card" content="summary"><meta property="twitter:url"${addAttribute(X_ACCOUNT, "content")}><meta property="twitter:title"${addAttribute(title || SITE_TITLE, "content")}><meta property="twitter:description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta property="twitter:image"${addAttribute(Astro2.site + "logo-baru.png", "content")}>${renderHead()}</head> <body> ${renderComponent($$result, "MainHeader", $$MainHeader, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/toaster", "client:component-export": "Toaster" })} </body></html>`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro("https://astroecommerce.netlify.app/");
const $$Container = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Container;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["max-w-7xl w-full h-full px-5 py-5 lg:px-8 lg:py-8", className], "class:list")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/components/main-components/Container.astro", void 0);

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

export { $$Container as $, Badge as B, useToast as a, Button as b, $$Layout as c, cn as d, useSearchStore as e, useCartStore as u };
