var Sealious = require("sealious");

new Sealious.Collection({
	name: "people",
	fields: [
		{name: "name", type: "text"},
		{name: "age", type: "int"},
		{name: "photo", type: "file"},
		{name: "description", type: "text", params: {full_text_search: true}},
	],
	access_strategy: {
		create: "admin",
		retrieve: "public",
		update: ["or", ["admin", "owner"]],
		delete: "noone",
	}
});

Sealious.start();
