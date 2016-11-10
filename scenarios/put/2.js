// scenario #2
// TODO: Update element of collection by PUT method with incorrect fields

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');
var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var initial_body = {name: "Title-1", age: 21}
	var updated_body = {name: "Title-2", incorrect_value: 23}

	return rp.post({
		url: uri('collections/people'),
		formData: initial_body,
		json: true,
		resolveWithFullResponse: true
	})
	.then((res) => {
		if (res.statusCode !== 201) {
			throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
		} else {
			var id = res.body.id;
			return rp.put({
				url: uri(`collections/people/${id}`),
				formData: updated_body,
				json: true,
				resolveWithFullResponse: true
			})
		}
	})
	.then((res) => {
		throw new Error(clc.red("Should have thrown a error which is related to incorrect status code"))
	})
	.catch((res) => {
		if (res.statusCode !== 403) throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
	})
	.then(() => console.log("succcess!"));
};
