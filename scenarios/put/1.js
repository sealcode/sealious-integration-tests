// scenario #1
// TODO: Update element of collection by PUT method
// the updated element should has integrally new body

"use strict";
var rp = require("request-promise");
var fs = require("fs");
var assert = require("assert");
var clc = require('cli-color');
var uri = (path) => "http://localhost:8081/api/v1/" + path;

module.exports = function() {
	var initial_body = {name: "Title-1", age: 21}
	var updated_body = {name: "Title-2"}

	var verify = function(res){
		var a = assert.equal(res.body.age, undefined);
		assert.deepEqual(res.body.name,{
			original: updated_body.name,
			safe: updated_body.name
		});
	}

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
		if (res.body.created_context.timestamp !== res.body.last_modified_context.timestamp) {
			if (res.statusCode !== 200) throw new Error(clc.red('incorrect status code, received ' + res.statusCode))
			else verify(res.body)
		} else {
			throw new Error(clc.red(`the timestamps aren't different`))
		}
	})
	.then(() => console.log("succcess!"));
};
