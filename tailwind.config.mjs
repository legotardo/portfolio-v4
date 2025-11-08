const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			background: '#000000',
			win95: {
				appBackground: '#C0C0C0',
				windowsBackground: '#008080',
				textPrimary: '#000000',
				textSecondary: '#404040',
				buttonFace: '#C0C0C0',
				primary: '#1a0094',
				buttonText: '#000000',
				buttonBorder: '#808080',
			}
		  },
		  fontFamily: {
			sans: ['Nunito', 'sans-serif'],
		  },
		  dropShadow: {
			'navbar': '0 2px 2px rgba(0, 0, 0, 0.5)',
		  },
		  borderWidth: {
			'3': '3px',
		  },
		  borderColor: {
			'win95-appBorder': '#FFFFFF #424242 #424242 #FFFFFF',
			'win95-progressBorder': '#424242 #d5d5d5 #d5d5d5 #424242',
			'win95-buttonBorder': '#FFFFFF #424242 #424242 #FFFFFF',
			'win95-inputBorder': '#808080 #FFFFFF #FFFFFF #808080',
		  },
		  screens: {
			'xs': '400px',
		  }
		},
	},
	plugins: [
		plugin(function({ addVariant, e }) {
			addVariant('win95', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `html[data-theme="win95"] .${e(`win95${separator}${className}`)}`;
				});
			});
		}),
		plugin(function({ addUtilities }) {
			const newUtilities = {
				'.pixel-font': {
				fontFamily: '"Pixelify Sans", monospace, sans-serif !important',
				'-webkit-font-smoothing': 'none',
				'-moz-osx-font-smoothing': 'auto',
				'text-rendering': 'geometricPrecision !important',
				'text-shadow': 'none !important',
				'font-weight': 'normal !important',
				}
			}

			addUtilities(newUtilities)
		})
	],
}
