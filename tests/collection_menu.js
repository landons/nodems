
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['../lib/model/view', '../lib/model/node', '../lib/collection'], function(View, Node, Collection) {

	return function(callback) {

		var Page = Node.extend({
			type: 'page',
			fields: {
				title: { type: 'text' },
				content: { type: 'text' },
				url: { type: 'uri' }
			},
			views: {
				menu: new View({
					format: 'html',
					template: __dirname+'/templates/content_page_menu.swig'
				})
			}
		});

		var Menu = Collection.extend({
			type: 'tree',
			filters: [],
			comparators: [],
			views: {
				html: new View({
					format: 'html',
					template: __dirname+'/templates/collection_menu.swig'
				})
			}
		});

		var nav = new Menu([

			new Menu([

			], { title: 'About', uri: '/about' }),


			new Menu([

			], { title: 'Products', uri: '/products' }),


		], { title: 'Home', uri: '/' });

		return callback(nav.render('html'));
	};

});