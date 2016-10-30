module.exports = function(){

	var Sealious = require("sealious");
	Sealious.ConfigManager.set_config("datastore_chip_name", "mongo");

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

	new Sealious.Collection({
		name: "empty",
		fields: [
			{name: "number", type: "int"}
		]
	});

	return Sealious.start();
}
