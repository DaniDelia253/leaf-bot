const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

//look at the docs for ALLLL issues!!

//* All of our important stuff:
const GuildIDs = {
	DaniDeliaServer: "1078490032324759642",
	Server: "1048059530711404615",
	NVO: "938105437180551168",
};

const ChannelTags = {
	NVOrules: "<#938916275437064213>",
	NVOroles: "<#942151699718602773>",
	NVOanythingGoes: "<#938105437180551172>",
};

//client obj represents the entire bot:

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		//with these three, I can gain access to text in messages
		//if i wanted info about reactions, I would have to specify that here!!
		//if something isn't working, most likely the right info is not included here!
	],
});

//to make sure we know when the bot is ready
client.on("ready", () => {
	console.log("Bot is ready to go!! :)");
});

//look at every single message on the server...
client.on("messageCreate", (message) => {
	if (
		message.author.username === "Arcane" &&
		message.content.includes("has reached level")
	) {
		//then i want it to react with a random emoji from a list

		//first... establish the 2 variables:
		let list = [];
		let amount = 0;

		if (message.guild.name === "server") {
			list = [
				"1078506917812506624",
				"1079448316321992715",
				"1079448313385996338",
				"1079448310982651975",
				"1079448308604485743",
				"1078508965098422417",
				"1079463337617797260",
				"1079463626957664327",
				"1079464077442699355",
				"1079462912025952386",
			];
			amount = 10;
		} else if (message.guild.id === "938105437180551168") {
			list = [
				// memelove2:
				"966108946953818172",
				// cat_cheer:
				"941776068669472849",
				// chaoticskykid:
				"1078906441387229294",
				// lazybun_hearteyes:
				"1025919089379659776",
				// Mothlove:
				"1048060379735019560",
				//anime_Heart:
				"939377626026508298",
				//anime_peek:
				"939373652871372800",
				//bearywow:
				"939389586717696080",
				//emoji_Loved:
				"939363246924783676",
				//heart_orange:
				"941616320066228234",
				//memelove:
				"966108689452920883",
				//shibehearteyes:
				"939392400181329920",
				//shibelove:
				"939392116612821002",
			];
			amount = 13;
		}
		const number = Math.floor(Math.random() * amount);
		message.react(list[number]);
	}
	//this section is for leaf reacting to someone saying "leaf" in their message. (1079573401888358510 serverleaf) and (1079573678515298344 for NVO/akaServerID#938105437180551168)
	if (message.content.includes("Leaf") || message.content.includes("leaf")) {
		let id = "";
		if (message.guild.name === "server") {
			id = "1079573401888358510";
		} else if (message.guild.id === "938105437180551168") {
			id = "1079573678515298344";
		}
		message.react(id);
	}

	// const embedMessage = {
	// 	type: "rich",
	// 	title: `✿﹒welcome  ﹒✿`,
	// 	description: `Welcome <@${member.user.id}> to NVO,  it's lovely to have you here!\n‎\n﹒verify our ${ChannelTags.NVOrules} \n\n﹒grab some ${ChannelTags.NVOroles}\n\n﹒come chat in ${ChannelTags.NVOanythingGoes}!\n‎`,
	// 	color: 0xedb2aa,
	// 	image: {
	// 		url: `https://i.imgur.com/7m2LO4M.png`,
	// 		height: 0,
	// 		width: 0,
	// 	},
	// };
	// if (message.content.includes("test the welcome message embed")) {
	// 	client.channels.cache
	// 		.get("962146899220131860")
	// 		.send({ embeds: [embedMessage] });
	// }
});

//the following code makes leaf stack his own emoji on any leafemoji
client.on("messageReactionAdd", async (reaction) => {
	if (
		//this is for Server:
		reaction._emoji.id === "1079573401888358510" ||
		//this is for NVO:
		reaction._emoji.id === "1079573678515298344"
	) {
		// message.react("1079573401888358510")
		const channel = await client.channels.fetch(reaction.message.channelId);
		channel.messages.fetch(reaction.message.id).then((msg) => {
			msg.react(reaction._emoji.id);
		});
	}
});

//welcome messagre for when new members join in:
client.on("guildMemberAdd", async (member) => {
	//when a new member joins happens, get their id and establish all variables we need:
	//create the embed to send:
	const embedMessage = {
		type: "rich",
		title: `✿﹒welcome  ﹒✿`,
		description: `Welcome <@${member.user.id}> to NVO,  it's lovely to have you here!\n‎\n﹒verify our ${ChannelTags.NVOrules} \n\n﹒grab some ${ChannelTags.NVOroles}\n\n﹒come chat in ${ChannelTags.NVOanythingGoes}!\n‎`,

		color: 0xedb2aa,
		image: {
			url: `https://i.imgur.com/7m2LO4M.png`,
			height: 0,
			width: 0,
		},
	};
	//the bot will tag them in a welcome message and mention checking out #rules and #roles! 1078490033037770805
	const ChannelIDs = {
		NVOwelcome: "1081977778829795338",
		NVOtestTestTesting: "962146899220131860",
		ServerGeneral: "1048059530711404618",
		DaniDeliaGeneral: "1078490033037770805",
	};
	let whereToSend;
	if (member.guild.id === GuildIDs.DaniDeliaServer) {
		whereToSend = ChannelIDs.DaniDeliaGeneral;
	} else if (member.guild.id === GuildIDs.Server) {
		whereToSend = ChannelIDs.ServerGeneral;
	} else if (member.guild.id === GuildIDs.NVO) {
		whereToSend = ChannelIDs.NVOwelcome;
	}
	client.channels.cache.get(whereToSend).send({ embeds: [embedMessage] });
});

client.login(process.env.TOKEN);
