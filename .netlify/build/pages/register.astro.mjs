import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from "../chunks/astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Container, b as $$Layout } from "../chunks/Container_DymqdPQ5.mjs";
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_BJ0MdcGB.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro("https://astroecommerce.netlify.app/");
const $$SignUp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignUp;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "sign-up" })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/SignUp.astro", void 0);
const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign Up" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-16 flex justify-center items-center min-h-screen pb-16" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SignUp", $$SignUp, { "path": "/register" })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/register.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/register.astro";
const $$url = "/register";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
