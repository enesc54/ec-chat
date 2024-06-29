/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                alertIn: "alertIn .8s both",
                alertOut: "alertOut .8s both"
            },
            keyframes: {
                alertIn: {
                    "0%": {
                        right: "-100px",
                        opacity: 0
                    },
                    "80%": {
                        right: "20px"
                    },
                    "100%": { right: "20px", opacity: 1 }
                },
                alertOut: {
                    "0%": { right: "20px", opacity: 1 },
                    "20%": {
                        right: "20px"
                    },

                    "80%": {
                        right: "-100px",
                        opacity: 0
                    },
                    "100%": {
                        right: "0px",
                        opacity: 0
                    }
                }
            }
        }
    },
    plugins: []
};
