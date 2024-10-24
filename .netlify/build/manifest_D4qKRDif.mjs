import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'devalue';
import 'html-escaper';
import 'clsx';
import { g as decodeKey } from './chunks/astro/server_B7VyQGdv.mjs';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

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

const manifest = deserializeManifest({"hrefRoot":"file:///data/data/com.termux/files/home/astro-ecommerce/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CqECp9uG.css"}],"routeData":{"route":"/cart","isIndex":true,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart/index.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CqECp9uG.css"}],"routeData":{"route":"/product/[id]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/product/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CqECp9uG.css"}],"routeData":{"route":"/search/[query]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"query","dynamic":true,"spread":false}]],"params":["query"],"component":"src/pages/search/[query].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CqECp9uG.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astroecommerce.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/data/data/com.termux/files/home/astro-ecommerce/src/pages/cart/index.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/product/[id].astro",{"propagation":"none","containsHead":true}],["/data/data/com.termux/files/home/astro-ecommerce/src/pages/search/[query].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/auth-astro/src/api/[...auth]@_@ts":"pages/api/auth/_---auth_.astro.mjs","\u0000@astro-page:src/pages/cart/index@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/product/[id]@_@astro":"pages/product/_id_.astro.mjs","\u0000@astro-page:src/pages/search/[query]@_@astro":"pages/search/_query_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D4qKRDif.mjs","/data/data/com.termux/files/home/astro-ecommerce/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","@/components/card-product.tsx":"_astro/card-product.BjPCnzt0.js","@/features/cart/Cart.tsx":"_astro/Cart.Bf09bol-.js","@/features/search/SearchResults.tsx":"_astro/SearchResults.BHGDAE8q.js","/data/data/com.termux/files/home/astro-ecommerce/src/features/product/ProductsLists.tsx":"_astro/ProductsLists.DbjDVSIb.js","@astrojs/react/client.js":"_astro/client.DtQD7m52.js","@/features/product/product.tsx":"_astro/product.XDfq5wg2.js","@/components/ui/toaster":"_astro/toaster.CQRJiulG.js","@/components/navbar/navbar.tsx":"_astro/navbar.BwauJb3v.js","@/features/product/ProductCarousel.tsx":"_astro/ProductCarousel.Blj7Ry0L.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/landing_page.0quDChz2.jpg","/_astro/Satoshi-Light.BqtVaFVY.otf","/_astro/Satoshi-Bold.C3YRi9Vg.otf","/_astro/Satoshi-Regular.B3SN4yqc.otf","/_astro/Satoshi-Medium.DoW3kFbX.otf","/_astro/Satoshi-Black.CBuN7gOj.otf","/_astro/index.CqECp9uG.css","/favicon.svg","/_astro/Cart.Bf09bol-.js","/_astro/CartStore.CVmB0Uv2.js","/_astro/ProductCarousel.Blj7Ry0L.js","/_astro/ProductCarousel.CRjoLIDR.js","/_astro/ProductsLists.DbjDVSIb.js","/_astro/SearchResults.BHGDAE8q.js","/_astro/SearchStore.eKeXsisk.js","/_astro/badge.dK3ePTlh.js","/_astro/button.BCSdiJws.js","/_astro/card-product.BjPCnzt0.js","/_astro/card.DuhqupP3.js","/_astro/client.DtQD7m52.js","/_astro/heart.BPm5I37r.js","/_astro/index.C5U760IW.js","/_astro/index.CBvUdhEQ.js","/_astro/index.DDEQXXIH.js","/_astro/index.DNi1g-pO.js","/_astro/index.Du1-Abm1.js","/_astro/middleware.CWImRAZ-.js","/_astro/navbar.BwauJb3v.js","/_astro/product.XDfq5wg2.js","/_astro/star.CCUq7dkJ.js","/_astro/toaster.CQRJiulG.js","/_astro/use-toast.EebMkKmu.js","/_astro/utils.Cc4KtQI8.js","/assets/logo-baru.png","/assets/icon/badge_os.png","/assets/icon/gopay.svg","/assets/icon/saldo_icon.svg","/assets/images/Furniture.png","/assets/images/books.png","/assets/images/handbag.png","/assets/images/sneakers.png","/assets/images/tech.png","/assets/images/travel.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"hahjlAkemwNfsmo1mjqTvRoMS+gO5sxIDx7PE4Mscn8=","experimentalEnvGetSecretEnabled":false});

export { manifest };
