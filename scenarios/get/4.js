// scenario #4
// TODO: Get all elements in accordance with query param

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var prepared_body = {
		name: "Some title",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	}
	return rp.post({
		url: uri('collections/people'),
		formData: prepared_body,
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode !== 201) {
			throw new Error('incorrect status code, received ' + res.statusCode)
		} else {
			return rp.get({
				url: uri("collections/people?search=Lorem"),
				json: true,
				resolveWithFullResponse: true
			})
		}
	})
	.then((res) => {
		if (res.body.length !== 0) {
			if (res.body[0].description.original.search('Lorem') !== -1) {
				console.log("success!")
			} else {
				throw new Error(`the searched element don't fit to search keyword`)
			}
		} else {
			throw new Error(`the body in response on search keyword 'Lorem' doesn't have search results`)
		}
	})
};
