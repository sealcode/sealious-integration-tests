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
		name: "without_required_values",
		fields: [{	name: "number", type: "float"	}]
	});

	App.createCollection({
		name: "empty",
		fields: [{	name: "number", type: "int"	}]
	});

	App.createCollection({
		name: "restricted",
		fields: [],
		access_strategy: {
			default: "logged_in"
		}
	});

	App.Logger.error = () => {}

	return App.start()
	.then(function(){
		const datastore = App.ChipManager.get_datastore_chip();
		return datastore.remove("users", {});
		//.then(() => datastore.remove("sessions", {}));
	}).then(function(){
		return App;
	});
};
