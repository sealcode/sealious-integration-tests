// scenario #1
// TODO: Get non-existent element from collection
// - check status
// - check type of response

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	console.log('scenario #1')

	return rp.get({
		url: uri("collections/people/" + "_"),
		json: true,
		resolveWithFullResponse: true
	})
	.then(function(){
		throw new Error("Should have thrown a 404 error!");
	}).catch(function(res){
		if(res.statusCode !== 404 || res.error.message.type !== "not_found"){
			throw new Error("should have thrown a 404 not_found error");
		}
	});
};
