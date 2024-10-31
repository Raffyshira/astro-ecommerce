import "@astrojs/internal-helpers/path";
import "cookie";
import "kleur/colors";
import "es-module-lexer";
import "./chunks/shared_BKLiCMcX.mjs";
import "html-escaper";
import "clsx";
import { h as decodeKey } from "./chunks/astro/server_B4YGBfW-.mjs";
import { compile } from "path-to-regexp";
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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
    middleware(_, next) {
      return next();
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
const manifest = deserializeManifest({"hrefRoot":"file:///data/data/com.termux/files/home/astro-ecommerce/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/cart","isIndex":true,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart/index.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/product/[id]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/product/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BtDoo8TH.js"},{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/search/[query]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"query","dynamic":true,"spread":false}]],"params":["query"],"component":"src/pages/search/[query].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BtDoo8TH.js"},{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BtDoo8TH.js"},{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/user","isIndex":true,"type":"page","pattern":"^\\/user\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user/index.astro","pathname":"/user","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.C8lpTeX3.js"}],"styles":[{"type":"external","src":"/_astro/index.2vGKAKS8.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astroecommerce.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/product/[id].astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/register.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/search/[query].astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/signin.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/user/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/cart/index@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/product/[id]@_@astro":"pages/product/_id_.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/search/[query]@_@astro":"pages/search/_query_.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/user/index@_@astro":"pages/user.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_ivAxq-cD.mjs","/data/data/com.termux/files/home/astro-ecommerce/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BeL9aKBN.mjs","astro:scripts/before-hydration.js":"_astro/astro_scripts/before-hydration.js.BpOZMfss.js","@/components/card-product.tsx":"_astro/card-product.BV2kHGk-.js","astro:scripts/page.js":"_astro/page.C8lpTeX3.js","@/features/cart/Cart.tsx":"_astro/Cart.BDEjgJgD.js","@/components/navbar/bottom-nav.tsx":"_astro/bottom-nav.CFtJEAOG.js","@/features/search/SearchResults.tsx":"_astro/SearchResults.CZUPpkCK.js","@astrojs/react/client.js":"_astro/client.DtQD7m52.js","@/features/product/product.tsx":"_astro/product.ds86Mffn.js","@/components/ui/toaster":"_astro/toaster.DYq1G2fN.js","/astro/hoisted.js?q=0":"_astro/hoisted.BtDoo8TH.js","/data/data/com.termux/files/home/astro-ecommerce/src/components/navbar/navbar.tsx":"_astro/navbar.PFaR5wPn.js","@/features/product/ProductsLists.tsx":"_astro/ProductsLists.Df993Ttq.js","@/features/product/ProductCarousel.tsx":"_astro/ProductCarousel.D4QeawhX.js"},"inlinedScripts":[],"assets":["/_astro/landing_page.0quDChz2.jpg","/_astro/Satoshi-Regular.B3SN4yqc.otf","/_astro/Satoshi-Medium.DoW3kFbX.otf","/_astro/Satoshi-Bold.C3YRi9Vg.otf","/_astro/Satoshi-Light.BqtVaFVY.otf","/_astro/Satoshi-Black.CBuN7gOj.otf","/_astro/index.2vGKAKS8.css","/favicon.svg","/_astro/Cart.BDEjgJgD.js","/_astro/CartStore.Dr4X8aFh.js","/_astro/ProductCarousel.Cfnv8izJ.js","/_astro/ProductCarousel.D4QeawhX.js","/_astro/ProductsLists.Df993Ttq.js","/_astro/SearchResults.CZUPpkCK.js","/_astro/SearchStore.BsrdfHg3.js","/_astro/badge.Diyp-Vkn.js","/_astro/bottom-nav.CFtJEAOG.js","/_astro/button.uD3mtBSa.js","/_astro/card-product.BV2kHGk-.js","/_astro/card.B8pCkRAG.js","/_astro/chevron-right.DAYp_1rn.js","/_astro/chunk-THYSZO52.BuqMdnFy.js","/_astro/client.DtQD7m52.js","/_astro/createLucideIcon.D485ml99.js","/_astro/hoisted.BtDoo8TH.js","/_astro/index.BBlRx67t.js","/_astro/index.BKr_-bsv.js","/_astro/index.CK8ZoVg_.js","/_astro/index.CxOCE76-.js","/_astro/index.DDEQXXIH.js","/_astro/index.DNi1g-pO.js","/_astro/index.DePGzjko.js","/_astro/index.Dp7fV2yB.js","/_astro/jsx-runtime.B6N9iRLn.js","/_astro/middleware.CWImRAZ-.js","/_astro/navbar.PFaR5wPn.js","/_astro/page.C8lpTeX3.js","/_astro/product.ds86Mffn.js","/_astro/star.SO-t_xKH.js","/_astro/toaster.DYq1G2fN.js","/_astro/use-dev.DZZZMdA4.js","/_astro/use-toast.EebMkKmu.js","/_astro/user.DtapF476.js","/_astro/utils.CmAReE4r.js","/assets/logo-baru.png","/_astro/astro_scripts/before-hydration.js.BpOZMfss.js","/assets/icon/badge_os.png","/assets/icon/gopay.svg","/assets/icon/saldo_icon.svg","/assets/images/Furniture.png","/assets/images/books.png","/assets/images/handbag.png","/assets/images/sneakers.png","/assets/images/tech.png","/assets/images/travel.png","/_astro/page.C8lpTeX3.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PAb5Do55DDsUumYBrlBTMG+jtVVqguCazlkJLd7dHqM=","experimentalEnvGetSecretEnabled":false});
export {
  manifest
};
