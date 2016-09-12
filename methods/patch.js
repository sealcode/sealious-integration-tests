let rp = require("request-promise");
let assert = require("assert");
// let uuid = require('node-uuid');

function uri(path){
	return "http://localhost:8080/api/v1/" + path;
}

module.exports = function(){

	// let siliusz = { name: uuid.v4() }
	let siliusz = {name: 'test'}
	
	console.log('siliusz', siliusz);


	return rp({
			method: "GET",
			uri: uri("resources/person"),
			json: true
		}).then((data) => {
			return data[0].id

		}).then((id) => {
			return rp({
				method: "PATCH",
				uri: uri("resources/person/"+id),
				json: true,
				body: siliusz
			})

		}).then((data) => {
			console.log('succcess!');
		})
}
