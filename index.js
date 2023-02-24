const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.on("ready", () => {
	console.log("Bot is ready! :)");
});

client.on("messageCreate", (message) => {
	if (/[tT]+[wW]+[iI]+[gG]+[yY]/.test(message.content)) {
		message.react("1078508965098422417");
	}
});

client.login(process.env.TOKEN);
