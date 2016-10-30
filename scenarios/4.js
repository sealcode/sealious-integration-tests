// scenario #4
// TODO: Get all elements of empty collection
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8080/api/v1/" + path;

module.exports = function() {
	console.log('scenario #4')

	return rp.get({
		url: uri("collections/empty"),
		json: true,
		resolveWithFullResponse: true
	}).then((res) => {
		console.log(res.statusCode)
		if (res.statusCode === 200) return res
		else throw new Error('incorrect status code, received ' + res.statusCode)
	}).then((res) => {
		// if (res.body === "bad_subject") return true
		// else throw new Error('incorrect type of response')
		console.log(res)
	}).then(() => {
		console.log("succcess!");
	});
};
