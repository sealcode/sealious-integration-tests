"use strict";
const rp = require("request-promise");
const assert = require("assert");
// let uuid = require('node-uuid');

function uri(path){
	return "http://localhost:8081/api/v1/" + path;
}

module.exports = function(){

	// let siliusz = { name: uuid.v4() }
	let siliusz = {name: 'test'};
	
	console.log('siliusz', siliusz);


	return rp({
			method: "GET",
			uri: uri("collections/people"),
			json: true
		}).then((data) => {
			return data[0].id;
		}).then((id) => {
			return rp({
				method: "PATCH",
				uri: uri("collections/people/"+id),
				json: true,
				body: siliusz
			});

		}).then((data) => {
			console.log('succcess!');
		});
}
