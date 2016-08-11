var pre = require("./pre-test.js");
var test = require("./test.js");


pre()
.then(test)
.then(()=> process.exit())
.catch((err) => {console.error(err); process.exit(1)});
