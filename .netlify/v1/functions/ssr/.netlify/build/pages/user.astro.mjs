import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, e as renderSlot, f as defineScriptVars, m as maybeRenderHead } from "../chunks/astro/server_B4YGBfW-.mjs";
import "kleur/colors";
import "html-escaper";
import { $ as $$Container, b as $$Layout } from "../chunks/Container_DymqdPQ5.mjs";
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_BJ0MdcGB.mjs";
import "clsx";
import { renderers } from "../renderers.mjs";
const $$Astro$3 = createAstro("https://astroecommerce.netlify.app/");
const $$UserProfile = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserProfile;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "user-profile" })} ${renderSlot($$result, $$slots["default"])}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/UserProfile/UserProfile.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://astroecommerce.netlify.app/");
const $$CustomProfilePageRenderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CustomProfilePageRenderer;
  const { url, label, type, component, reorderItemsLabels = [] } = Astro2.props;
  let labelIcon = "";
  let content = "";
  if (Astro2.slots.has("label-icon")) {
    labelIcon = await Astro2.slots.render("label-icon");
  }
  if (Astro2.slots.has("default") && type === "page") {
    content = await Astro2.slots.render("default");
  }
  return renderTemplate(_a || (_a = __template(["<script>(function(){", "\n// Get the component map from window that we set in the `<InternalUIComponentRenderer />`.\nconst clerkComponentMap = window.__astro_clerk_component_props.get(component);\n\nconst componentElement = document.querySelector(`[data-clerk-id^=\"clerk-${component}\"]`);\n\nconst safeId = componentElement.getAttribute('data-clerk-id');\nconst currentOptions = clerkComponentMap.get(safeId);\n\nconst isReorderItem = reorderItemsLabels.includes(label);\n\nlet newCustomPage = { label }\n\nif (!isReorderItem) {\n  newCustomPage = {\n    ...newCustomPage,\n    url,\n    mountIcon: (el) => { el.innerHTML = labelIcon },\n    unmountIcon: () => { /* Implement cleanup if needed */ }\n  }\n\n  if (type === 'page') {\n    newCustomPage = {\n      ...newCustomPage,\n      mount: (el) => { el.innerHTML = content },\n      unmount: () => { /* Implement cleanup if needed */ }\n    }\n  }\n}\n\n// Custom <OrganizationProfile /> pages can be added inside\n// the <OrganizationSwitcher /> component.\nif (component === 'organization-switcher') {\n  clerkComponentMap.set(safeId, {\n    ...currentOptions,\n    organizationProfileProps: {\n      ...currentOptions.organizationProfileProps,\n      customPages: [\n        ...(currentOptions?.organizationProfileProps?.customPages ?? []),\n        newCustomPage\n      ]\n    }\n  })\n} else {\n  clerkComponentMap.set(safeId, {\n    ...currentOptions,\n    customPages: [\n      ...(currentOptions?.customPages ?? []),\n      newCustomPage,\n    ]\n  })\n}\n})();<\/script>"], ["<script>(function(){", "\n// Get the component map from window that we set in the \\`<InternalUIComponentRenderer />\\`.\nconst clerkComponentMap = window.__astro_clerk_component_props.get(component);\n\nconst componentElement = document.querySelector(\\`[data-clerk-id^=\"clerk-\\${component}\"]\\`);\n\nconst safeId = componentElement.getAttribute('data-clerk-id');\nconst currentOptions = clerkComponentMap.get(safeId);\n\nconst isReorderItem = reorderItemsLabels.includes(label);\n\nlet newCustomPage = { label }\n\nif (!isReorderItem) {\n  newCustomPage = {\n    ...newCustomPage,\n    url,\n    mountIcon: (el) => { el.innerHTML = labelIcon },\n    unmountIcon: () => { /* Implement cleanup if needed */ }\n  }\n\n  if (type === 'page') {\n    newCustomPage = {\n      ...newCustomPage,\n      mount: (el) => { el.innerHTML = content },\n      unmount: () => { /* Implement cleanup if needed */ }\n    }\n  }\n}\n\n// Custom <OrganizationProfile /> pages can be added inside\n// the <OrganizationSwitcher /> component.\nif (component === 'organization-switcher') {\n  clerkComponentMap.set(safeId, {\n    ...currentOptions,\n    organizationProfileProps: {\n      ...currentOptions.organizationProfileProps,\n      customPages: [\n        ...(currentOptions?.organizationProfileProps?.customPages ?? []),\n        newCustomPage\n      ]\n    }\n  })\n} else {\n  clerkComponentMap.set(safeId, {\n    ...currentOptions,\n    customPages: [\n      ...(currentOptions?.customPages ?? []),\n      newCustomPage,\n    ]\n  })\n}\n})();<\/script>"])), defineScriptVars({ url, label, content, labelIcon, type, component, reorderItemsLabels }));
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/CustomProfilePageRenderer.astro", void 0);
const $$Astro$1 = createAstro("https://astroecommerce.netlify.app/");
const $$UserProfileLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$UserProfileLink;
  const { url, label } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CustomProfilePageRenderer", $$CustomProfilePageRenderer, { "label": label, "url": url, "type": "link", "component": "user-profile" }, { "label-icon": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["label-icon"])}` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/UserProfile/UserProfileLink.astro", void 0);
const $$Astro = createAstro("https://astroecommerce.netlify.app/");
const $$UserProfilePage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserProfilePage;
  const reorderItemsLabels = ["account", "security"];
  const { url, label } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CustomProfilePageRenderer", $$CustomProfilePageRenderer, { "label": label, "url": url, "type": "page", "component": "user-profile", "reorderItemsLabels": reorderItemsLabels }, { "default": ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])} `, "label-icon": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["label-icon"])}` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/node_modules/@clerk/astro/components/interactive/UserProfile/UserProfilePage.astro", void 0);
const UserProfile = Object.assign($$UserProfile, {
  Page: $$UserProfilePage,
  Link: $$UserProfileLink
});
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "User Profile" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "class": "mt-14 max-w-full flex justify-center items-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "UserProfile", UserProfile, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "UserProfile.Page", UserProfile.Page, { "label": "Custom Page", "url": "custom-page" }, { "default": ($$result5) => renderTemplate`  ${maybeRenderHead()}<div> <h1>Custom Profile Page</h1> <p>This is the custom profile page</p> </div> `, "label-icon": ($$result5) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"> <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path> </svg>` })} ` })} ` })} ` })}`;
}, "/data/data/com.termux/files/home/astro-ecommerce/src/pages/user/index.astro", void 0);
const $$file = "/data/data/com.termux/files/home/astro-ecommerce/src/pages/user/index.astro";
const $$url = "/user";
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
