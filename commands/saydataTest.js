const database = require("../database.json");
const discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Je kan dit commando niet gebruiken!");

    var con = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database
      }, {
          tableName: 'data'
      });

    con.connect(err => {

        if(err) throw err;

    });

    var user = message.guild.member(message.mentions.users.first());
var messageText = args.join(" ").slice(22);

    if(user && messageText){

        con.query(`SELECT * FROM Data WHERE idUser = '${user.id}'`, (err, rows) => {

            if(err) throw err;

            if(rows.length < 1){

                con.query(`INSERT INTO Data (idUser,messageText) VALUES ("${user.id}","${messageText}")`);
                message.channel.send(`${messageText}`);
                if(err) throw err;

            }
            
            if(rows.length = 1){
                

                con.query(`INSERT INTO Data (idUser,messageText) VALUES ("${user.id}","${messageText}")`);
                message.channel.send(`${messageText}`);

            }

            if(rows.length < 1){
                

                con.query(`INSERT INTO Data (idUser,messageText) VALUES ("${user.id}","${messageText}")`);
                message.channel.send(`${messageText}`);

            }

        });

    }else {

        con.query(`SELECT * FROM Data`, (err, rows) => {
            if(err) throw err;

            if(rows.length > 0){

                for (var i = 0; i < rows.length; i++){

                    var id = rows[i].idUser;
                    message.channel.send(message.guild.members.get(id).user.username + ": messageText, " + rows[i].messageText);

                }

            }else{

                message.channel.send("GEEN GEGEVENS!!")

            }
        });

    }

}

module.exports.help = {
    name: "data"
}