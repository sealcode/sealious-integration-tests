var pre = require("./pre-test.js");
var add_resource = require("./methods/add.js");
var patch_resource = require("./methods/patch.js");

pre()
.then(patch_resource)
.then(()=> process.exit())
.catch((err) => {console.error(err); process.exit(1)});
