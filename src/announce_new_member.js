/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'　<= this
 -ownerGive.js :CLASS  'give the owner role'
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'
 
ran by node.js

2020-10-30

*/

class anmEvent {
    constructor(client,json) {
        this.client = client;
        this.json = json
    }

    async anm (member){
        const client = this.client;
        const json = this.json;
    
        var message = json.guild.Message.Welcome
        message = message.replace(/{NAME}/g, `<@${member.id}>`)
        message = message.replace(/{GUILDNAME}/g, `<@${member.guild.id}>`)
        message = message.replace(/{RULE_CH}/g, `<#${json.guild.Channels.Rule}>`)
        message = message.replace(/{SERVERINTRO_CH}/g, `<#${json.guild.Channels.ServerIntroduction}>`)
        message = message.replace(/{SELFINTRO_CH}/g, `<#${json.guild.Channels.SelfIntroduction}>`)
        await member.guild.channels.cache.get(json.guild.Channels.Welcome).send(message);
    }
}

module.exports = anmEvent