// scenario #3
// TODO: Get all elements of empty collection
// - check status
// - check body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8080/api/v1/" + path;

module.exports = function() {
	console.log('scenario #3')

	return rp.get({
		url: uri("collections/empty"),
		json: true,
		resolveWithFullResponse: true
	}).then((res) => {
		if (res.statusCode === 200) return res
		else throw new Error('incorrect status code, received ' + res.statusCode)
	}).then((res) => {
		if (res.body.length === 0) return true
		else throw new Error('incorrect body')
	}).then(() => {
		console.log("succcess!");
	});
};
