export const config = {
	baseURL: "https://commerceos.staging.devpayever.com/registration/",
	routes: {
		fashion: "fashion",
		santander: "santander",
	},
	browser: "chrome",

	get IMPLICIT_WAIT_TIME() {
		return 10;
	},

	get EXPLICIT_WAIT_TIME() {
		return 10;
	},

	get PAGE_LOAD_TIME() {
		return 30;
	}
};

export default config;
