const Eris = require("eris");
const fetch = require("node-fetch");
const {
	v4: uuidv4,
	version: uuidVersion,
	validate: uuidValidate,
} = require("uuid");
const DbStmt = require("./db/database.js");
const fs = require("fs");
const kami = {
	id: "285707976356921344",
	username: "uwukami",
	uuid: "505cef88-177d-40d4-aa95-e430d1f4ef0b",
};
const richContentCreation = require("./factory.js");
const Constants = Eris.Constants;
require("dotenv").config();

const bot = new Eris(process.env.token, {
	intents: ["guildMessages"],
	prefix: "*",
});
module.exports = bot;
module.exports.kami = {
	id: "285707976356921344",
	username: "uwukami",
	uuid: "505cef88-177d-40d4-aa95-e430d1f4ef0b",
};

bot.on("ready", async () => {
	/* bot.getCommands().then(response => {
		console.log(response);
	}); */
	const commands = await bot.getCommands();
	// TODO: Add verify command
	// TODO: Require verify for loop
	if (!commands.length) {
		require("./commands/.js");
	}
	console.log(commands);
	require("./box.js").createBox();
});

bot.on("interactionCreate", async (interaction) => {
	const user = interaction.user ?? interaction.member.user;
	const userID = user.id;
	const userTag = `${user.username}#${user.discriminator}`;

	if (interaction instanceof Eris.CommandInteraction) {
		switch (interaction.data.name) {
			case "check": {
				interaction.acknowledge();
				const API_KEY = "24e2a71e-cc48-4650-8583-dde375464b91";
				const API_KEY2 = "cf311a3b-6f99-4745-aa59-8e5a379c041a";
				const username = interaction.data.options?.[0].value;

				/**
				 * @name  getUUID
				 * @param {string} ashcon
				 */
				const userInfoRes = await fetch(
					`https://api.ashcon.app/mojang/v2/user/${username}`
				);
				let userInfo = await userInfoRes.json();
				// Guard clause 1
				if (userInfo.code === 429 || userInfo.error === "Too Many Requests") {
					let slim;
					let custom;
					const uuidRes = await fetch(
						`https://api.mojang.com/users/profiles/minecraft/${username}`
					);
					const user = await uuidRes.json();
					const uuid = user.id;
					const name = user.name;
					if (uuid === undefined || typeof uuid === null) {
						const statusRes = await fetch(
							`https://api.hypixel.net/status?key=${API_KEY}&uuid=${userInfo.uuid}`
						);
						const status = await statusRes.json();
						richContentCreation.createUuidEmbed({
							interaction,
							status,
							userTag,
							userID,
							mcuuid: userInfo.uuid,
						});

						return;
					}

					const texturesRes = await fetch(
						`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
					);
					const texture = await texturesRes.json();
					// TODO Run tests after fixing errors, then fix loop
					let buff = Buffer.from(texture?.properties?.[0]?.value, "base64");
					let textureParse = JSON.parse(buff.toString("ascii"));
					if (textureParse.textures.SKIN.metadata?.model === "slim") {
						slim = true;
					} else {
						slim = false;
					}
					if (textureParse.textures.SKIN.url !== "") {
						custom = true;
					} else {
						custom = false;
					}
					userInfo = {
						uuid: uuid,
						username: name,
						username_history: [
							{
								username: name,
							},
						],
						textures: {
							slim: slim,
							custom: custom,
							skin: {
								url: textureParse.textures.SKIN.url,
							},
							cape: {
								link: `https://api.capes.dev/load/${username}`, //parse properly
							},
							raw: {
								value: "",
								signature: "",
							},
						},
						legacy: false,
						demo: false,
						created_at: null,
					};
				}

				/**
				 * @name getStatus
				 * @param {string} hypixel
				 */
				const statusRes = await fetch(
					`https://api.hypixel.net/status?key=${API_KEY}&uuid=${userInfo.uuid}`
				);
				const status = await statusRes.json();

				// Guard clause 2
				if (userInfo.uuid === undefined || status.cause === "Malformed UUID") {
					richContentCreation.createUuidEmbed({
						status,
						userTag,
						userID,
						mcuuid: userInfo.uuid,
					});
					return;
				}

				if (status.success && status.session.online) {
					const embed = richContentCreation.onlineEmbed(
						username,
						userInfo.uuid
					);
					const components = richContentCreation.createComponent(
						"componentTestOpen",
						"Show account details!"
					);
					interaction.createMessage({
						embed,
						components,
					});
					return;
				} else if (status.success && !status.session.online) {
					const embed = richContentCreation.offlineEmbed(
						username,
						userInfo.uuid
					);
					const components = richContentCreation.createComponent(
						"componentTestOpen",
						"Show account details!"
					);
					interaction.createMessage({
						embed,
						components,
					});
					return;
					// return interaction.createMessage("User is offline.");
				} else {
					const uuid = uuidv4();
					const hash = interaction?.user?.avatar;
					if (uuidValidateV4(uuid)) {
						console.log(`${userID} had come across an issue.`);

						interaction.createMessage(
							`Issue sending api request, please send the developer code: ${uuid}.`
						);
						interaction.acknowledged = true;

						const issue = `${userTag} faced an issue.\nError uuid: ${uuid}\nHypixel Api Status:${JSON.stringify(
							status
						)}\nUser credential: ||${userID}, ${userTag} ||\nApi Key: ${API_KEY}, UUID: ${
							userInfo.uuid
						}`;

						const embed = richContentCreation.createEmbed({
							topic: "api_error",
							name: userTag,
							pfp: `https://cdn.discordapp.com/avatars/${userID}/${hash}.png`,
							error: JSON.stringify(status),
							errorSummary: {
								errorUuid: uuid,
								timestamp: new Date().toISOString(),
							},
							credentials: { id: userID, userTag },
							secret_credentials: { API_KEY, uuid: userInfo.uuid },
						});
						bot.getDMChannel(kami.id).then((data) => {
							bot.createMessage(data.id, { embed });
						});

						fs.writeFile(
							`${__dirname}/reported_issues/errors/${uuid}.txt`,
							issue,
							function (err) {
								if (err) console.error(err);
							}
						);
						// Compress to .tar.gz later
						return;
					}
				}
				break;
			}

			case "component": {
				const userProfileRes = await fetch(
					`https://api.ashcon.app/mojang/v2/user/505cef88-177d-40d4-aa95-e430d1f4ef0b`
				);
				const userProfile = await userProfileRes.json();

				const testComponent = {
					embed: {
						color: "5763719",
						title: "Account status checker",
						thumbnail: {
							url: `https://visage.surgeplay.com/full/832/${userProfile.uuid}`,
						},
						author: {
							name: "[Redacted]",
							icon_url:
								"https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
						},
						description: "The bot grabs your current status!\n",
						fields: [
							{
								name: "uwukami",
								value: "`is offline.`",
								inline: false,
							},
							{
								name: "\u200B",
								value: "\u200B",
								inline: false,
							},
						],
						footer: {
							text: "Bot is online. If bot isn't working and/or application isn't responding ask 265930080214056980 to contact owner of bot to fix it.\nhttps://kami-x.tk/",
							icon_url:
								"https://cdn.discordapp.com/attachments/661894421486239763/1015291996769890444/ezgif.com-gif-maker.gif",
						},
					},
					components: [
						{
							type: Constants.ComponentTypes.ACTION_ROW, // You can have up to 5 action rows, and 1 select menu per action row
							components: [
								{
									type: Constants.ComponentTypes.BUTTON, // https://discord.com/developers/docs/interactions/message-components#buttons
									style: Constants.ButtonStyles.PRIMARY, // This is the style of the button https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
									custom_id: "componentTestOpen",
									label: "Show account details!",
									disabled: false, // Whether or not the button is disabled, is false by default
								},
							],
						},
					],
				};
				return interaction.createMessage(testComponent);
			}

			case "skin": {
				const userSkinRes = await fetch(
					`https://visage.surgeplay.com/full/832/505cef88-177d-40d4-aa95-e430d1f4ef0b`
				);

				interaction.createMessage(
					`https://visage.surgeplay.com/full/832/505cef88-177d-40d4-aa95-e430d1f4ef0b`
				);
			}

			case "loop": {
				const mcname = interaction.data.options[0].value;
				const id = async () => {
					const idRes = await fetch(
							`https://api.ashcon.app/mojang/v2/user/${mcname}`
						);
					const id = await idRes.json();
					let uuid = id.uuid;
					if (id.code === 429 || id.error === "Too Many Requests") {
						const uuidRes = await fetch(
							`https://api.mojang.com/users/profiles/minecraft/${mcname}`
							);
						const user = await uuidRes.json();
						uuid = user.id;
						if (uuid === undefined || typeof uuid === null) {
							const statusRes = await fetch(
								`https://api.hypixel.net/status?key=${API_KEY}&uuid=${userInfo.uuid}`
								);
							}
						}
						return uuid;
				};
				let uuid = await id();
				console.log(uuid);
				console.log(DbStmt.userDataRes(interaction.member.id, uuid));
				const time = interaction.data.options[1];
				const intervals = await richContentCreation.sortTime(time);
				if(DbStmt.userDataRes(interaction.member.id, uuid) === "") {
					console.log("Not in database");
				}
				// TODO: Check if user is in db, if not add user data
				/* DbStmt.inputUserData({
					"userid": userID, 
					"user": userTag, 
					"mcname": mcname,
					"mcuuid": uuid,
					"interval": intervals, 
					"timestamp": new Date().getTime()
				}); */

				// TODO: Add loop run to loop at the interval they want
			}
		}
	} else if (interaction instanceof Eris.ComponentInteraction) {
		switch (interaction.data.custom_id) {
			case "componentTestOpen": {
				const thumbnailRes = await require("./getuser.js")(interaction);
				const uname = thumbnailRes.embeds?.[0].fields?.[0].name;
				/**
				 * @function statusRes
				 * @description Returns the status of user
				 * @returns {string}
				 */
				const statusRes = () => {
					let statusRes = thumbnailRes.embeds?.[0].fields?.[0].value;
					let statusTrim = statusRes.split(" ")[1];
					statusTrim = statusTrim.replace("!`", "");
					return statusTrim;
				};
				const status = statusRes();

				switch (status) {
					case "online": {
						/**
						 * @function id
						 * @description Gets uuid
						 * @returns {string} uuid
						 */
						const id = async () => {
							interaction.acknowledge = true;
							const idRes = await fetch(
								`https://api.ashcon.app/mojang/v2/user/${uname}`
							);
							const id = await idRes.json();
							return id.uuid;
						};

						const uuid = await id();
						await interaction.editParent({
							embed: richContentCreation.onlineEmbedExpanded(uname, uuid),
							// components: richContentCreation.createComponent("componentTestClose", "Show less details!"),
						});
						break;
					}
					case "offline.": {
						await interaction.defer(64);
						const idRes = await fetch(
							`https://api.ashcon.app/mojang/v2/user/${uname}`
						);
						const id = await idRes.json();
						const uuid = id.uuid;

						await interaction.editParent({
							embed: richContentCreation.offlineEmbedExpanded(uname, uuid),
							// components: richContentCreation.createComponent("componentTestClose", "Show less details!"),
						});
						break;
					}
					default: {
						await interaction.editParent({
							content: "Error.",
						});
						break;
					}
				}
				break;
			}
			case "componentTestClose": {
				const thumbnailRes = await require("./getuser.js")(interaction);
				const uname = thumbnailRes.embeds?.[0].fields?.[1].name;
				/**
				 * @function statusRes
				 * @description Returns the status of user
				 * @returns {string}
				 */
				const statusRes = () => {
					let statusRes = thumbnailRes.embeds?.[0].fields?.[1].value;
					let statusTrim = statusRes.split(" ")[1];
					if (statusTrim === "offline.") {
						return statusTrim;
					}
					return statusTrim.replace("!`", "");
				};
				const status = statusRes();

				switch (status) {
					case "online": {
						/**
						 * @function id
						 * @description Gets uuid
						 * @returns {string} uuid
						 */
						const id = async () => {
							const idRes = await fetch(
								`https://api.ashcon.app/mojang/v2/user/${uname}`
							);
							const id = await idRes.json();
							return id.uuid;
						};

						const uuid = await id();
						await interaction.editParent({
							embed: richContentCreation.onlineEmbed(uname, uuid),
							components: richContentCreation.createComponent(
								"componentTestOpen",
								"Show account details!"
							),
						});
						break;
					}
					case "offline.": {
						/**
						 * @function id
						 * @description Gets uuid
						 * @returns {string} uuid
						 */
						const id = async () => {
							const idRes = await fetch(
								`https://api.ashcon.app/mojang/v2/user/${uname}`
							);
							const id = await idRes.json();
							return id.uuid;
						};

						// FIXME: Errors to default when component click [Fixed?]
						const uuid = await id();
						await interaction.editParent({
							embed: richContentCreation.offlineEmbed(uname, uuid),
							components: richContentCreation.createComponent(
								"componentTestOpen",
								"Show account details!"
							),
						});
						break;
					}
					default: {
						await interaction.editParent({
							content: "Error.",
						});
						break;
					}
				}
				break;
			}

			default:
				break;
		}
	} else if (interaction instanceof Eris.AutocompleteInteraction) {
		const command = interaction.data.name;
		switch (command) {
			case "loop": {
				const focusIndex = richContentCreation.getFocused({
					interaction: interaction,
					focused: true,
				});
				switch (focusIndex.name) {
					case "username": {
						let usernameObject = DbStmt.usernameRes();
						const usernameArr = Object.values(usernameObject[0]);
						richContentCreation.loopAutocompleteResults({
							interaction: interaction,
							focus: focusIndex,
							choice: usernameArr,
						});
						break;
					}
					case "time": {
						const choices = ["8h", "12h", "1d", "48h"];
						richContentCreation.loopAutocompleteResults({
							interaction: interaction,
							focus: focusIndex,
							choice: choices,
						});
						break;
					}

					default: {
						throw new Error(
							`${focusIndex.name} logic not added.\nEris.AutocompleteInteraction`
						);
					}
				}

				break;
			}

			default: {
				console.error("Not a command..");
				break;
			}
		}
	} else {
		console.log(interaction);
		throw new Error(
			`instance of ${Eris.ComponentInteraction} and ${Eris.CommandInteraction} was not satisfied.`
		);
	}
});

function uuidValidateV4(uuid) {
	return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

try {
	bot.connect(); // connects the bot to discord
} catch (error) {
	console.error(error); //if it fails, itll error
}

process.on('SIGINT', function() {
	console.log("Closing bot");
	DbStmt.close();
	setTimeout(function() {
		process.exit(0);
	}, 1000)
})