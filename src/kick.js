/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  <= this
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'
 
ran by node.js

2020-9-6

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