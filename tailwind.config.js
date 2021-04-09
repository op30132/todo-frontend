module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			xs: "480px",
			sm: "768px",
			md: "976px",
			lg: "1280px",
			xl: "1440px",
		},
		colors: {
			transparent: "transparent",
			
			black: "black",
			white: "white",
			blue: {
				light: "#3644a8",
				DEFAULT: "#202d8b",
				dark: "#131e70",
			},
			yellow: {
				light: "#ffc654",
				DEFAULT: "#fbba38",
				dark: "#f0a91d",
			},
			gray: {
				darkest: "#1f2d3d",
				dark: "#3c4858",
				DEFAULT: "#c0ccda",
				light: "#e0e6ed",
				lightest: "#f9fafc",
			}
		},
		extend: {},
	},
	variants: {
		animation: ["responsive", "motion-safe", "motion-reduce", "hover"]
	},
	plugins: [],
};