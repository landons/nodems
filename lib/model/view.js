
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['underscore', '../model', '../template'], function(_, Model, Template) {

	var defaults = {
		format: 'text/html',
		bindings: {},
		source: null,
		compiled: null
	};

	return Model.extend({

		constructor: function(attributes, options) {

			_.defaults(attributes, defaults);

			Model.apply(this, [attributes, options]);
		},

		compile: function() {

			if ( ! this.get('compiled'))
			{
				if (this.get('source'))
				{
					this.set('compiled', Template.compile(this.get('source')));
				}
				else if (this.get('template'))
				{
					this.set('compiled', Template.compileFile(this.get('template')));
				}
				else
				{
					this.set('compiled', function() {
						throw 'No source or template defined for view';
					})
				}
			}

			return this.get('compiled');
		},

		render: function(args) {
			args = _.extend({}, this.get('bindings'), args);
//			console.log(args);
			return this.compile()(args);
		}

	});

});