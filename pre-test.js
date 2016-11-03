var Sealious = require("sealious");

module.exports = function(){

	var App = new Sealious.App();

	App.createCollection({
		name: "people",
		fields: [
			{name: "name", type: "text", required: true},
			{name: "age", type: "int"},
			{name: "photo", type: "file"},
			{name: "description", type: "text", params: {full_text_search: true}},
		]
	});

	App.createCollection({
		name: "empty",
		fields: [
			{name: "number", type: "int"}
		]
	})

	return App.start();
};
