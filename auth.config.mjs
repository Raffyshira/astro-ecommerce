import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        })
    ],
    cookies: {
    secure: 'production',  // Aktifkan secure cookie di production
    sameSite: 'none',  // Memungkinkan cookie lintas situs untuk OAuth
  },
});
