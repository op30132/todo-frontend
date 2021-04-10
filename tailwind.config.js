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
			red: "#FF5555",
			cyan: "#5AE1C3",
			purple: {
				bg: "#f4f2ff",
				light: "#643FDB",
				DEFAULT: "#351ec4",
				dark: "#2610b2"
			},
			orange: {
				DEFAULT: "#FF8A00",
			},
			gray: {
				darkest: "#1f2d3d",
				dark: "#3c4858",
				DEFAULT: "#c0ccda",
				light: "#e0e6ed",
				lightest: "#f9fafc",
			},
			beige: {
				light: "#F7F7FA",
				DEFAULT: "#F1F1F5",
				dark: "#B2AEC2"
			}
		},
		minWidth: {
			"0": "0",
			"1/5": "20%",
			"1/4": "25%",
			"1/2": "50%",
			"3/4": "75%",
			"full": "100%",
			"min-w-min": "min-content",
			"min-w-max": "max-content"
		},
		extend: {
		},
	},
	variants: {
		animation: ["responsive", "motion-safe", "motion-reduce", "hover"]
	},
	plugins: [],
};