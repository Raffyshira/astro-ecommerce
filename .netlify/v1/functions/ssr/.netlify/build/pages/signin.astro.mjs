import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from "../chunks/astro/server_BZopLqt2.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Container, b as $$Layout } from "../chunks/Container_CglYaq8S.mjs";
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_Dw0c8k8G.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro("http://localhost:4321/");
const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignIn;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "sign-in" })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/SignIn.astro", void 0);
const $$Signin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-16 flex justify-center items-center min-h-screen pb-16" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SignIn", $$SignIn, { "path": "/signin" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/signin.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/signin.astro";
const $$url = "/signin";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Signin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
