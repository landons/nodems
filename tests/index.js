
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['fs', 'swig'], function(fs, swig) {

	return function(callback) {

		var args = {
			groups: {
				collections: {
					'/collection_list': 'User List',
					'/collection_calendar': 'Event Calendar'
				}
			}
		};

		var template = swig.compileFile(__dirname+'/templates/index.swig');

		return callback(template(args));
	};

});