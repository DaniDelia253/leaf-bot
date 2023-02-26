const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

//look at the docs for ALLLL issues!!

//client obj represents the entire bot:

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
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
		message.author.username === "Arcane" && message.content.includes("has reached level")
	) {
		//then i want it to react with a random emoji from a list
		const list = [
			//~~place "emoji number", "emoji number", "emoji number", here 
			//todofix number limit
			"966108946953818172",
			"941776068669472849",
			"1078906441387229294",
			"1025919089379659776"
		];
		const number = Math.floor(Math.random() * 4);
		message.react(list[number]);
	}
});

client.login(process.env.TOKEN);
