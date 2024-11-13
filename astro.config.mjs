import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import clerk from "@clerk/astro";

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
      })
   ],
   output: "server",
   adapter: netlify(),
   image: {
      service: passthroughImageService()
   },
   devToolbar: {
      enabled: false
   },
   vite: {
      ssr: {
         noExternal: ["@stripe/stripe-js"]
      }
   }
});
