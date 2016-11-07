// scenario #1
// TODO: Post new element to collection
// - send object as formData / JSON-encoded
// - check status
// - check body with prepared body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		name: "Element",
		age: 20,
		description: "Sealious proposes an application architecture that enables creating applications in a highly declarative way."
	}

	var verify = function(res){
		assert.equal(res.collection_name, "people");
		assert.equal(res.body.age, 20);
		assert.deepEqual(res.body.name,{
			original: prepared_body.name,
			safe: prepared_body.name
		});
	}

	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		console.log(res.statusCode)
		if (res.statusCode !== 201){
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			verify(res.body)
		}
	})
	.then(() => {
		console.log("succcess!");
	});
};
