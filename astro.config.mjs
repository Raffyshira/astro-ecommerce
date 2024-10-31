import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import clerk from "@clerk/astro";

import tunnel from "astro-tunnel";

// https://astro.build/config
export default defineConfig({
   site: "http://localhost:4321/",
   integrations: [
      tailwind({ applyBaseStyles: false }),
      react(),
      clerk({
         appearance: {
            layout: {
               socialButtonsPlacement: "bottom",
               termsPageUrl: "https://clerk.com/terms"
            }
         }
      }),
      tunnel({
         url: "http://localhost:4321",
         port: 4321,
         host: "localhost",
         protocol: "http",
         verifyTLS: false,
         acceptCloudflareNotice: false
      })
   ],
   output: "server",
   adapter: netlify(),
   image: {
      service: passthroughImageService()
   },
   devToolbar: {
    enabled: true
  }
});
