import "@astrojs/internal-helpers/path";
import "cookie";
import "kleur/colors";
import "./chunks/shared_BTASe_bZ.mjs";
import "es-module-lexer";
import "html-escaper";
import "clsx";
import { i as decodeKey } from "./chunks/astro/server_BZopLqt2.mjs";
const NOOP_MIDDLEWARE_FN = (_, next) => next();
function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}
const manifest = deserializeManifest({"hrefRoot":"file:///data/data/com.termux/files/home/astro-ecommerce/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[],"routeData":{"route":"/api/create-checkout-session","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-checkout-session\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-checkout-session","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-checkout-session.ts","pathname":"/api/create-checkout-session","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/cart","isIndex":true,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart/index.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/product/[id]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/product/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.zqOmTj59.js"},{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/search/[query]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"query","dynamic":true,"spread":false}]],"params":["query"],"component":"src/pages/search/[query].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.zqOmTj59.js"},{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/success","isIndex":false,"type":"page","pattern":"^\\/success\\/?$","segments":[[{"content":"success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/success.astro","pathname":"/success","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.zqOmTj59.js"},{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"}],"routeData":{"route":"/user","isIndex":true,"type":"page","pattern":"^\\/user\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user/index.astro","pathname":"/user","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.CDPFRxsq.js"}],"styles":[{"type":"external","src":"/_astro/index.0H7YArdd.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0;mix-blend-mode:plus-lighter}to{opacity:1;mix-blend-mode:plus-lighter}}@keyframes astroFadeOut{0%{opacity:1;mix-blend-mode:plus-lighter}to{opacity:0;mix-blend-mode:plus-lighter}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"http://localhost:4321/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/product/[id].astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/register.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/search/[query].astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/signin.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/success.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/user/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/create-checkout-session@_@ts":"pages/api/create-checkout-session.astro.mjs","\u0000@astro-page:src/pages/cart/index@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/product/[id]@_@astro":"pages/product/_id_.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/search/[query]@_@astro":"pages/search/_query_.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/success@_@astro":"pages/success.astro.mjs","\u0000@astro-page:src/pages/user/index@_@astro":"pages/user.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CpiOhhAO.mjs","/data/data/com.termux/files/home/astro-ecommerce/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BeL9aKBN.mjs","astro:scripts/before-hydration.js":"_astro/astro_scripts/before-hydration.js.Bh3thIyk.js","@/features/cart/checkout-success.tsx":"_astro/checkout-success.C-KQ42gL.js","@/components/card-product.tsx":"_astro/card-product.BV2kHGk-.js","astro:scripts/page.js":"_astro/page.CDPFRxsq.js","@/components/navbar/bottom-nav.tsx":"_astro/bottom-nav.CadPTLe2.js","@/features/cart/Cart.tsx":"_astro/Cart.CNXyct8x.js","@/features/search/SearchResults.tsx":"_astro/SearchResults.CZUPpkCK.js","@astrojs/react/client.js":"_astro/client.DtQD7m52.js","@/features/product/product.tsx":"_astro/product.DWXmHPlY.js","/astro/hoisted.js?q=0":"_astro/hoisted.zqOmTj59.js","@/components/ui/toaster":"_astro/toaster.X0Xak71h.js","/data/data/com.termux/files/home/astro-ecommerce/src/components/navbar/navbar.tsx":"_astro/navbar.V-fuuXoh.js","@/features/product/ProductsLists.tsx":"_astro/ProductsLists.D8LR0bms.js","@/features/product/ProductCarousel.tsx":"_astro/ProductCarousel.DDqyjKqv.js"},"inlinedScripts":[],"assets":["/_astro/landing_page.0quDChz2.jpg","/_astro/Satoshi-Medium.DoW3kFbX.otf","/_astro/Satoshi-Regular.B3SN4yqc.otf","/_astro/Satoshi-Light.BqtVaFVY.otf","/_astro/Satoshi-Bold.C3YRi9Vg.otf","/_astro/Satoshi-Black.CBuN7gOj.otf","/_astro/index.0H7YArdd.css","/favicon.svg","/_astro/Cart.CNXyct8x.js","/_astro/CartStore.CVmB0Uv2.js","/_astro/ProductCarousel.Cad-PgSN.js","/_astro/ProductCarousel.DDqyjKqv.js","/_astro/ProductsLists.D8LR0bms.js","/_astro/SearchResults.CZUPpkCK.js","/_astro/SearchStore.BsrdfHg3.js","/_astro/badge.Diyp-Vkn.js","/_astro/bottom-nav.CadPTLe2.js","/_astro/button.siB7vGsI.js","/_astro/card-product.BV2kHGk-.js","/_astro/card.B8pCkRAG.js","/_astro/checkout-success.C-KQ42gL.js","/_astro/chevron-right.DAYp_1rn.js","/_astro/chunk-THYSZO52.BuqMdnFy.js","/_astro/client.DtQD7m52.js","/_astro/createLucideIcon.D485ml99.js","/_astro/heart.CgOMNzXX.js","/_astro/hoisted.zqOmTj59.js","/_astro/index.C7xA2uP4.js","/_astro/index.ChDhN02O.js","/_astro/index.CubtqWz4.js","/_astro/index.CxOCE76-.js","/_astro/index.CxxnkPB9.js","/_astro/index.DDEQXXIH.js","/_astro/index.DNi1g-pO.js","/_astro/index.DdQTQCRk.js","/_astro/jsx-runtime.B6N9iRLn.js","/_astro/loader-circle.C_2doP3Y.js","/_astro/middleware.CWImRAZ-.js","/_astro/navbar.V-fuuXoh.js","/_astro/page.CDPFRxsq.js","/_astro/product.DWXmHPlY.js","/_astro/star.SO-t_xKH.js","/_astro/toaster.X0Xak71h.js","/_astro/use-toast.EebMkKmu.js","/_astro/user.DtapF476.js","/_astro/utils.CmAReE4r.js","/assets/logo-baru.png","/_astro/astro_scripts/before-hydration.js.Bh3thIyk.js","/assets/icon/badge_os.png","/assets/icon/gopay.svg","/assets/icon/saldo_icon.svg","/assets/images/Furniture.png","/assets/images/books.png","/assets/images/handbag.png","/assets/images/sneakers.png","/assets/images/tech.png","/assets/images/travel.png","/_astro/page.CDPFRxsq.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"OoSd+8eX7hs5lImtO0HHS1QGw2fZV3jgmS1iIVS9Fe8=","experimentalEnvGetSecretEnabled":false});
export {
  manifest
};
