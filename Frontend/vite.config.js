import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            components: `${path.resolve(__dirname, "./src/components/")}`,
            public: `${path.resolve(__dirname, "./public/")}`,
            pages: path.resolve(__dirname, "./src/pages"),
            types: `${path.resolve(__dirname, "./src/@types")}`,
            layout: `${path.resolve(__dirname, "./src/layout")}`,
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },

    plugins: [react()],
})
