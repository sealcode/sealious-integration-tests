module.exports = function(){

	var Sealious = require("sealious");
	Sealious.init();
	
	new Sealious.Collection({
		name: "person",
		fields: [
			{name: "name", type: "text"},
			{name: "age", type: "int"},
			{name: "photo", type: "file"},
		]
	});

	return Sealious.start();
}
