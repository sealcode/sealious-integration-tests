// scenario #1
// TODO: Delete posted element from collection

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

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
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			var id = res.body.id
			return rp.delete({
				url: uri(`collections/people/${id}`),
				json: true,
				resolveWithFullResponse: true
			})
		}
	})
	.then((res) => {
		if (res.body !== undefined) {
			if (res.statusCode !== 204) {
				throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
				// http://stackoverflow.com/a/2342589
			} else {
				console.log("success!")
			}
		} else {
			throw new Error(clc.red(`the response has body`))
		}
	})
};
