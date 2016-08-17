var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

function uri(path){
	return "http://localhost:8080/api/v1/" + path;
}

module.exports = function(){

	var siliusz = {
		name: "Siliusz",
		age: 34,
		photo: fs.createReadStream(__dirname + '/image.png'),
		description: "An easy-going, handsome back-end framework",
	};

	function verify_sealiusz(response){
		assert.equal(response.collection_name, "people");
		assert.deepEqual(
			response.body.name, 
			{
				original: "Siliusz",
				safe: "Siliusz",
			}
		);
		assert.equal(response.body.age, "34");
	}

	return rp.post(
		{
			url: uri("collections/people"),
			formData: siliusz,
		}
	).then(function(response){
		response = JSON.parse(response);
		verify_sealiusz(response);
		var siliusz_id = response.id;
		return rp.get(uri("collections/people/" + siliusz_id));
	}).then(function(response){
		response = JSON.parse(response);
		verify_sealiusz(response);
		return rp.get(uri("collections/people?search=easy"));
	}).then(function(response){
		console.log("succcess!");
	});
}
