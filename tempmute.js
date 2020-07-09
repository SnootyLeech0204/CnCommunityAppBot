const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!tomute) return message.reply("Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "muted");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if (!mutetime) return message.reply("Je hebt geen tijd geschreven!");

    await (tomute.addRole(muterole.id));
    message.reply('<@${tomute.id}> is gemute voor ${ms(mutetime)}');

    setTimeout(function () {
        tomute.removeRole(muterole.id);
        message.channel.send('<@${tomute.id}> is geunmute!')
    }, ms(mutetime));
}

module.exports.help = {
    name: "tempmute"
}