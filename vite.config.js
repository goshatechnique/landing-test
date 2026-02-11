import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	server: {
		open: true,
	},
	resolve: {
		alias: {
			"@": "/src",
			"@js": "/src/js",
			"@scss": "/src/scss",
			"@assets": "/src/assets",
		},
	},
});
