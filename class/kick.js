/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  <= this
 -announce_new_member :CLASS  'announce new member'
 -ban.js :CLASS  'ban the member'
 
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



class kickEvent {
    constructor(client,message,json) {
        this.client = client;
        this.message = message;
        this.json = json
    }

    async kick ([command, ...args]){
        const client = this.client;
        const message = this.message;
        const json = this.json;


        if (!(message.channel.id === json.guild.OperationChannel.BotPanel))  return message.delete();

            if (!(message.author.id === json.guild.Roles.Owner || message.member.roles.cache.get(json.guild.Roles.Nabe)))
                return await message.guild.channels.cache.get(json.guild.OperationChannel.BotPanel).send({
                  embed: {
                        title: "実行する権限がありません。",
                        color: json.guild.Color.failed,
                        "footer": {
                        "text": client.user.username,
                        "icon_url": client.user.avatarURL()},
                        timestamp: new Date()
                     }
                    });
            if (message.mentions.members.size !== 1)
                return await message.guild.channels.cache.get(json.guild.OperationChannel.BotPanel).send({
                  embed: {
                        title: "kickするメンバーを1人指定してください",
                        color: json.guild.Color.failed,
                        "footer": {
                        "text": client.user.username,
                        "icon_url": client.user.avatarURL()},
                        timestamp: new Date()
                     }
                    });

            var reason;
            switch(args[1]){
                case "1":
                    reason = [json.guild.KickReason[0][0],json.guild.KickReason[0][1]];
                    break;
                case "2":
                    reason = [json.guild.KickReason[1][0],json.guild.KickReason[1][1]];
                    break;
                case "3":
                    reason = [json.guild.KickReason[2][0],json.guild.KickReason[3][1]]
                    break;
                default:
                    await message.guild.channels.cache.get(json.guild.OperationChannel.BotPanel).send({
                        embed: {
                            title: "正しい理由選択番号を入力してください。",
                            color: json.guild.Color.failed,
                            footer: {
                                  "text": client.user.username,
                                  "icon_url": client.user.avatarURL()},
                            timestamp: new Date()
                        }
                      });
                    return;
            };

            const member = message.mentions.members.first();
            const text ={
                embed: {
                    author: {
                        name: member.user.username,
                        icon_url: member.user.avatarURL()
                    },
                    title: "Kicked User",
                    description: `${member.user.tag}をkickしました\nreason : ${reason[0]}"\n執行者 : ${message.member.user.username}`,
                    color: json.guild.Color.kick,
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.avatarURL()},
                    timestamp: new Date()
                    }
                };

            try{
                member.send({
                    embed: {
                        title: "kickされました。",
                        description: "闇鍋サーバーにご参加いただきありがとうございます。\n\n" +
                        reason[1] +
                        "\n\n再度参加を希望される場合は、公式ホームページからお入りください。\nTeam鍋 Discordサーバー 「闇鍋」   運営一同 ",
                        color: json.guild.Color.info,
                        footer: {
                            text: client.user.username,
                            icon_url: client.user.avatarURL()},
                        timestamp: new Date(),
                        thumbnail: {
                            url: message.guild.iconURL()
                        }
                    }
                });

                await message.channel.send(text);
                await message.guild.channels.cache.get(json.guild.Channels.Log).send(text);
                await member.kick(reason[0]);

            }catch(e){console.log("kick system error\n"+e);}; 
    };
}

module.exports = kickEvent