"use strict";
const Promise = require("bluebird");
var scenarios = require('auto-load')('scenarios')

require("./pre-test.js")()
.then(() => {
	// scenarios/[method]/[scenario (key)]
	// e.g. scenarios/post/1.js
	return Promise.each(
		Object.keys(scenarios), (method) => {
			for (var key in scenarios[method]) {
				return scenarios[method][key]().then(() => console.log('→ scenario done'))
			}
		}
	)
})
.then(() => {
	console.log("Tests run complete. Exiting with status 0.");
	process.exit(0);
})
