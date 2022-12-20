const bot = require("./index.js");

module.exports = async function(interaction) {
	const channelID = interaction.channel.id ?? interaction.message.channel.id;
	const messageID = interaction.message.id;
	return await bot.getMessage(channelID, messageID);
}
