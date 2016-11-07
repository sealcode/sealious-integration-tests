// scenario #2
// TODO: Delete non-existing element from collection

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var id = Math.random()
	return rp.delete({
		url: uri(`collections/people/${id}`),
		json: true,
		resolveWithFullResponse: true
	})
	.catch((res) => {
		if (res.statusCode !== 404) {
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			console.log("success!")
		}
	})
};
