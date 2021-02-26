/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module  <= this
 -punish.js :module
 -ownerGive.js :module
 -rolePanelReload.js :module
 -roleEdit.js  :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/

const punish = require('./command/punish')
const ownerGive = require('./command/ownerGive.js');
const rolePanelEvent = require('./command/rolePanel/rolePanelReload.js');
const roleEdit = require("./command/rolePanel/roleEdit")
const logger = require('./util/logger');


async function commandHandler([command, ...args],message,guildData,BOT_DATA){

    switch(command.toLowerCase()){
        case BOT_DATA.COMMAND :
            if(!(message.author.id == message.guild.ownerID || message.member._roles.indexOf(guildData.Roles.Admin)==-1)) break;
            AdminCommandHandler([command, ...args],message,guildData);
            break;

        case "kick" :
        case "ban" :
            punish.punish([command, ...args],message,guildData);
            break;
      };
};


async function AdminCommandHandler([command, ...args],message,guildData){

    switch(args[0].toLowerCase()){
        case "owner" :
            ownerGive.ownerGive([command, ...args],message,guildData);
            break;
    
        case "reloadpanel" :
            rolePanelEvent.reloadPanel([command, ...args],message,guildData);
            break;

        case "gamerole" :
        case "compassRank":
            roleEdit.roleEditCommandHandler([command, ...args],message,guildData);
            break;

        case "stop" :
            logger.info(`server was stoped by {cyan}${message.author.tag}`);
            await message.delete();
            message.client.destroy();
            process.exit(0);
        
        default:
            logger.info(`reserved ${args[0]} command, but unknown command.`);
            message.reply(`Unknown command.`);
            break;
      };
};

exports.commandHandler = commandHandler;