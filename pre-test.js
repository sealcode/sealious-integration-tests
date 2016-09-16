module.exports = function(){

	var Sealious = require("sealious");

	Sealious.init();

	new Sealious.Collection({
		name: "people",
		fields: [
			{name: "name", type: "text", required: true},
			{name: "age", type: "int"},
			{name: "photo", type: "file"},
			{name: "description", type: "text", params: {full_text_search: true}},
		]
	});

	return Sealious.start();
}
