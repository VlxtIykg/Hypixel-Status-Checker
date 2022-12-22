// TODO: DO FETCH.JS FIRSTTT
const db = require("./db/database.js");
const fetch = require("node-fetch");
require("dotenv").config();
let apiUses = 0;
let key = 0;
const users = db.allUserDataRes();
const api = db.allApikeysRes();
const uuid = [];
users.forEach(index => {
	uuid.push(index.mcuuid)
})

users.forEach((counter, index) => {
	console.log(users[index].interval);
	setInterval( async () => {
		// TODO: Make statusRes into its own function to be ran after key throttle
		let statusRes = await fetch(
			`https://api.hypixel.net/status?key=${api[key].key}&uuid=${uuid[index]}`
			);
			apiUses++;
			let status = await statusRes.json(); // TODO: Combine .json() to statusRes function

			if(apiUses > 139 || (status.success === false && status.cause === "Key throttle")) {
				// FIXME: Proper guard clause, proper key checking, proper throttles
				key++;
				// Guard clause 1
				if(key >= api.length) {key = 0;} // TODO: Add a check that checks if every key is throttled with its own inkling
				apiUses = 0;
				console.log("Key throttled!!");
				// FIXME: Better if else statements
				statusRes = await fetch(
					`https://api.hypixel.net/status?key=${api[key].key}&uuid=${uuid[index]}`
					);
				status = await statusRes.json();
				console.log({api, key});
				// TODO: Sends a message every interval, make minimal interval of bot to be max 1 request per minute 60000ms
			}
			console.table(status);
			console.log(`${api[key].key}: ${apiUses}`);
			console.log(key);
			
	}, users[index].interval);
})