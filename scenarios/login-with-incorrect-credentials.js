"use strict";
var rp = require("request-promise");
//require('request-debug')(rp);
var fs = require("fs");
var assert = require("assert");

var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function(){
	const user = {username: "user", password: "password"};
	const incorrect_user = {username: "u", password: "p"};

	//register
	return rp.post({
		url: uri("users"),
		formData: user
	})
	.then(() => {
		return rp.post({
			url: uri("sessions"),
			formData: incorrect_user
		})
	})
	.catch((res) => {
		assert.equal(res.statusCode, 401);
		console.log("success!")
	})

};
