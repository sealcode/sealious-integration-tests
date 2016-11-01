"use strict";
let rp = require("request-promise");
let assert = require("assert");
let uuid = require('node-uuid');

function uri(path){ return "http://localhost:8081/api/v1/" + path; }

module.exports = function(){
	let siliusz = {
		name: "siliusz",
		age: Math.floor(Math.random()*123123123123),
	};
	let id_of_element;

	function verifyElementOfCollection(response){
		assert.equal(response.collection_name, "people");
		assert.equal(response.body.age, siliusz.age);
	}

	// name is requried

	return rp.post({
		json: true,
		uri: uri("collections/people"),
		formData: siliusz,
	}).then((data) => {
		id_of_element = data.id;

		return rp({
			method: "DELETE",
			uri: uri("collections/people/"+id_of_element),
			json: true
		});
	}).then((response) => {
		return rp({
			method: "GET",
			uri: uri("collections/people/"+id_of_element),
			json: true
		}).catch((response) => {
			assert.equal(response.error.message.type, "not_found");
		});
	});
};
