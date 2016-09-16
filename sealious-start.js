var Sealious = require("sealious");
Sealious.ConfigManager.set_config("datastore_chip_name", "mongo");

Sealious.init();

new Sealious.Collection({
	name: "people",
	fields: [
		{name: "name", type: "text"},
		{name: "age", type: "int"},
		{name: "photo", type: "file"},
		{name: "description", type: "text", params: {full_text_search: true}},
	]
});

return Sealious.start();
