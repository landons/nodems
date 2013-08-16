
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['swig', '../lib/model/view', '../lib/model/node', '../lib/collection'], function(swig, View, Node, Collection) {

	return function(callback) {

		var User = Node.extend({
			type: 'user',
			fields: {
				first_name: { type: 'text' },
				last_name: { type: 'text' }
			},
			views: {
				teaser: new View({
					format: 'html',
					template: __dirname+'/templates/content_user_teaser.swig'
				})
			}
		});

		var UserList = Collection.extend({
			type: 'list',
			filters: [],
			comparators: [],
			views: {
				list: new View({
					format: 'html',
					template: __dirname+'/templates/collection_list.swig',
					bindings: {
						title: 'User Collection'
					}
				})
			}
		});

		var list = new UserList([
			new User({ first_name: 'Landon', last_name: 'Springer' }),
			new User({ first_name: 'John', last_name: 'Doe' })
		]);

		return callback(list.render('list'));
	};

});