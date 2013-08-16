
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', 'backbone', 'swig'], function(_, Backbone, swig) {

	swig.setDefaults({
		autoescape: false
	});

	var Template = Backbone.View.extend({
		el: ' ',
		setElement: function() {}
	});

	Template.compile = function() {
		return swig.compile.apply(this, arguments);
	};

	Template.compileFile = function() {
		return swig.compileFile.apply(this, arguments);
	};

	return Template;

});