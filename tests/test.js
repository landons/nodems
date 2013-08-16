
if (typeof define !== 'function')
{
	var define = require('amdefine')(module);
}

define(['fs', 'swig'], function(fs, swig) {

	return function(callback) {

		var args = {
			foo: {
				bar: function(arg) {
					return arg || 'Var not defined';
				}
			}
		};

		var template = swig.compileFile(__dirname+'/templates/test.swig');

		return callback(template(args));
	};

});