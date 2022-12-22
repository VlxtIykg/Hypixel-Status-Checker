const Eris = require("eris");
const db = require("./db/database.js");
const fs = require("fs");
const kami = {
  id: "285707976356921344",
  username: "uwukami",
  uuid: "505cef88-177d-40d4-aa95-e430d1f4ef0b",
};
const {
  v4: uuidv4,
  version: uuidVersion,
  validate: uuidValidate,
} = require("uuid");

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
const Constants = Eris.Constants;

module.exports.closedEmbed = () => {
  return {
    color: "10038562",
    title: "Account status checker",
    thumbnail: {
      url: `https://visage.surgeplay.com/full/832/${userP.uuid}`,
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
  };
};

module.exports.openEmbed = () => {
  return {
    color: "2067276",
    title: "Account status checker",
    author: {
      name: "[Redacted]",
      icon_url:
        "https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
    },
    thumbnail,
    description: "The bot grabs your current status!\n",
    fields: [
      {
        name: "Account info",
        value:
          "`Username: uwukami<string> || UUID: 505cef88-177d-40d4-aa95-e430d1f4ef0b<string | buffer | base64>`",
        inline: true,
      },
      {
        name: "uwukami",
        value: "`is offline.`",
        inline: true,
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
  };
};

// TODO: Add more details
/**
 *
 * @param {*} username
 * @param {*} uuid
 * @returns embed<object>
 */
module.exports.onlineEmbed = (username, uuid) => {
  return {
    color: "5763719",
    title: "Account status checker",
    author: {
      name: "[Redacted]",
      icon_url:
        "https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
    },
    description: "The bot grabs your current status!\n",
    thumbnail: {
      url: `https://visage.surgeplay.com/full/832/${uuid}`,
    },
    fields: [
      {
        name: username,
        value: "`is online!`",
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
  };
};

// TODO: Add more details
module.exports.offlineEmbed = (username, uuid) => {
  return {
    color: "15548997",
    title: "Account status checker",
    author: {
      name: "[Redacted]",
      icon_url:
        "https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
    },
    thumbnail: {
      url: `https://visage.surgeplay.com/full/832/${uuid}`,
    },
    description: "The bot grabs your current status!\n",
    fields: [
      {
        name: username,
        value: "`is offline. You should get on hypixel!`",
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
  };
};

module.exports.onlineEmbedExpanded = (username, uuid) => {
  return {
    color: "5763719",
    title: "Account status checker",
    thumbnail: {
      url: `https://visage.surgeplay.com/full/832/${uuid}`,
    },
    author: {
      name: "[Redacted]",
      icon_url:
        "https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
    },
    description: "The bot grabs your current status!\n",
    fields: [
      {
        name: "Account info",
        value: `\`Username: ${username}<string> || UUID: ${uuid}<string | buffer | base64>\``,
        inline: true,
      },
      {
        name: username,
        value: "`is online!`",
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
  };
};

module.exports.offlineEmbedExpanded = (username, uuid) => {
  return {
    color: "15548997",
    title: "Account status checker",
    thumbnail: {
      url: `https://visage.surgeplay.com/full/832/${uuid}`,
    },
    author: {
      name: "[Redacted]",
      icon_url:
        "https://media.discordapp.net/attachments/1028832341017235557/1049549488949305434/purple.png?width=459&height=649",
    },
    description: "The bot grabs your current status!\n",
    fields: [
      {
        name: "Account info",
        value: `\`Username: ${username}<string> || UUID: ${uuid}<string | buffer | base64>\``,
        inline: true,
      },
      {
        name: username,
        value: "`is offline. You should get on hypixel!`",
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
  };
};

//FIXME: Fix action rows, implement ideas, have secondary buttons
module.exports.createComponent = (id, text) => {
  return [
    {
      type: Constants.ComponentTypes.ACTION_ROW, // You can have up to 5 action rows, and 1 select menu per action row
      components: [
        {
          type: Constants.ComponentTypes.BUTTON, // https://discord.com/developers/docs/interactions/message-components#buttons
          style: Constants.ButtonStyles.PRIMARY, // This is the style of the button https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
          custom_id: id,
          label: text,
          disabled: false, // Whether or not the button is disabled, is false by default
        },
      ],
    },
  ];
};

/* 
const issue = `${userTag} faced an issue.\nError uuid: ${uuid}\nHypixel Api Status:${JSON.stringify(
              status
            )}\nUser credential: ||${userID}, ${userTag} ||\nApi Key: ${apikeys[0]}, UUID: ${
              userInfo.uuid
            }`;
						 */
/* 
data: Data{
	topic: api_error
	name <string>,
	pfp <string: userid, avatar hash>,
	error <string||base64: api response>,
	errorSummary: <object>{
		name <string>,
		user: <object> {
			username: Kami
			descriminator: 7715
			usertag: Kami#7715
		}.tag,
	},
	credential <string||integer||base64>, 
	secret: <object>{
		credentials <string: api key, uuid>
	}
}
*/
module.exports.createEmbed = (data) => {
  switch (data.topic) {
    case "api_error": {
      return {
        color: data.color ?? "10038562",
        title: "Error reports",
        author: {
          name: data.name,
          iconURL: data.pfp,
        },
        description: `**Hypixel api status: ${data.error}**`,
        fields: [
          {
            name: `\u200B`,
            value: `\u200B`,
            inline: false,
          },
          {
            name: `Error uuid: ${data.errorSummary.errorUuid}`,
            value: `Time recorded: ${data.errorSummary.timestamp}`,
            inline: false,
          },
          {
            name: `User id: ${data.credentials.id}`,
            value: `Username: ${data.credentials.userTag}`,
          },
          {
            name: `Api key used: ${data.secret_credentials.API_KEY}`,
            value: `uuid checked: ${data.secret_credentials.uuid}`,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Dm Fie for bugs!",
        },
      };
    }

    default: {
      break;
    }
  }
};

module.exports.createUuidEmbed = (data) => {
  const bot = require("./index.js");
  const uuid = uuidv4();
  const interaction = data.interaction;
  const apikeys = db.allApikeysRes();
  if (!uuidValidateV4(uuid)) {
    console.log("Invalid uuid..?");
  }
  const hash = interaction?.user?.avatar;
  const issue = `${
    data.userTag
  } faced an issue.\nError uuid: ${uuid}\nHypixel Api Status:${JSON.stringify(
    data.status
  )}\nUser credential: ||${data.userID}, ${
    data.userTag
  } ||\nApi Key: ${apikeys[0]}, UUID: ${data.mcuuid}`;
  const embed = this.createEmbed({
    topic: "api_error",
    color: "10070709",
    name: data.userTag,
    pfp: `https://cdn.discordapp.com/avatars/${data.userID}/${hash}.png`,
    error: JSON.stringify(data.status),
    errorSummary: { errorUuid: uuid, timestamp: new Date().toISOString() },
    credentials: { id: data.userID, userTag: data.userTag },
    secret_credentials: { API_KEY: apikeys[0], uuid: data.mcuuid },
  });

  interaction.createMessage("Invalid uuid. Please use a proper username!");
  console.error(
    `Invalid uuid\nUser Info object: ${data.mcuuid} {Default to undefined}\n${data.status.cause}`
  );
  bot.getDMChannel(kami.id).then((data) => {
    console.log(interaction.data);
    bot.createMessage(data.id, {
      content: `uuid checked: \`${interaction?.["data"].options?.[0].value}\``,
      embed,
    });
  });

  fs.writeFile(
    `${__dirname}/reported_issues/malformed_uuid/${uuid}.txt`,
    issue,
    function (err) {
      if (err) console.error(err);
    }
  );
};

module.exports.getFocused = (args) => {
  const interaction = args.interaction;
  const goal = args.focused;
  const focusedObject = interaction.data.options;
  const focusRes = focusedObject.find(function (item, index) {
    if (item.focused === goal) {
      return true;
    }
  });
  return focusRes;
};

module.exports.loopAutocompleteResults = (parameters) => {
  const interaction = parameters.interaction;
  const choice = parameters.choice;
  const focus = parameters.focus;
  const filtered = choice.filter((userChoice) =>
    userChoice.startsWith(focus.value)
  );
  const resultObject = filtered.map((possibleAnswers) => ({
    name: possibleAnswers,
    value: possibleAnswers,
  }));
  try {
    const defaultResult = () => {
      if (resultObject.name === "" && resultObject.value === "") {
        resultObject = choice.map((possibleAnswers) => ({
          name: possibleAnswers,
          value: possibleAnswers,
        }));
      }
    };
    defaultResult();
    interaction.result(resultObject);
  } catch (error) {
    console.error(error);
  }
};

module.exports.sortTime = async (data) => {
  const rawtime = data.value;
  const timeInt = parseFloat(rawtime);
  const siUnit = rawtime.replace(/[^a-zA-Z]+/g, '');
  let seconds; 
  const parsedSeconds = await this.sortHours(siUnit);
  seconds = timeInt*parsedSeconds;
  return seconds;
}
module.exports.sortHours = async (unit) => {
  const lowercaseUnit = unit.toLowerCase();
  switch (lowercaseUnit) {
    case "ms": {
      return .001
    }
    case "m": {
      return 60;
    }
    case "h": {
      return 3600;
      }
    case "d": {
      return 86400;
    }
    default: {
      switch(lowercaseUnit[0]) {
        case "ms": {
          return .001
        }
        case "m": {
          return 60;
        }
        case "h": {
          return 3600;
          }
        case "d": {
          return 86400;
        }   
      }
      break;
      }
  }
}
this.sortTime({
  "value": "30m",
  "type": 3,
  "name": "time"
});