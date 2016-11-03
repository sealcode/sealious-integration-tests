// scenario #2
// TODO: Post new element without required fields to collection
// - send object as formData / JSON-encoded
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		age: 20,
		description: "Sealious proposes an application architecture that enables creating applications in a highly declarative way."
	}

	prepared_body = {}
	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode !== 400){
			throw new Error('incorrect status code, received ' + res.statusCode)
		} else {
			console.log("succcess!");
		}
	})
};
