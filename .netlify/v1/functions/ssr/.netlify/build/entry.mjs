import { renderers } from "./renderers.mjs";
import { s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_DYQ_v7bF.mjs";
import { manifest } from "./manifest_CngEEPds.mjs";
import { onRequest } from "./_astro-internal_middleware.mjs";
import { createExports } from "@astrojs/netlify/ssr-function.js";
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/cart.astro.mjs");
const _page2 = () => import("./pages/dashboard.astro.mjs");
const _page3 = () => import("./pages/product/_id_.astro.mjs");
const _page4 = () => import("./pages/register.astro.mjs");
const _page5 = () => import("./pages/search/_query_.astro.mjs");
const _page6 = () => import("./pages/signin.astro.mjs");
const _page7 = () => import("./pages/user.astro.mjs");
const _page8 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/cart/index.astro", _page1],
  ["src/pages/dashboard.astro", _page2],
  ["src/pages/product/[id].astro", _page3],
  ["src/pages/register.astro", _page4],
  ["src/pages/search/[query].astro", _page5],
  ["src/pages/signin.astro", _page6],
  ["src/pages/user/index.astro", _page7],
  ["src/pages/index.astro", _page8]
]);
const serverIslandMap = /* @__PURE__ */ new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: onRequest
});
const _args = {
  "middlewareSecret": "a17d44fc-37ed-4f5e-a251-1564f1c34ed3"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
