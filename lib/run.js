const {exec} = require("child_process");

module.exports = ({cmd, opts}) => new Promise(res => {
	exec(cmd, opts, (...d) => {
		res(JSON.stringify(d));
	})
})