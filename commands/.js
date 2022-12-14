const { Constants } = require("eris");
const bot = require("./index.js");

/** @name check
 *  @params {*} <object>
 */
bot.createCommand({
	name: "check",
	description: "Checks if user is offline",
	default_member_permissions: 0x0000000000000800,
	options: [
		{
			"name": "username",
			"description": "Check which user is offline",
			"type" : Constants.ApplicationCommandOptionTypes.STRING,
			"required": true,
		},
		{
			"name": "apikey",
			"description": "Would you like to donate an api key?",
			"type" : Constants.ApplicationCommandOptionTypes.STRING,
		},
	],
	type: Constants.ApplicationCommandTypes.CHAT_INPUT,
});

/** @name component 
 *  @params {*} <object>
*/
bot.createCommand({
	name: "component",
	description: "test command",
	default_member_permissions: "0",
	type: Constants.ApplicationCommandTypes.CHAT_INPUT,
});

/** @name buildskin 
 *  @params {*} <object>
*/
bot.createCommand({
	name: "skin",
	description: "build canvas",
	default_member_permissions: "0",
	type: Constants.ApplicationCommandTypes.CHAT_INPUT,
});
bot.createGuildCommand("763962224166830131", {
	name: "loop",
	description: "Loops over an interval to check if you are online",
	default_member_permissions: 0x0000000000000800,
	type: Constants.ApplicationCommandOptionTypes.CHAT_INPUT,
	options: [
		{
			"name": "username",
			"description": "Which user would you like to loop?",
			"channel_types": ["0"],
			"min_length": "3",
			"max_length": "16",
			"type" : Constants.ApplicationCommandOptionTypes.STRING,
			"required": true,
			"autocomplete": true
		},
		{
			"name": "time",
			"description": "How long would you like to loop! [Hint] \`Defaults to seconds, type s for sec, m for min, h for hrs, d for days!\`",
			"channel_types": ["0"],
			"type": Constants.ApplicationCommandOptionTypes.STRING,
			"required": true,
			"autocomplete": true,
		}
	]
}, 1, true);