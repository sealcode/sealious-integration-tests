"use strict";
const rp = require("request-promise");
const assert = require("assert");
const uuid = require('node-uuid');

function uri(path){ 
	return "http://localhost:8080/api/v1/" + path; 
}

module.exports = function(){
	const siliusz = { 
		name: uuid.v4(),
		age: 34,
	};
	const patch = {
		name: uuid.v4(),
	};

	let id_of_element;

	function verifyElementOfCollection(response){
		assert.equal(response.collection_name, "people");
		assert.deepEqual(
			response.body.name,
			{
				original: siliusz.name,
				safe: siliusz.name,
			}
		);
	}

	return rp.post({
		json: true,
		uri: uri("collections/people"),
		formData: siliusz,
	}).then((data) => {
		id_of_element = data.id;
		return rp.patch({
			url: uri("collections/people/"+id_of_element),
			formData: siliusz,
			json: true,
		});
	}).then(verifyElementOfCollection);
};
