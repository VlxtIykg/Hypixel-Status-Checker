// TODO: DO FETCH.JS FIRSTTT
const db = require("./db/database.js");
const fetch = require("node-fetch");
require("dotenv").config();
let apiUses = 0;
let currentApiKey = 0;
const users = db.allUserDataRes();
const api = db.apikeysRes()
const uuid = [];
users.forEach(index => {
	uuid.push(index.mcuuid)
})

const uuidRes = () => {
	const fetchUuid = [];
	uuid.forEach(eachUuid => { //TODO: ADD api key checks
		fetchUuid.push(fetch(`https://api.hypixel.net/status?key=${api[currentApiKey]}&uuid=${eachUuid}`));
	})
	return fetchUuid;
}

const statusRes = async () => {
	const uuid = uuidRes();

	const [...allResponses] = await Promise.all(uuid);

	const myAsyncLoopFunction = async (array) => {
  	const promises = array.map(res => res.json());
		const finishedPromise = await Promise.all(promises);
  	console.log(`All async responses has been turned to json!`);
  	return finishedPromise;
	}

	return await myAsyncLoopFunction(allResponses);
};

const checkOnline = async () => {
	const statuses = await statusRes();
	const listOfOffline = [];
	const offline = statuses.find((item, index) => {
		if (item.success === false || !item.success) {
			listOfOffline.push(item);
		}
	})
	console.log(statuses);
}
checkOnline()
process.on('SIGINT', function() {
	DbStmt.close();
	console.log("Closing fetch file.");
	process.exit(0);
})