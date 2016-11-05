// scenario #5
// TODO: Post new element without fields to collection without requried values

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

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
			throw new Error('incorrect status code, received ' + res.statusCode)
		} else {
			if (Object.keys(res.body.body).length !== 0) {
				throw new Error('the body has unforeseen properties')
			} else {
				console.log("success!")
			}
		}
	})
};
