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

/**
 * Standard logs statement
 * @description Typically things to log for information
 */
// standardlog.schema(); //Grabs every table
// standardlog.apikey(); //Grabs every api key
// standardlog.allUserDataRes(); // Grabs every user