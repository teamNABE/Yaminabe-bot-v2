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

2020-9-6

*/

class OwnerGive {
    constructor(client,message,json) {
        this.client = client;
        this.message = message;
        this.json = json
    }

    async ownerGive ([command, ...args]){
        const client = this.client;
        const message = this.message;
        const json = this.json;

        if(!(message.channel.id === json.guild.OperationChannel.Emergency)) return message.delete();
        if(!(args[1] === Process.env.password)) return message.delete();
              message.member.roles.add(json.guild.Roles.Owner);
              message.delete();
              message.guild.channels.cache.get(json.guild.OperationChannel.Emergency).send({
                embed: {
                  title: "succeeded",
                  color: json.guild.Color.succeeded,
                  footer: {
                        text: client.user.username,
                        icon_url: client.user.avatarURL()},
                  timestamp: new Date()
                }
              });
    }       
}

module.exports = OwnerGive