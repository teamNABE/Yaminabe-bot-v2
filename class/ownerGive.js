/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'  <= this
 
ran by node.js

2020-9-6

*/

/*

const dotenv = require('dotenv').config();
const fs = require('fs');
const discord = require("discord.js");
var json = JSON.parse(fs.readFileSync('./setting.json','utf8'));
const client = new discord.Client();
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]

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