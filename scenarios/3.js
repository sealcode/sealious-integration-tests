// scenario #3
// TODO: Get non-existent collection
// - check status
// - check type of response

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8080/api/v1/" + path;

module.exports = function() {
	console.log('scenario #3')

	return rp.get({
		url: uri("collections/peopl"), //`peopl` instead of `people`
		json: true,
		resolveWithFullResponse: true
	}).then((res) => {
		if (res.statusCode === 404) return res
		else throw new Error('incorrect status code, received ' + res.statusCode)
	}).then((res) => {
		if (res.body.type === "bad_subject") return true
		else throw new Error('incorrect type of response')
	}).then(() => {
		console.log("succcess!");
	});
};
