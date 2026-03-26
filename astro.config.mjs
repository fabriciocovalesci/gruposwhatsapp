// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import playformInline from "@playform/inline";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://gruposwhatsapp.online",
    base: "/",
    integrations: [mdx(), playformInline({ Critters: true }), sitemap()],
    output: "server",
    devToolbar: {
        enabled: false,
    },
    adapter: vercel(),
    vite: {
        plugins: [tailwindcss()],
    },
});