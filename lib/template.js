
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

	Template.toJSON = function(object) {
		return JSON.stringify(object);
	};

	Template.toXML = function(object, root) {
		var data = {};
		data[root || 'root'] = object;
		console.log(data);
		return (function loop(obj) {
			var output = '';
			_.each(obj, function(value, key) {
				output += '<'+key+'>'
				output += _.isObject(value) ? loop(value) : value;
				output += '</'+key+'>';
			});
			return output;
		})(data);
	};

	Template.renderObjectView = function(object, view, args) {

		if (view in object.views)
		{
			args = _.extend({}, args, {
				_view: view
				//,_self: object
			});
			return object.views[view].render(args);
		}
		else
		{
			switch (view)
			{
				case 'json':	return Template.toJSON(object.toJSON());
				case 'xml':		return Template.toXML(object.toJSON());
			}
		}

		throw 'Invalid template view: '+view;
	};

	return Template;

});