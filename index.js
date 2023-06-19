// const { Client, GatewayIntentBits } = require("discord.js");
// require("dotenv/config");
import * as dotenv from "dotenv";
dotenv.config();
import { Client, REST, Routes, GatewayIntentBits } from "discord.js";
//import fetch from "node-fetch";

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
const UserIDs = {
    NVOInfographicUserId: "939369746133028896",
    NVOLeafUserId: "1078513451099488337",
    NVOStennyUserId: "876850436953481277",
};
const ChannelIDs = {
    NVOwelcome: "1081977778829795338",
    NVOtestTestTesting: "962146899220131860",
    NVOBotCommands: "942418361495736390",
    NVOSuggestions: "1042496838005174292",
    NVOHeyIPlanted: "939973859795431445",
    NVODailies: "939369464317739028",
    NVONotesChat: "938122836009189427",
    NVOArtSubmissions: "1120143881321857067",
    NVOSubmitArt: "1118677030796541982",
    ServerGeneral: "1048059530711404618",
    ServerYesNo: "1089293622337359993",
    ServerDizzyPlant: "1089311289031000130",
    DaniDeliaGeneral: "1078490033037770805",
};

const LeafEmojiIds = {
    serverLeaf: "1079573401888358510",
    NVOLeaf: "1079573678515298344",
};

const EmojiIDs = {
    NVObearyyes: "941618386897612841",
    NVObearyno: "939389511677386792",
    serveryescat: "1089386412849250414",
    servernocat: "1089296461415596153",
    dizzy: "💫",
};

const plantedAtPhrases = [
    "planted at",
    "planted in",
    "planted on",
    "planted me",
    "planted a",
    "plant at",
    "plant @",
    "Planted at",
    "Planted in",
    "Planted on",
    "Planted me",
    "Planted a",
    "Plant at",
    "Plant @",
];

//*END of important stuff

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

client.on("error", (error) => {
    console.log("Error!!!");
    console.log(error);
});

const commands = [
    {
        name: "embed",
        description:
            "Enter the channelID and paste the corresponding value for each field in the code.",
        options: [
            {
                type: 3, //3 is string
                name: "channelid",
                description:
                    "ChannelID for the channel where you want to send the embed",
                required: true,
            },
            {
                type: 3, //3 is string
                name: "title",
                description: "Title of the embed.",
                required: true,
            },
            {
                type: 3, //3 is string
                name: "description",
                description: "Text for the body of the embed.",
                required: true,
            },
            {
                type: 3, //3 is string
                name: "color",
                description: "Color value.",
                required: false,
            },
            {
                type: 3, //3 is string
                name: "imageurl",
                description: "Color value.",
                required: false,
            },
        ],
    },
];

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "embed") {
        const interactionOptionsArr = interaction.options._hoistedOptions;
        const title = interactionOptionsArr[1].value;
        const description = interactionOptionsArr[2].value;
        let color;
        if (interactionOptionsArr[3] === undefined) {
            color = 0xffffff;
        } else {
            color = +`0x${interactionOptionsArr[3].value}`;
        }
        let imageurl;
        if (interactionOptionsArr[4] === undefined) {
            imageurl = "";
        } else {
            imageurl = interactionOptionsArr[4].value;
        }
        const embedMessage = {
            type: "rich",
            title: eval(title),
            description: eval(description),

            color: color,
            image: {
                url: imageurl,
                height: 0,
                width: 0,
            },
        };
        client.channels
            .fetch(interaction.options._hoistedOptions[0].value)
            .then((channel) => {
                channel.send({
                    embeds: [embedMessage],
                });
            });
        interaction.reply("✅");
    }
});

//look at every single message on the server...
client.on("messageCreate", async (message) => {
    if (
        message.channelId === ChannelIDs.NVOSubmitArt &&
        message.author.id !== UserIDs.NVOStennyUserId &&
        message.author.id !== UserIDs.NVOLeafUserId
    ) {
        const urllist = [];
        Array.from(message.attachments).forEach((attachment) =>
            urllist.push(attachment[1].url)
        );
        const channel = await client.channels.fetch(
            ChannelIDs.NVOArtSubmissions
        );
        channel.send(`<@${message.author.id}> sent:`);
        if (message.content !== "") {
            channel.send(message.content);
        }
        urllist.forEach((url) => channel.send(url));
        message.delete();
        const tychannel = await client.channels.fetch(ChannelIDs.NVOSubmitArt);
        const tymessage = await tychannel.send(
            "Thank you for submitting! Your message has been received. <:cherryblossomNVO:1081423354118013078>"
        );
        setTimeout(() => tymessage.delete(), 10000);
    }

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
    if (message.channelId === ChannelIDs.NVOSuggestions) {
        //if a message is sent in this channel then react with YES and NO emoji.
        message.react(EmojiIDs.NVObearyyes);
        message.react(EmojiIDs.NVObearyno);
    }
    //this section is for leaf reacting to someone saying "leaf" in their message.
    if (/\b[lL]+[eE]+[aA]+[fF]+\b/.test(message.content)) {
        //check whether I/m in server or NVO and react with the right emoji
        if (message.guildId === GuildIDs.Server) {
            message.react(LeafEmojiIds.serverLeaf);
        } else if (message.guildId === GuildIDs.NVO) {
            message.react(LeafEmojiIds.NVOLeaf);
        }
    }
    //if the message is in the channel HeyIPleanted
    if (message.channelId === ChannelIDs.NVOHeyIPlanted) {
        //and it includes "planted at/in"
        plantedAtPhrases.forEach((phrase) => {
            if (message.content.includes(phrase)) {
                //then react with the dizzy emoji.
                message.react(EmojiIDs.dizzy);
            }
        });
    }
    //if  "Infographics" says "Meditation" in "dailies" then leaf will send a reminder to "NotesChat" for "medi today!""
    if (
        message.author.id === UserIDs.NVOInfographicUserId &&
        message.content.includes("Meditation") &&
        message.channelId === ChannelIDs.NVODailies
    ) {
        const channel = await client.channels.fetch(ChannelIDs.NVONotesChat);
        channel.send("There's a medi quest today!");
    }
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

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(process.env.CLIENTID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

client.login(process.env.TOKEN);
