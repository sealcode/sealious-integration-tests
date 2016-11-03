// scenario #3
// TODO: Post new element without body
// - send empty object as formData / JSON-encoded
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	return rp.post({
		url: uri('collections/people'),
		formData: {},
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode === 400) return res
	})
	.catch((res) => {
		throw new Error('incorrect status code, received ' + res.statusCode)
	})

	.then((res) => {
		if (res.body.error === "Bad Request") return true
	})
	.catch((res) => {
		throw new Error('incorrect type of response, received ' + res.body.error)
	})
	.then(() => {
		console.log("succcess!");
	});
};
