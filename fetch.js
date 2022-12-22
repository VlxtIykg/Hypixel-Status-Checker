const db = require("./db/database.js");
const fetch = require("node-fetch");
const loops = db.getLoop()
require("dotenv").config();
let apiUses = 0;
let key = 0;
const api = [
	process.env.apikey0,
	process.env.apikey1,
]
const uuid = [
]
loops.forEach(index => {
	uuid.push(index.mcuuid)
})

loops.forEach((counter, index) => {
	console.log(loops[index].interval);
	setInterval( async () => {
		let statusRes = await fetch(
			`https://api.hypixel.net/status?key=${api[key]}&uuid=${uuid[index]}`
			);
			apiUses++;
			let status = await statusRes.json();

			if(apiUses > 139 || (status.success === false && status.cause === "Key throttle")) {
				key++;
				// Guard clause 1
				if(key >= api.length) key = 0;
				apiUses = 0;
				console.log("Key throttled!!");
				statusRes = await fetch(
					`https://api.hypixel.net/status?key=${api[key]}&uuid=${uuid[index]}`
					);
				status = await statusRes.json();
				console.log({api, key});
				// TODO: Sends a message every interval, make minimal interval of bot to be max 1 request per minute 60000ms
			}
			console.table(status);
			console.log(`${api[key]}: ${apiUses}`);
			console.log(key);
			
	}, loops[index].interval);
})