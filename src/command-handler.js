/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'  <= this
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -announce_new_member.js :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'
 
ran by node.js

2020-10-31

*/

//class
const kickEvent = require('./command/kick.js');
const banEvent = require('./command/ban.js');
const ownerGive = require('./command/ownerGive.js');
const rolePanelEvent = require('./rolePanel.js');


async function command_Handler([command, ...args],message,guildData,BOT_DATA,client){


    switch(command.toLowerCase()){
        case "kick" :
            kicke.kick([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "ban" :
            bane.ban([command, ...args],message,guildData,BOT_DATA,client);
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