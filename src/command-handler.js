/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module  <= this
 -punish.js :module
 -announce_new_member :module
 -ownerGive.js :module
 -rolePanel.js :module
 
ran by node.js

2020-11-17

*/

//module
const punish = require('./command/punish')
const ownerGive = require('./command/ownerGive.js');
const rolePanelEvent = require('./command/rolePanel.js');
const logger = require('./util/logger');


async function commandHandler([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case BOT_DATA.COMMAND :
            if(!(message.author.id == message.guild.ownerID || guildData.Admin.indexOf(message.author.id)>-1)) break;
            AdminCommandHandler([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "kick" :
        case "ban" :
            punish.punish([command, ...args],message,guildData,BOT_DATA,client);
            break;
      };
}


async function AdminCommandHandler([command, ...args],message,guildData,BOT_DATA,client){

    switch(args[0].toLowerCase()){
        case "owner" :
            ownerGive.ownerGive([command, ...args],message,guildData,BOT_DATA,client);
            break;
    
        case "reloadpanel" :
            rolePanele.reloadPanel([command, ...args],message,guildData,BOT_DATA,client)
            break;

        case "stop" :
            logger.info(`server was stoped by {cyan}${message.author.tag}`);
            await message.delete();
            client.destroy();
            process.exit(0);
        
        default:
            message.reply(`Unknown command.`);
            break;
      };
}

exports.commandHandler = commandHandler