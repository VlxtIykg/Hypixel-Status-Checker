const db = require("./database.js").db;
console.log(db);
const query = require("./queriesRes.js");
module.exports.schema = () => {
	console.log(db.prepare(query.statement[0].schema.alltableres).all());
}
module.exports.apikey = () => {
	console.log(db.prepare(query.statement[0].apikeysALLRes).all());
}
module.exports.allUserDataRes = function() {
	console.log(db.prepare(query.statement[0].userselectALL).all());
}