
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['../lib/model/view', '../lib/model/node', '../lib/model/collection'], function(View, Node, Collection) {

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
		
		var users = new Collection({
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
		}, [
			new User({ first_name: 'Landon', last_name: 'Springer' }),
			new User({ first_name: 'John', last_name: 'Doe' })
		]);

		return callback(users.render('list'));
	};

});