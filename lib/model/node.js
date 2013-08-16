
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', '../model', '../template'], function(_, Model, Template) {

	return Model.extend({

		constructor: function() {
			Model.apply(this, arguments);
		},

		toXML: function() {
			return Model.prototype.toXML.call(this, this._type);
		},

		render: function(view, args) {

			var output,
				defaults = {};

			defaults[this.type] = this;
			args = _.extend({}, args || {}, defaults);

			output = Template.renderObjectView(this, view, args);

			this.trigger('render', output);
			return output;
		},

		date: function(key, format) {
			format = format || null;
			var moment = require('moment');
			return moment(this.get(key)).format(format);
		}

	});

});