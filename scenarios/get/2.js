// scenario #2
// TODO: Get non-existent collection
// - check status
// - check type of response

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	return rp.get({
		url: uri("collections/peopl"), //`peopl` instead of `people`
		json: true,
		resolveWithFullResponse: true
	})
	.then(() => {
		throw new Error(clc.red("Should have thrown a 404 error!"));
	})
	.catch((res) => {
		if (res.statusCode === 404){
			if (res.error.message.type === "bad_subject"){
				return true;
			} else {
				throw new Error(clc.red('incorrect status code, received ' + res.statusCode));
			}
		}
	})

	.then(() => console.log("succcess!"))
};
