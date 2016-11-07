// scenario #4
// TODO: Post new element without some fields (check non-existent fields)

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		name: "Some title"
	}
	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.body.age !== undefined) throw new Error(clc.red(`the body contains fields with 'undefined' value, which were not added`))
		else console.log("success!")
	})
};
