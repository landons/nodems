
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', 'backbone', './template'], function(_, Backbone, Template) {
	
	var defaults = {
		views: {}
	};

	return Backbone.Model.extend({

		constructor: function(attributes, options) {
			
			_.defaults(attributes, defaults);
			
			Backbone.Model.apply(this, [attributes, options]);
		},
				
		toJSONString: function(object) {
			return JSON.stringify(object);
		},

		toXMLString: function(root) {
			var data = {};
			data[root || 'root'] = this;
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
		},

		render: function(view, args) {

			if (view in this.get('views'))
			{
				args = _.extend({}, args, {
					_view: view
					//,_self: object
				});
				
				return this.get('views')[view].render(args);
			}
			else
			{
				switch (view)
				{
					case 'json':	return this.toJSONString();
					case 'xml':		return this.toXMLString();
				}
			}

			throw 'Invalid template view: '+view;
		}
	});

});