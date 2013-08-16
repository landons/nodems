
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', 'backbone', './template'], function(_, Backbone, Template) {

	return Backbone.Collection.extend({
		constructor: function(models, props) {
			Backbone.Collection.prototype.constructor.apply(this, [models]);

			this.props = props || {};
		},

		type: 'collection',
		props: {},
		views: {},
		filters: {},
		comparators: {},
		paginator: null,

		render: function(view, args) {

			var output;

			args = _.extend({}, this.props, args || {}, {
				collection: this.models
			});

			console.log(this.models[0]);

			//console.log('render collection:', view, args);

			output = Template.renderObjectView(this, view, args);

			this.trigger('render', output);
			return output;
		}
	});

});