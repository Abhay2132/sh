// const qs = require("querystring");

module.exports = req => new Promise( resolve => {
	if (req.method != "POST") return resolve(new Error("Not a POST request !"));
	var body = '';
	req.on("data", data => {
		body += data;
		console.log(data.toString());
		if (data.length > 1e6) req.connection.destroy()
	})

	req.on("end", () => {
		var data = JSON.parse(body);
		resolve(data);
	})
})