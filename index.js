"use strict";
const Promise = require("bluebird");
const pre = require("./pre-test.js");
var scenarios = require('auto-load')('scenarios');

pre()
.then(function(){
	return Promise.each(
		Object.keys(scenarios), (method) => {
			if(scenarios[method] instanceof Function){
				return scenarios[method]();
			}else{
				const promises = {};
				for (var key in scenarios[method]) {
					promises[key] = scenarios[method][key]().then(() => console.log('→ scenario done'));
				}
				return Promise.props(promises);
			}
		}
	);
}).then(()=> {
	console.log("\n\n\t✓ Success! Tests run complete. Exiting with status 0.\n\n");
	process.exit(0);
})
.catch((err) => {
	console.error(err); 
	console.log(err.stack);
	console.log("\n\n\t✗ Tests failed. Exiting with status 1. See the above output for details.\n\n");
	process.exit(1);
});
