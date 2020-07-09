const discord = require("discord.js");
module.exports.run = async(bot,message,args,db) =>{
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Je kan dit commando niet gebruiken!");

    let argsresult;
    let mChannel = message.mentions.channels.first();
    message.delete();
    if(mChannel){
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    }else{
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }
}

module.exports.help ={
    name: "say"
}