// scenario #6
// TODO: Post new element with fields which aren't declared in definition of collection

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		foo: 20,
		bar: "Sealious proposes an application architecture that enables creating applications in a highly declarative way."
	}
	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true,
		resolveWithFullResponse: true
	})
	.catch((response) => {
		assert.equal(response.statusCode, 403);
		console.log("success!")
	})
};
