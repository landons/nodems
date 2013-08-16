
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', 'backbone', './template'], function(_, Backbone, Template) {

	return Backbone.Model.extend({

		get: function() {
			var value = Backbone.Model.prototype.get.apply(this, arguments);
			//console.log(this.fields);
			return value;
		}
	});

});