/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'　<= this
 
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


class anmEvent {
    constructor(client,json) {
        this.client = client;
        this.json = json
    }

    async anm (member){
        const client = this.client;
        const json = this.json;
    
        var message = json.guild.Message.Welcome
        message = message.replace('{NAME}', `<@${member.id}>`)
        message = message.replace('{GUILDNAME}', `<@${member.guild.id}>`)
        message = message.replace('{RULE_CH}', `<#${json.guild.Channels.Rule}>`)
        message = message.replace('{SERVERINTRO_CH}', `<#${json.guild.Channels.ServerIntroduction}>`)
        message = message.replace('{SELFINTRO_CH}', `<#${json.guild.Channels.SelfIntroduction}>`)
        await member.guild.channels.cache.get(json.guild.Channels.Welcome).send(message);
    }
}

module.exports = anmEvent