var pre = require("./pre-test.js");
var post = require("./methods/post.js");


pre()
.then(post)
.then(()=> process.exit())
.catch((err) => {console.error(err); process.exit(1)});
