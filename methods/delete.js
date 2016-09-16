let rp = require("request-promise");
let assert = require("assert");
let uuid = require('node-uuid');

function uri(path){ return "http://localhost:8080/api/v1/" + path; }

module.exports = function(){
	let siliusz = { age: Math.floor(Math.random()*123123123123) }
	let id_of_element;

	function verifyElementOfCollection(response){
		assert.equal(response.collection_name, "people");
		assert.equal(response.body.age, siliusz.age);
	}

	// name is requried

	return rp({
		method: "GET",
		json: true,
		uri: uri("collections/people"),
	}).then((data) => {
		id_of_element = data[0].id;

		return rp({
			method: "DELETE",
			uri: uri("collections/people/"+id_of_element),
			json: true
		})
	}).then((response) => {
		return rp({
			method: "GET",
			uri: uri("collections/people/"+id_of_element),
			json: true
		})
	}).then((response) => {
		if (response.type !== undefined && response.type === "not_found") {
			return "success"
		} else {
			return "error"
		}
	}).then((response) => {
		console.log('status', response);
	})
}
