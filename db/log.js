const db = require("./database.js").db;
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
module.exports.issue = () => console.log(`${userID} had come across an issue.`);

/**
 * Standard logs statement
 * @description Typically things to log for information
 */
// this.schema(); //Grabs every table
this.apikey(); //Grabs every api key
// this.allUserDataRes(); // Grabs every user