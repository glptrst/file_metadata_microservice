"use strict";
const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Add error listener
    req.on('error', (err) => {
	console.error(err);
	res.statusCode = 400;
	res.send('Error');
    });
    if (req.method === 'GET') {
	if (req.url === '/') {
	    res.statusCode = 200;
	    fs.readFile('./public/index.html', (err, fileContent) => {
		if (err) {
		    console.error(err);
		    res.statusCode = 404;
		    res.end('Error reading file');
		} else {
		    res.writeHead(200, { 'Content-Type': 'text/html' });
		    res.end(fileContent);
		}
	    });
	} else {
	    res.statusCode = 404;
	    res.end(`Cannot ${req.method} ${req.url}`);
	}
    } else if (req.method === 'POST') {
	if (req.url === '/get-file-size') {
	    //TODO
	} else {
	    res.statusCode = 404;
	    res.end(`Cannot ${req.method} ${req.url}`);
	}
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
