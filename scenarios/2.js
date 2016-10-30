// scenario #2
// TODO: Get non-existent element from collection
// - check status
// - check type of response

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8080/api/v1/" + path;

module.exports = function() {
	console.log('scenario #2')

	var prepared_body = {
		name: "Element",
		age: 20,
		description: "Sealious proposes an application architecture that enables creating applications in a highly declarative way."
	}
	return rp.get({
		url: uri("collections/people/" + "_"),
		json: true,
		resolveWithFullResponse: true
	}).then((res) => {
		if (res.stausCode === 404) return res
		else throw new Error('incorrect status code, received ' + res.statusCode)
	}).then((res) => {
		if (res.body.type === "not_found") return true
		else throw new Error('incorrect type of response')
	}).then(() => {
		console.log("succcess!");
	});
};