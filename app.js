// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client({retryLimit: Infinity});

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

//Load DiscordBots.org Api dblapi.js
const DBL = require("dblapi.js");
//import DiscordBots.org token
const dbl = new DBL(config.dbltoken, client);

var openUnicorn = [
  "          /| ",
  " ~～～～~/ | ",
  "|       O  O ",
  "|         ∇ |",
  " ~~~~∪∪~~~∪∪ "
];
var closeUnicorn = [
  "          /| ",
  " ～～～～/ | ",
  "|       ⌒  ⌒ ",
  "|         ∇ |",
  " ~~∪∪~~~∪∪~~ "
]

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Prefix: p | p help`);
  try {
  setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 10000);
  }
  catch (error) {
    console.error(error)
  }
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async msg => {
  // This event will run on every single message received, from any channel or DM.

  //console.log("Author: " + msg.author + "; Channel:" + msg.channel + "; Message: " + msg.content);

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(msg.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(msg.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await msg.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "lyrics" || command === "lyric") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.

    const pinkFluffyUnicornsDancingOnRainbowsLyrics = {
    color: 0xe91e63,
    title: 'Pink Fluffy Unicorns Dancing On Rainbows',
    url: 'https://genius.com/Andrew-huang-pink-fluffy-unicorns-dancing-on-rainbows-lyrics',
    author: {
        name: 'Andrew Huang',
        icon_url: 'https://user-images.githubusercontent.com/7539174/48195367-4f9f1480-e304-11e8-9ecb-5a6714e14d3d.jpg',
        url: 'https://andrewhuang.com',
    },
    fields: [
        {
            name: '**[Hook]**',
            value: 'Pink fluffy unicorns dancing on rainbows (x4)',
        },
        {
            name: '===',
            value: '[Bridge]',
        },
        {
            name: "Let's test your knowledge and see what you've learned so far! What colour are the unicorns?",
            value: "PINK!",
        },
        {
            name: "Where are they dancing?",
            value: "A RAINBOW!",
        },
        {
            name: "Please use one word to describe the texture of their magical fur.",
            value: '"... Smiles!" "YEAH!"',
        },
        {
            name: '===',
            value: '[Hook]',
        },
        {
            name: 'Pink fluffy unicorns dancing on rainbows (x7)',
            value: 'Pink fluffy unicorns dancing on dancing on rain',
        }
    ],
    timestamp: new Date()
};

msg.channel.send({ embed: pinkFluffyUnicornsDancingOnRainbowsLyrics });
  }

  if(command === "video" || command === "v" || command === "music" || command === "link") {
    msg.channel.send("https://youtu.be/eWM2joNb9NE");
  }

  if(command === "about") {
    msg.channel.send('Back when Andrew Huang used to create short songs based on listener requests under the name “Songs To Wear Pants To”, a user by the name of “SexyBuksa” requested Huang to create a song using the title “Pink fluffy Unicorns, dancing on rainbows!” This song was created from that request.');
    msg.channel.send('https://youtu.be/3i7qlFz4-1Q');
  }

  if(command === "channel") {
    msg.channel.send('https://www.youtube.com/channel/UCdcemy56JtVTrsFIOoqvV8g');
  }

  if(command === "spotify") {
    msg.channel.send("https://open.spotify.com/track/4Xn2RsLiDUDisOgJ24FigK?autoplay=true&v=T");
  }
  
    if(command === "vote") {
    msg.channel.send("https://discordbots.org/bot/509165623113154571/vote");
  }

  if(command === "help" || command === "h") {
    msg.channel.send({embed: {color: 1687175,title: "Pink Fluffy Unicorns Help Page!",
    fields: [{
        name: "p h | p help",
        value: "Displays this dialog!",
          "inline": true
      },
      {
          name: "p lyrics",
          value: "Prints out lyrics to Pink Fluffy Unicorns! (Spam)",
            "inline": true
        },
        {
            name: "p video | p music",
            value: "Plays the video!!",
              "inline": true
          },
        {
            name: "p about",
            value: "Prints out information about Pink Fluffy Unicorns!",
              "inline": true
          },
          {
              name: "p spotify",
              value: "Plays on Spotify!",
                "inline": true
            },
    ],
    footer: {
      text: "Pink Fluffy Unicorns Dancing on Rainbows!"
    }
  }
});
  }
});

client.login(config.token);
