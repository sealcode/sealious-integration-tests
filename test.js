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
	};

	function verify_sealiusz(response){
		assert.equal(response.type_name, "person");
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
			url: uri("resources/person"),
			formData: siliusz,
		}
	).then(function(response){
		response = JSON.parse(response);
		verify_sealiusz(response);
		var siliusz_id = response.id;
		return rp.get(uri("resources/person/" + siliusz_id))
	}).then(function(response){
		response = JSON.parse(response);
		verify_sealiusz(response);
	}).then(function(){
		console.log("succcess!");
	});
}
