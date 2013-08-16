
var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname+'/lib',
    nodeRequire: require
});

var test = function(command, callback) {
	return require('./tests/'+command+'.js')(callback);
	try {
		return require('./tests/'+command+'.js')(callback);
	}
	catch (er)
	{
		console.log(er);
		callback('<h1>404 Not Found</h1>');
	}
};

if (process.argv[2])
{
	console.log('Running command inline');
	test(process.argv[2], console.log);
}
else
{
	console.log('Starting HTTP server on port 8000');
	require('http').createServer(function(req, res) {
		var url = req.url.replace(/\/+/, '/');
		if (url.substr(-1) == '/')
		{
			url += 'index';
		}
		console.log(url);

		test(url.substr(1), function(output) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(output);
		});
	}).listen(8000);
	console.log('PID: ', process.pid);
}