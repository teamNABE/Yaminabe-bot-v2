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


async function command_Handler([command, ...args],message,guildData,BOT_DATA,client){


    switch(command.toLowerCase()){
        case "kick" :
        case "ban" :
            punish.punish([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "owner" :
            ownerGive.ownerGive([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "reloadpanel" :
            rolePanele.reloadPanel([command, ...args],message,guildData,BOT_DATA,client)
            break;
      }
}

exports.commandHandler = command_Handler