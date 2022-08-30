 const {createServer : cs} = require("http");
const port = process.env.PORT || 3000;
const log = (...a) => console.log(...a);
const bp = require("./lib/body-parser");
const run = require("./lib/run");

cs(async (req,res) =>{
	var data = '{}';

	const {url, method} = req;
	const body = await bp(req);
	log({url, method, body});

	if (body.cmd) data = await run({cmd : body.cmd, opts : body.options || false});
	res.writeHead(200,{
		'Content-Type' : 'text/plain',
		'Content-Length': data.length
	})
	res.end(data);
})
.listen(port, ()=>console.log("Server started at %i", port))

/*
curl --header "Content-Type: application/json" 
  --request POST 
  --data '{"cmd" : "ls"}' 
  http://localhost:3000/sh
*/