var pre = require("./pre-test.js");
var methods = {
	add: require("./methods/post.js"),
	patch: require("./methods/patch.js"),
	put: require("./methods/put.js"),
	delete: require("./methods/delete.js")
}

pre()
.then(methods[process.argv[2]])
.then(()=> process.exit())
.catch((err) => {console.error(err); process.exit(1)});
