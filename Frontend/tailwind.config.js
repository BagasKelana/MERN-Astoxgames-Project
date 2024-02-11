/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
        extend: {
            colors: {
                "main-color": "rgb(3,3,3,3)",
                "second-color": "#101936",
                "thirty-color": "#205295",
                "fourty-color": "#2C74B3",
                "bg-color": "#040b15",
                "product-main": "#121212",
                "product-second": "#252525",
            },
            backgroundImage: {
                "images-alow": "url('images/genres-home/1267491.webp')",
                "footer-texture": "url('/img/footer-texture.png')",
            },

            animation: {
                showIn: "showIn 0.25s ease-in-out 1",
                showOut: "showOut 0.25s ease-in-out 1",
            },
            keyframes: {
                showIn: {
                    "0%": { transform: "translateX(-200%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                showOut: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-200%)" },
                },
            },
        },
    },
    plugins: [import("@tailwindcss/typography")],
}
