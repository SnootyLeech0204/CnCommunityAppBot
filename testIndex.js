const discord = require("discord.js");
const bot = new discord.Client();
const config = require("./config.json");

const fs = require("fs");
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0){
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
    });

});


bot.on("ready", (member) => {
    console.log(`Bot is online, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    var prefix = config.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message,arguments);

    if(message.channel.name.includes("mededelingen")) {
      console.log(message.author.tag, message.content); 
  }
});

bot.login(process.env.token);