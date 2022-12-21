const databaseClass = require("better-sqlite3");
const fs = require("fs");
const query = require("./queriesRes.js");
require("dotenv").config();
const db = new databaseClass(`${__dirname}/user.db`, /* { verbose: console.log } */);
module.exports.db = db;
const kami = {
	discord: {
		id: "285707976356921344",
		user: "Kami#7715",
	},
	minecraft: {
		username: "uwukami",
		uuid: "505cef88-177d-40d4-aa95-e430d1f4ef0b",
	},
};
/**
 * @function createTable
 */
module.exports.createTable = async () => {
	db.pragma("journal_mode = WAL");
	/** 
	 * @access private 
	 * @deprecated - created tables
	 * 
	 */
	for (const currentTable in query.statement?.[0].tables) {
		db.prepare(query.statement[0].tables[currentTable]).run();
	};
};

module.exports.emergencyButton = (dbNAME) => {
	db.exec(`DROP TABLE ${dbNAME}`);
	this.createTable();
};

module.exports.close = () => {
	db.close();
};
/**
 * @function altertable
 * @description - Alters the table with self made bind parameters
 * @param {Object} data - The object that holds all the data
 * @param {string} data.tablename - The name of the table you want to inject.
 * @param {string} data.alteration - The method you want to inject, i.e. add.
 * @param {string} data.columnname - The column name you are adding
 * @param {string} data.columntype - The column type you are adding
 */
module.exports.altertable = (data) => {
	/**
	 * @param data.tablename
	 * @param data.alteration
	 * @param data.columnname
	 * @param data.columntype
	 */
	db.prepare(`ALTER TABLE ${data.tablename} ${data.alteration} COLUMN ${data.columnname} ${data.columntype} AUTOINCREMENT`).run();
}

/**
 * Insert/Update stmt
 * @param {string} userid 				- discord id
 * @param {string} user 					- discord username+descriminator
 * @param {string} mcname					- minecraft username
 * @param {string} mcuuid 				- minecraft uuid
 * @param {BigInteger} interval 	- how long to reiterate
 * @param {BigInteger} timestamp	- time.now()
 * 
 */
module.exports.userDataSubmit = function(data) {
	/**
	 * @description inputs into db
	 * @function prepare
	 * @function run
	 * @param {Object} query 											- the object itself
	 * @param {string} query.userstmt 						- groups of user statements
	 * @param {string} query.userstmt.userinput		- adds input into db
	 * 
	 */
	db.prepare(query.statement[0].parameters[0].userinput).run(data.userid, data.user, data.mcname, data.mcuuid, data.interval, data.timestamp);
}
module.exports.apikeysSubmit = function(data) {
	db.prepare(query.statement[0].parameters[0]?.apiInput).run(data.key, data.belonged, data.donated);
}
/**
 * Select stmt
 * 
 */
module.exports.allUserDataRes = function() {
	return db.prepare(query.statement[0].userselectALL).all();
}
module.exports.allApikeysRes = function() {
	return db.prepare(query.statement[0].apikeysALLRes).all();
}
module.exports.usernameRes = function() {
	return db.prepare(query.statement[0].userselectSpecifiedMcUsername).all();
}
module.exports.userDataRes = function(id, mcuuid) {
	return db.prepare(query.statement[0].parameters[0].userselectinfo).get(id, mcuuid)
}
module.exports.schema = function() {
	return db.prepare(query.statement[0].schema.alltableres).all();
}
console.log(this);
this.createTable();