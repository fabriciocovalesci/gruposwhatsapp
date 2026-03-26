// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import playformInline from "@playform/inline";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://gruposwhatsapp.online",
	base: "/",
	integrations: [mdx(), playformInline({ Critters: true })],
	output: "server",
	devToolbar: {
		enabled: false,
	},
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},
});