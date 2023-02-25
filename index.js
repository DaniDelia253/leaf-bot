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
	//...and if 'twiggy' is in any of them.....
	if (/[tT]+[wW]+[iI]+[gG]+[yY]/.test(message.content)) {
		//react with bebytwiggy :)
		message.react("1078508965098422417");
	}
});

client.login(process.env.TOKEN);
