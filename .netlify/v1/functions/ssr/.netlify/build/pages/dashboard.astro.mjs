import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from "../chunks/astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Container, b as $$Layout } from "../chunks/Container_BKhQ0jDb.mjs";
import { renderers } from "../renderers.mjs";
const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dasboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-14" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Welcome</h1> <p>We are happy to see you here</p> <form> <button type="submit">Sign out</button> </form> <a href="/">Back</a> ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/dashboard.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/dashboard.astro";
const $$url = "/dashboard";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
