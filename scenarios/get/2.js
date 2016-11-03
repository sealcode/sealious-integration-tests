// scenario #2
// TODO: Get non-existent collection
// - check status
// - check type of response

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	console.log('scenario #2')

	return rp.get({
		url: uri("collections/peopl"), //`peopl` instead of `people`
		json: true,
		resolveWithFullResponse: true
	})
	.then(function(){
		throw new Error("Should have thrown a 404 error!");
	})
	.catch((res) => {
		if (res.statusCode === 404){
			if (res.error.message.type === "bad_subject"){
				return true;
			}else {
				throw new Error('incorrect status code, received ' + res.statusCode);
			}
		}
	});
};
