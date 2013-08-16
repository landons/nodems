
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', '../model'], function(_, Model) {
	
	var defaults = {
		type: 'list',
		props: {},
		filters: {},
		comparators: {},
		paginator: null
	};

	return Model.extend({
		
		constructor: function(attributes, items, options) {
			
			_.defaults(attributes, defaults);
			
			this.items = items || [];
			
			Model.apply(this, [attributes, options]);
		},

		render: function(view, args) {

			var output;

			args = _.extend({}, this.props, args || {}, {
				collection: this
			});
			
			console.log(this.items[0].views.teaser);

			output = Model.prototype.render.apply(this, [view, args]);

			this.trigger('render', output);
			return output;
		}
	});

});