/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'blue_hover': "#2E52E0"
            },
            screens: {

                'sm': { 'max': '639px' },

                'md': {
                    'max ': '768px '
                },
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },

        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
    ],
}