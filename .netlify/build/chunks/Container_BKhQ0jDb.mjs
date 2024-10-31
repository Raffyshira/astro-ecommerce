import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, d as addAttribute, g as renderHead, e as renderSlot, m as maybeRenderHead } from "./astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
/* empty css                         */
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useCallback, useSyncExternalStore, useState, useRef, useEffect } from "react";
import { deriveState } from "@clerk/shared/deriveState";
import { eventMethodCalled } from "@clerk/shared/telemetry";
import { map, atom, computed, batched, onMount } from "nanostores";
import { a as authAsyncStorage } from "./async-local-storage.server_DC-z4u9b.mjs";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Check, Circle, User, LayoutDashboard, Settings, LogOut, X, ChevronDown, Search, History, ShoppingCart, Menu, Home, Briefcase, Mail, Info, Heart, ReceiptText, Star, ScanQrCode, Bell } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import * as ToastPrimitives from "@radix-ui/react-toast";
const SITE_TITLE = "Astro | E-commerce";
const SITE_DESCRIPTION = "E-commerce build with astro js";
const X_ACCOUNT = "@Raffyshira";
var $csrState = map({
  isLoaded: false,
  client: void 0,
  user: void 0,
  session: void 0,
  organization: void 0
});
var $initialState = map();
var $clerk = atom(null);
computed([$csrState], (state) => state.isLoaded);
var $authStore = batched([$csrState, $initialState], (state, initialState) => {
  return deriveState(
    state.isLoaded,
    {
      session: state.session,
      user: state.user,
      organization: state.organization,
      client: state.client
    },
    initialState
  );
});
computed([$authStore], (auth) => auth.user);
computed([$authStore], (auth) => auth.session);
var $organizationStore = computed([$authStore], (auth) => auth.organization);
var $clientStore = computed([$csrState], (csr) => csr.client);
computed([$clerk], (clerk) => clerk);
computed([$clientStore], (client) => client?.sessions);
var $signInStore = computed([$clientStore], (client) => client?.signIn);
var $signUpStore = computed([$clientStore], (client) => client?.signUp);
var recordTelemetryEvent = (store, method) => {
  onMount(store, () => {
    $clerk.get()?.telemetry?.record(eventMethodCalled(method));
  });
};
recordTelemetryEvent($signInStore, "$signInStore");
recordTelemetryEvent($signUpStore, "$signUpStore");
recordTelemetryEvent($organizationStore, "$organizationStore");
function useStore(store) {
  const get = store.get.bind(store);
  return React__default.useSyncExternalStore(store.listen, get, get);
}
var withClerk = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const clerk = useStore(
      computed([$csrState, $clerk], (state, clerk2) => {
        return state.isLoaded ? clerk2 : null;
      })
    );
    return /* @__PURE__ */ jsx(
      Component,
      {
        ...props,
        clerk
      },
      clerk ? "a" : "b"
    );
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
var assertSingleChild = (children) => (name) => {
  try {
    return React__default.Children.only(children);
  } catch (e) {
    return `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
  }
};
var normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) {
    children = defaultText;
  }
  if (typeof children === "string") {
    children = /* @__PURE__ */ jsx("button", { type: "button", children });
  }
  return children;
};
var safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") {
    return cb(...args);
  }
};
withClerk(({ clerk, children, ...props }) => {
  const { signUpFallbackRedirectUrl, forceRedirectUrl, fallbackRedirectUrl, signUpForceRedirectUrl, mode, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign in");
  const child = assertSingleChild(children)("SignInButton");
  const clickHandler = () => {
    const opts = {
      forceRedirectUrl,
      fallbackRedirectUrl,
      signUpFallbackRedirectUrl,
      signUpForceRedirectUrl
    };
    if (!clerk) {
      return;
    }
    if (mode === "modal") {
      return clerk.openSignIn(opts);
    }
    return clerk.redirectToSignIn({
      ...opts,
      signInFallbackRedirectUrl: fallbackRedirectUrl,
      signInForceRedirectUrl: forceRedirectUrl
    });
  };
  const wrappedChildClickHandler = async (e) => {
    if (child && typeof child === "object" && "props" in child) {
      await safeExecute(child.props.onClick)(e);
    }
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return React__default.cloneElement(child, childProps);
}, "SignInButton");
var SignOutButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { redirectUrl = "/", sessionId, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign out");
    const child = assertSingleChild(children)("SignOutButton");
    const clickHandler = () => clerk?.signOut({ redirectUrl, sessionId });
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React__default.cloneElement(child, childProps);
  },
  "SignOutButton"
);
withClerk(({ clerk, children, ...props }) => {
  const {
    fallbackRedirectUrl,
    forceRedirectUrl,
    signInFallbackRedirectUrl,
    signInForceRedirectUrl,
    mode,
    unsafeMetadata,
    ...rest
  } = props;
  children = normalizeWithDefaultValue(children, "Sign up");
  const child = assertSingleChild(children)("SignUpButton");
  const clickHandler = () => {
    const opts = {
      fallbackRedirectUrl,
      forceRedirectUrl,
      signInFallbackRedirectUrl,
      signInForceRedirectUrl,
      unsafeMetadata
    };
    if (!clerk) {
      return;
    }
    if (mode === "modal") {
      return clerk.openSignUp(opts);
    }
    return clerk.redirectToSignUp({
      ...opts,
      signUpFallbackRedirectUrl: fallbackRedirectUrl,
      signUpForceRedirectUrl: forceRedirectUrl
    });
  };
  const wrappedChildClickHandler = async (e) => {
    if (child && typeof child === "object" && "props" in child) {
      await safeExecute(child.props.onClick)(e);
    }
    return clickHandler();
  };
  const childProps = { ...rest, onClick: wrappedChildClickHandler };
  return React__default.cloneElement(child, childProps);
}, "SignUpButton");
var isMountProps = (props) => {
  return "mount" in props;
};
var isOpenProps = (props) => {
  return "open" in props;
};
var Portal = class extends React__default.PureComponent {
  portalRef = React__default.createRef();
  componentDidUpdate(prevProps) {
    if (!isMountProps(prevProps) || !isMountProps(this.props)) {
      return;
    }
    if (prevProps.props.appearance !== this.props.props.appearance || prevProps.props?.customPages?.length !== this.props.props?.customPages?.length) {
      this.props.updateProps?.({
        node: this.portalRef.current,
        props: this.props.props
      });
    }
  }
  componentDidMount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.mount?.(this.portalRef.current, this.props.props);
      }
      if (isOpenProps(this.props)) {
        this.props.open?.(this.props.props);
      }
    }
  }
  componentWillUnmount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.unmount?.(this.portalRef.current);
      }
      if (isOpenProps(this.props)) {
        this.props.close?.();
      }
    }
  }
  render() {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { ref: this.portalRef }) });
  }
};
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountSignIn,
      unmount: clerk?.unmountSignIn,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "SignIn");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountSignUp,
      unmount: clerk?.unmountSignUp,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "SignUp");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountUserButton,
      unmount: clerk?.unmountUserButton,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "UserButton");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountUserProfile,
      unmount: clerk?.unmountUserProfile,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "UserProfile");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationProfile,
      unmount: clerk?.unmountOrganizationProfile,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "OrganizationProfile");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationSwitcher,
      unmount: clerk?.unmountOrganizationSwitcher,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "OrganizationSwitcher");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationList,
      unmount: clerk?.unmountOrganizationList,
      updateProps: clerk?.__unstable__updateProps,
      props
    }
  );
}, "OrganizationList");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      open: clerk?.openGoogleOneTap,
      close: clerk?.closeGoogleOneTap,
      props
    }
  );
}, "GoogleOneTap");
var clerkLoaded = () => {
  return new Promise((resolve) => {
    $csrState.subscribe(({ isLoaded }) => {
      if (isLoaded) {
        resolve($clerk.get());
      }
    });
  });
};
var createGetToken = () => {
  return async (options) => {
    const clerk = await clerkLoaded();
    if (!clerk.session) {
      return null;
    }
    return clerk.session.getToken(options);
  };
};
var createSignOut = () => {
  return async (...args) => {
    const clerk = await clerkLoaded();
    return clerk.signOut(...args);
  };
};
var useAuth = () => {
  const { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions } = useStore2($authStore);
  const getToken = useCallback(createGetToken(), []);
  const signOut = useCallback(createSignOut(), []);
  const has = useCallback(
    (params) => {
      if (!params?.permission && !params?.role) {
        throw new Error(
          'Missing parameters. `has` from `useAuth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"`'
        );
      }
      if (!orgId || !userId || !orgRole || !orgPermissions) {
        return false;
      }
      if (params.permission) {
        return orgPermissions.includes(params.permission);
      }
      if (params.role) {
        return orgRole === params.role;
      }
      return false;
    },
    [orgId, orgRole, userId, orgPermissions]
  );
  if (sessionId === void 0 && userId === void 0) {
    return {
      isLoaded: false,
      isSignedIn: void 0,
      sessionId,
      userId,
      actor: void 0,
      orgId: void 0,
      orgRole: void 0,
      orgSlug: void 0,
      has: void 0,
      signOut,
      getToken
    };
  }
  if (sessionId === null && userId === null) {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId,
      userId,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !!orgId && !!orgRole) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId,
      orgRole,
      orgSlug: orgSlug || null,
      has,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!userId && !orgId) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor: actor || null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  throw new Error("Invalid state. Feel free to submit a bug or reach out to support");
};
function useStore2(store) {
  const get = store.get.bind(store);
  return useSyncExternalStore(store.listen, get, () => {
    if (typeof window === "undefined") {
      return authAsyncStorage.getStore();
    }
    return get();
  });
}
function SignedOut(props) {
  const { userId } = useAuth();
  if (userId) {
    return null;
  }
  return props.children;
}
function SignedIn(props) {
  const { userId } = useAuth();
  if (!userId) {
    return null;
  }
  return props.children;
}
computed($csrState, (state) => state.isLoaded);
withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    React__default.useEffect(() => {
      void clerk?.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
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
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function AvatarWithDropdown({
  nameUser = "Anonymous",
  emailUser = "No email provided",
  avatarUrl = ""
}) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(DropdownMenu, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-10 w-10 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl, alt: nameUser }),
      /* @__PURE__ */ jsx(AvatarFallback, { children: nameUser.split(" ").map((n) => n[0]).join("").toUpperCase() })
    ] }) }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-SatoshiMedium leading-none", children: nameUser }),
        /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-muted-foreground", children: emailUser })
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx("a", { href: "/user", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(User, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Profile" })
      ] }) }),
      /* @__PURE__ */ jsx("a", { href: "/dashboard", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-4 w-4 mr-2" }),
        /* @__PURE__ */ jsx("span", { children: "Dashboard" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Settings" })
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(SignOutButton, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Log Out" })
      ] }) })
    ] })
  ] });
}
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
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
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
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-2.5 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-1.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
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
const useDev = () => {
  const { toast: toast2 } = useToast();
  const handleNotWork = () => {
    toast2({
      title: "Maaf, Masih Tahap Development :)",
      variant: "destructive"
    });
  };
  return { handleNotWork };
};
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
      searchHistory: [],
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
      addSearchHistory: (term) => set((state) => ({
        searchHistory: [
          .../* @__PURE__ */ new Set([term, ...state.searchHistory])
        ].slice(0, 10)
        // Membatasi riwayat hingga 10 entri unik
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),
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
    suggestionsError,
    searchHistory,
    clearSearchHistory,
    addSearchHistory
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
    addSearchHistory(searchTerm.trim());
    setShowSuggestions(false);
    performSearch();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      window.location.href = `/search/${encodeURIComponent(
        searchTerm.trim()
      )}`;
      addSearchHistory(searchTerm.trim());
      setShowSuggestions(false);
      performSearch();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    addSearchHistory(suggestion);
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
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "sm:hidden font-SatoshiMedium",
          onClick: handleSearch,
          children: "Search"
        }
      )
    ] }),
    showSuggestions && /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded-b shadow-lg z-10 max-h-60 overflow-y-auto", children: suggestionsLoading ? /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("p", { children: "Loading .." }) }) : suggestionsError ? /* @__PURE__ */ jsx("div", { className: "p-4 text-red-500", children: suggestionsError }) : suggestions.length > 0 ? suggestions.map((suggestion, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "p-2 hover:bg-gray-100 cursor-pointer",
        onClick: () => handleSuggestionClick(suggestion),
        children: suggestion
      },
      index
    )) : /* @__PURE__ */ jsx("div", { className: "p-4 text-gray-500", children: "No suggestions found." }) }),
    searchHistory.length > 0 && /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-SatoshiMedium text-xl", children: "Riwayat Pencarian:" }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2 mt-3.5", children: searchHistory.map((term, index) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "cursor-pointer inline-flex items-center text-muted-foreground hover:underline",
          onClick: () => handleSuggestionClick(term),
          children: [
            /* @__PURE__ */ jsx(History, { className: "w-4 h-4 mr-2" }),
            /* @__PURE__ */ jsx("span", { children: term })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "left-5 right-5 fixed bottom-5", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: clearSearchHistory,
          className: "mt-2 w-full font-SatoshiMedium ",
          children: "Hapus Riwayat"
        }
      ) })
    ] })
  ] });
};
const listItem = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    id: 2,
    title: "Services",
    href: "#",
    icon: Briefcase
  },
  {
    id: 3,
    title: "Contact",
    href: "#",
    icon: Mail
  },
  {
    id: 4,
    title: "About",
    href: "#",
    icon: Info,
    nestedChildren: [
      {
        id: "4.1",
        title: "Our Story",
        href: "#"
      },
      {
        id: "4.3",
        title: "Team",
        href: "#"
      }
    ]
  },
  {
    id: 5,
    title: "Wishlist",
    href: "#",
    icon: Heart
  },
  {
    id: 6,
    title: "Beli Lagi",
    href: "#",
    icon: ShoppingCart
  },
  {
    id: 7,
    title: "Daftar Transaksi",
    href: "#",
    icon: ReceiptText
  },
  {
    id: 8,
    title: "Ulasan",
    href: "#",
    icon: Star
  },
  {
    id: 9,
    title: "Complain",
    href: "#",
    icon: Info,
    nestedChildren: [
      {
        id: "9.1",
        title: "Our Story",
        href: "#"
      },
      {
        id: "9.3",
        title: "Team",
        href: "#"
      }
    ]
  },
  {
    id: 10,
    title: "Scan Kode QR",
    href: "#",
    icon: ScanQrCode
  }
];
const navList = () => {
  const { handleNotWork } = useDev();
  return /* @__PURE__ */ jsx(Fragment, { children: [
    listItem.slice(0, 4),
    listItem.slice(4, 8),
    listItem.slice(8, 10)
  ].map((slicedItems, idx) => /* @__PURE__ */ jsx("div", { className: "border-t pt-5", children: slicedItems.map((item) => /* @__PURE__ */ jsx("div", { children: item.nestedChildren ? /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: /* @__PURE__ */ jsxs(
    AccordionItem,
    {
      className: "border-none",
      value: item.title,
      children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "nav_links items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
          item.title
        ] }) }),
        /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", { className: "pl-6 grid gap-2", children: item.nestedChildren.map((subItem) => /* @__PURE__ */ jsx(
          "a",
          {
            href: subItem.href,
            className: "nav_links",
            onClick: !subItem.href || subItem.href === "#" ? handleNotWork : void 0,
            children: subItem.title
          },
          subItem.id
        )) }) })
      ]
    }
  ) }) : /* @__PURE__ */ jsxs(
    "a",
    {
      href: item.href,
      className: "nav_links",
      onClick: !item.href || item.href === "#" ? handleNotWork : void 0,
      children: [
        /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
        item.title
      ]
    }
  ) }, item.id)) }, idx)) });
};
function Navbar({
  initialEmail,
  name,
  userImage
}) {
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
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "transition-colors hover:text-primary\n               font-SatoshiMedium",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "transition-colors hover:text-primary font-SatoshiMedium",
          children: "About"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "transition-colors hover:text-primary\n               font-SatoshiMedium",
          children: "Services"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "transition-colors hover:text-primary\n               font-SatoshiMedium",
          children: "Contact"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-x-2 flex justify-end items-center", children: [
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "sm:hidden border-none",
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
      /* @__PURE__ */ jsx("div", { className: "hidden sm:flex", children: /* @__PURE__ */ jsx(SearchForm, {}) }),
      /* @__PURE__ */ jsx("div", { className: "indicator", children: /* @__PURE__ */ jsx(
        Button,
        {
          className: "border-none",
          size: "icon",
          variant: "outline",
          asChild: true,
          children: /* @__PURE__ */ jsxs("a", { href: "/cart", children: [
            /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("div", { className: "indicator-item px-1.5 bg-black text-sm text-white rounded-full font-SatoshiMedium", children: cartCount })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex", children: [
        /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(
          AvatarWithDropdown,
          {
            nameUser: name,
            emailUser: initialEmail,
            avatarUrl: userImage
          }
        ) }),
        /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsx(Button, { children: "Get Started" }) })
      ] }),
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "md:hidden border-none",
            "aria-label": "Open navigation menu",
            children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
          }
        ) }),
        /* @__PURE__ */ jsxs(
          SheetContent,
          {
            side: "left",
            className: "w-[300px] flex flex-col  h-full sm:w-[350px] md:hidden",
            children: [
              /* @__PURE__ */ jsxs(SheetHeader, { children: [
                /* @__PURE__ */ jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "w-10 h-full invert dark:brightness-0",
                      src: "/assets/logo-baru.png",
                      alt: "Acme Inc logo",
                      width: 100,
                      height: 100
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-SatoshiMedium", children: "Acme Inc" })
                ] }),
                /* @__PURE__ */ jsx(SheetDescription, { className: "-ml-5", children: "Navigate through our site with ease" })
              ] }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "h-[calc(100vh-180px)] mt-6 pb-8 pr-4", children: /* @__PURE__ */ jsx("nav", { className: "grid gap-2", children: navList() }) }),
              /* @__PURE__ */ jsxs(
                SheetFooter,
                {
                  className: "sticky bottom-0 items-stretch gap-2\n                     sm:flex-row sm:gap-0 border-t pt-3.5",
                  children: [
                    /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(
                        AvatarWithDropdown,
                        {
                          nameUser: name,
                          emailUser: initialEmail,
                          avatarUrl: userImage
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: name || "John Dae" }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: initialEmail })
                      ] })
                    ] }) }) }),
                    /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "w-full flex justify-around\n                           items-center gap-4",
                        children: [
                          /* @__PURE__ */ jsx(Button, { className: "w-full", asChild: true, children: /* @__PURE__ */ jsx(
                            "a",
                            {
                              className: "font-SatoshiMedium",
                              href: "/signin",
                              children: "Login"
                            }
                          ) }),
                          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(
                            "a",
                            {
                              className: "font-SatoshiMedium",
                              href: "/register",
                              children: "Sign Up"
                            }
                          ) })
                        ]
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const $$Astro$2 = createAstro("http://localhost:4321/");
const $$MainHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MainHeader;
  const user = await Astro2.locals.currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const currentUserImage = user?.imageUrl;
  return renderTemplate`${renderComponent($$result, "Navbar", Navbar, { "initialEmail": email, "name": name, "userImage": currentUserImage, "client:load": true, "client:component-hydration": "load", "client:component-path": "/data/data/com.termux/files/home/astro-ecommerce/src/components/navbar/navbar.tsx", "client:component-export": "default" })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/components/main-components/MainHeader.astro", void 0);
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Mail", href: "#", icon: Mail },
  { name: "Notifications", href: "#", icon: Bell },
  { name: "Profile", href: "/user", icon: User }
];
function BottomNav() {
  const { handleNotWork } = useDev();
  return /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden", children: /* @__PURE__ */ jsx("ul", { className: "flex justify-around items-center h-14", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { className: "w-full", children: /* @__PURE__ */ jsxs(
    "a",
    {
      href: item.href,
      className: "flex flex-col items-center justify-center h-full\n                     text-muted-foreground",
      onClick: !item.href || item.href === "#" ? handleNotWork : void 0,
      children: [
        /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs", children: item.name })
      ]
    }
  ) }, item.name)) }) });
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
const $$Astro$1 = createAstro("http://localhost:4321/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const showBottomNav = ["/", "/user", "/signin", "/register"].includes(Astro2.url.pathname);
  return renderTemplate`<html class="scroll-smooth" lang="id"> <head><title>${title || SITE_TITLE}</title><meta charset="UTF-8"><meta name="description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta name="viewport" content="width=device-width"><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><link rel="icon" type="image/svg+xml" href="/assets/logo-baru.png"><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title || SITE_TITLE, "content")}><meta property="og:description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:image"${addAttribute(Astro2.site + "logo-baru.png", "content")}><meta property="og:locale" content="id"><meta property="twitter:card" content="summary"><meta property="twitter:url"${addAttribute(X_ACCOUNT, "content")}><meta property="twitter:title"${addAttribute(title || SITE_TITLE, "content")}><meta property="twitter:description"${addAttribute(description || SITE_DESCRIPTION, "content")}><meta property="twitter:image"${addAttribute(Astro2.site + "logo-baru.png", "content")}>${renderHead()}</head> <body> ${renderComponent($$result, "MainHeader", $$MainHeader, {})} <main> ${renderSlot($$result, $$slots["default"])} ${showBottomNav && renderTemplate`${renderComponent($$result, "BottomNav", BottomNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/navbar/bottom-nav.tsx", "client:component-export": "default" })}`} </main> ${renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/toaster", "client:component-export": "Toaster" })} </body></html>`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/layouts/Layout.astro", void 0);
const $$Astro = createAstro("http://localhost:4321/");
const $$Container = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Container;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["max-w-7xl w-full h-full px-5 py-5 lg:px-8 lg:py-8", className], "class:list")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/components/main-components/Container.astro", void 0);
export {
  $$Container as $,
  Button as B,
  useToast as a,
  $$Layout as b,
  useDev as c,
  cn as d,
  useSearchStore as e,
  BottomNav as f,
  useCartStore as u
};
