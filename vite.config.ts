import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";
import path from "path";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "test-tree",
    plugins: [react(), ghPages()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
