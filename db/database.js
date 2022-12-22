const databaseClass = require("better-sqlite3");
const fs = require("fs");
const query = require("./queriesRes.js");
const statement = query.statement[0];
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
	for (const currentTable in query.statement?.[0].tables) {
		/** 
		 * @access private 
		 * @deprecated - created tables
		 * 
		 */
		db.prepare(statement.tables[currentTable]).run();
	};
};

module.exports.emergencyButton = (dbNAME) => {
	/** 
	 * @name exec
	 * @access private 
	 * @description deletes table
	 * 
	 */
	db.exec(`DROP TABLE ${dbNAME}`);
	/** 
	 * @name createTable
	 * @access private 
	 * @description creates tables
	 * 
	 */
	this.createTable();
};

module.exports.close = () => {
 /**
	* @func close
	* @access private
	* @description closes database	
  */
	db.close();
};
/**
 * @access public
 * @description - Alters the table with self made bind parameters
 * @function altertable
 * @param {Object} data - The object that holds all the data
 * @param {string} data.tablename - The name of the table you want to inject.
 * @param {string} data.alteration - The method you want to inject, i.e. add.
 * @param {string} data.columnname - The column name you are adding
 * @param {string} data.columntype - The column type you are adding
 */
module.exports.altertable = (data) => {
	/**
	 * @author VlxtIykg
	 * @function prepare
	 * @function run
	 * @access public
 	 * @param {string} data.tablename - The name of the table you want to inject.
 	 * @param {string} data.alteration - The method you want to inject, i.e. add.
 	 * @param {string} data.columnname - The column name you are adding
 	 * @param {string} data.columntype - The column type you are adding
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
	db.prepare(statement.parameters[0].userinput).run(data.userid, data.user, data.mcname, data.mcuuid, data.interval, data.timestamp);
}
	/**
	 * @access public
	 * @description inputs into db
	 * @function apikeysSubmit
	 * @param {Object} data						- Data object received
	 * @param {string} data.key 			- Api key received
	 * @param {string} data.belonged	- Whose api key
	 * @param {snowflake} data.donated		- Who gave api key (ID form)
	 */
module.exports.apikeysSubmit = function(data) {
	db.prepare(statement.parameters[0]?.apiInput).run(data.key, data.belonged, data.donated);
}
module.exports.updateUserTableUserCol = data => {
	console.log(data);
	db.prepare(statement.update.updateUserTableUserCol).run(data.newUUID, data.name);
}
/* this.updateUserTableUserCol({
	newUUID: "04c5d7d1-cdaa-49c1-813f-d7b24cecc317",
	name: "jesus"
}); */


/**
 * Select stmt
 * 
 */
module.exports.allUserDataRes = function() {
	return db.prepare(statement.userselectALL).all();
}
module.exports.allApikeysRes = function() {
	return db.prepare(statement.apikeysInfoRes).all();
}
module.exports.apikeysRes = function() {
	return db.prepare(statement.apikeysRes).all().map(x => {return Object.values(x).join("")});
}
module.exports.usernameRes = function() {
	return db.prepare(statement.userselectSpecifiedMcUsername).all();
}
module.exports.userDataRes = function(id, mcuuid) {
	return db.prepare(statement.parameters[0].userselectinfo).get(id, mcuuid)
}
module.exports.schema = function() {
	return db.prepare(statement.schema.alltableres).all();
}
this.createTable();