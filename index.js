const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

//look at the docs for ALLLL issues!!

//client obj represents the entire bot:

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
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
				"966108946953818172",
				"941776068669472849",
				"1078906441387229294",
				"1025919089379659776",
			];
			amount = 4;
		}
		const number = Math.floor(Math.random() * amount);
		message.react(list[number]);
	}
	//this section is for leaf reacting to leaf. (1079573401888358510 serverleaf) and (1079573678515298344 for NVO/akaServerID#938105437180551168)
	if (message.content.includes("Leaf") || message.content.includes ("leaf")){
		let id = "";
				if (message.guild.name === "server") {
			id = "1079573401888358510";
		} else if (message.guild.id === "938105437180551168") {
			id = "1079573678515298344";
		}
		message.react(id)
	}
});
client.on("messageReactionAdd",async (reaction) =>{
		let id = "";
				if (message.guild.name === "server") {
			id = "1079573401888358510";
		} else if (message.guild.id === "938105437180551168") {
			id = "1079573678515298344";
		}
		if (reaction._emoji.id === id){
			const channel = await client.channels.fetch(reaction.message.channelId)
			channel.messages.fetch(reaction.message.id).then(msg=>{
				msg.react(id)
			})
		}
	})

client.login(process.env.TOKEN);
