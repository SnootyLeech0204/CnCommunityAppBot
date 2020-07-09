const Discord = require('discord.js');
const quiz = [
    {q: "Wie zijn de owners van DG Central", a: ["jolan en rianne", "jolan rianne"]},
    {q: "Wie zijn de oprichters van DG Central", a: ["jolan en rianne", "jolan rianne"]},
    {q: "Wat is de echte naam van SnootyLeech0204", a: ["jolan"]}
];
const options = {
    max: 1,
    time: 30050,
    errors: ["time"],
};

module.exports.run = async(bot,message,args) => {
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    await message.channel.send(item.q);
    try{
        const collected = await message.channel.awaitMessages(answer => item.a.includes(answser.content.toLowercase()), options);
        const winnerMessage = collected.first();
        return message.channel.send({embed: new Discord.RichEmbed()
            .setAuthor(`De winnar is ${winnerMessage.author.tag}!`, winnerMessage.author.displayAvatarURL)
            .setTitle(`Correcte antwoord was: '${winnerMessage.content}'`)
            .setFooter(`Vraag: ${item.q}`)
            .setColor(message.guild.me.displayHexColor)
        })
    } catch(_){
        return message.channel.send({embed: new Discord.RichEmbed()
            .setAuthor('Niemand heeft het antwoord binnen de tijd gevonden')
            .setFooter(`Vraag: ${item.q}`)
        })
    }
}
module.exports.help = {
    name: "quiz",
    aliases: ["q"],
    discription: "Ur IQ",
    usage: "*quiz",
    noalias: "No Aliases",
    accessableby: "Members"
}