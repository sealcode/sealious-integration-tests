// scenario #5
// TODO: Get with formData from collection

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	return rp.get({
		url: uri("collections/people"),
		data: {name: "Some title2"},
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		throw new Error(clc.red("Should have thrown a error which is related to a useable body in GET request"))
	})
	.catch((res) => {
		assert.equal(response.statusCode, 400);
		console.log("succcess!")
	});
};
