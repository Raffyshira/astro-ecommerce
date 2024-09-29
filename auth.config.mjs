import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

export default defineConfig({
   providers: [
      GitHub({
         clientId: import.meta.env.GITHUB_CLIENT_ID,
         clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
      })
   ],
   cookies: {
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "none"
   }
});
