// scenario #3
// TODO: Post new element without body (formData)
// - send empty object as formData
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	return rp.post({
		url: uri('collections/people'),
		formData: {},
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode !== 400){
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			if (res.body.error !== "Bad Request") throw new Error(clc.red('incorrect type of response, received ' + res.body.error))
			else console.log("succcess!");
		}
	})
};
