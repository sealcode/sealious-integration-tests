"use strict";
const Promise = require("bluebird");
var pre = require("./pre-test.js");

var methods = {
	add: require("./methods/add.js"),
	patch: require("./methods/patch.js"),
	put: require("./methods/put.js"),
	delete: require("./methods/delete.js"),
}

pre()
.then(function(){
	return Promise.each(
		Object.keys(methods), 
		(key)=>{
			console.log("Running scenario:", key);
			return methods[key]()
			.then(function(){
				console.log("\t...success!");
			});
		});
}).then(()=> {
	console.log("Tests run complete. Exiting with status 0.");
	process.exit(0);
})
.catch((err) => {
	console.error(err); 
	console.log(err.stack);
	process.exit(1);
});
