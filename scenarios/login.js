"use strict";
var rp = require("request-promise");
//require('request-debug')(rp);
var fs = require("fs");
var assert = require("assert");

function uri(path){
	return "http://localhost:8081/api/v1/" + path;
}

module.exports = function(){
	const jar = rp.jar();
	const request = rp.defaults({jar: jar});

	const user = {username: "user", password: "password"};

	return request.post(
		{
			url: uri("collections/restricted"),
		}
	)
	.catch((response) => {
		assert.equal(response.statusCode, 401);
	})
	.then(function(){
		//register
		return request.post({
			url: uri("users"),
			formData: user,
		});
	})
	.then(function(){
		return request.post({
			url: uri("sessions"),
			formData: user,
		});
	})
	.then(function(){
		return request.get({
			url: uri("users/me"),
		});
	})
	.then(function(){
		return request.post({
			url: uri("collections/restricted"),
		});
	});
};
