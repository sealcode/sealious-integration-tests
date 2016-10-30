"use strict";
const Promise = require("bluebird");
var scenarios = require('auto-load')('scenarios')

require("./pre-test.js")()
.then(() => {
	return Promise.each(
		Object.keys(scenarios), (key) => {
			return scenarios[key]().then(() => console.log("Done scenario"))
		}
	)
})
.then(() => {
	console.log("Tests run complete. Exiting with status 0.");
	process.exit(0);
})
