// scenario #1
// TODO:
// 1. post new element to collection
// - send object as formData / JSON-encoded
// - check body with prepared body
// - check status
//
// 2. get chose element from collection
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8080/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		name: "Element",
		age: 20,
		photo: fs.createReadStream(__dirname + '/image.png'),
		description: "Sealious proposes an application architecture that enables creating applications in a highly declarative way."
	}

	var verify = function(response){
		assert.equal(response.collection_name, "people");
		assert.deepEqual(
			response.body.name,
			{
				original: prepared_body.name,
				safe: prepared_body.safe
			}
		);
		assert.equal(response.body.age, "20");
	}

	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true
	}).then((response) => {
		console.log(response)
	})
};
