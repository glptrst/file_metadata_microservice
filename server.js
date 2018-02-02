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
	    res.statusCode = 200;
	    res.setHeader('Content-Type', 'application/json');
	    res.end(JSON.stringify({size: req.headers['content-length']}));
	    //The content lenght in the header is slightly larger than the actual file size.
	    //Why?
	} else {
	    res.statusCode = 404;
	    res.end(`Cannot ${req.method} ${req.url}`);
	}
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
