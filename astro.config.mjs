import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
   site: "https://astroecommerce.netlify.app/",
   integrations: [tailwind({ applyBaseStyles: false }), react(), auth()],
   output: "server",
   adapter: netlify(),
   image: {
    service: passthroughImageService()
  }
});
