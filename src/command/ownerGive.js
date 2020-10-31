/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'  <= this
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'
 
ran by node.js

2020-10-31

*/


async function ownerGive([command, ...args],message,guildData,BOT_DATA,client){

    if(!(message.channel.id === guildData.OperationChannel.Emergency)) return message.delete();
    if(!(args[1] == guildData.OwnerPassWord)) return message.delete();
          message.member.roles.add(guildData.Roles.Owner);
          message.delete();
          message.guild.channels.cache.get(guildData.OperationChannel.Emergency).send({
            embed: {
              title: "succeeded",
              color: guildData.Color.succeeded,
              footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL()},
              timestamp: new Date()
            }
          });
}       


exports.ownerGive = ownerGive