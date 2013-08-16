
var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname+'/lib',
    nodeRequire: require
});

var errorNotFound = function(res) {
	res.writeHead(404, { 'Content-Type': 'text/html' });
	res.end('<h1>404 Not Found</h1>');
};

var errorServer = function(res, er) {
	res.writeHead(500, { 'Content-Type': 'text/html' });
	res.end('<h1>500 Internal Server Error:</h1><p>'+er+'</p>');
};

var test = function(command, callback) {
	return require('./tests/'+command+'.js')(callback);
};

//console.log(process.argv);

if (process.argv.length > 2 && process.argv[2] !== 'server')
{
	console.log('Running command inline...', process.argv);
	test(process.argv[2], console.log);
}
else
{
	console.log('Starting HTTP server on port 8000');
	require('http').createServer(function(req, res) {
		
		var url = req.url.replace(/\/+/, '/');
		if (url.substr(-1) === '/')
		{
			url += 'index';
		}
		console.log(url);
		
		switch (url)
		{
			case '/favicon.ico':
				return errorNotFound(res);	
		}
		
		try {

			test(url.substr(1), function(output) {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(output);
			});
			
		} catch (er) {
			
			return errorServer(res, er);
			
		}
		
	}).listen(8000);
	console.log('PID: ', process.pid);
}