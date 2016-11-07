// scenario #5
// TODO: Post new element without fields to collection without requried values
// - send empty object as json data

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	return rp.post({
		url: uri('collections/without_required_values'),
		data: {},
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode !== 201){
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			if (Object.keys(res.body.body).length !== 0) {
				throw new Error(clc.red('the body has unforeseen properties'))
			} else {
				console.log("success!")
			}
		}
	})
};
