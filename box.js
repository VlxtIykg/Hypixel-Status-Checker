const Box = require("cli-box");

module.exports.createBox = function() {
console.log("\n\n-----Starting background processess-----\n");
//Update version per test -- corresponding to readme.md // .0.1 per command created // .1.1 per test done for said command // v2,v3 and so on for official updates.
const version = "v1.4.4";
const serverName = "Puzzle Bot";
const isOn = false;
const attemptingToRestart = true;
const ip = {
	address: function () {
		/* const arrayOfIps = ["127.0.0.1", "172.0.0.1", "172.18.0.1", "192.168.1.21", "192.168.1.69"]
		return arrayOfIps[Math.floor(Math.random()*arrayOfIps.length)]; */
		const arrayOfIps = [`127.0.0.${Math.floor(Math.random()*255)}`, `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`, `172.0.0.${Math.floor(Math.random()*255)}`]
		return arrayOfIps[Math.floor(Math.random()*arrayOfIps.length)];
	},
};
const myBox = new Box({	w: 50, h: 10, stringify: false, marks: {	nw: "╭",	n: "─",	ne: "╮",	e: "│",	se: "╯",	s: "─",	sw: "╰",	w: "│",}, },
	`Server @ ${version}
	▸ Name      :   ${serverName}
	▸ Online   :   ${isOn ? "Yes" : "No"}
	▸ Status  :   ${attemptingToRestart ? "Starting bot" : "Not restarting, exit-code-0"}
	▸ Device IP :   ${ip.address()}
	` 
	);
console.log(myBox.stringify() + "\n");
};