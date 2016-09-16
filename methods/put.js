"use strict";
let rp = require("request-promise");
let assert = require("assert");
let uuid = require('node-uuid');

function uri(path){ return "http://localhost:8081/api/v1/" + path; }

module.exports = function(){
	let siliusz = { 
		name: "sealiousz", 
		age: Math.floor(Math.random()*123123123123) 
	};
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
			method: "PUT",
			url: uri("collections/people/"+id_of_element),
			json: true,
			formData: siliusz
		});
	}).then((response) => {
		verifyElementOfCollection(response);
	}).then(() => {
		console.log('succcess');
	});
};
