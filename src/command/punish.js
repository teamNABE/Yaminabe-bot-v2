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

const logger = require('../util/logger')


async function punish([command, ...args],message,guildData,BOT_DATA,client){
    if (!(message.channel.id === guildData.OperationChannel.BotPanel))  return message.delete();
    if (!(message.author.id === guildData.Roles.Owner || message.member.roles.cache.get(guildData.Roles.Nabe)))
        return await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "実行する権限がありません。",
                color: guildData.Color.failed,
                "footer": {
                "text": client.user.username,
                "icon_url": client.user.avatarURL()},
                timestamp: new Date()
            }
        });
    if(args.length != 2)
        return await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "無効なコマンドです。",
                color: guildData.Color.failed,
                "footer": {
                "text": client.user.username,
                "icon_url": client.user.avatarURL()},
                timestamp: new Date()
            }
        });
    const member = memberSet([command, ...args],message,guildData,BOT_DATA,client);
    if(member == null || member == undefined)
        return await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "kickするメンバーを1人指定してください",
                color: guildData.Color.failed,
                "footer": {
                "text": client.user.username,
                "icon_url": client.user.avatarURL()},
                timestamp: new Date()
            }
        });


    const reason = reasonSelecter([command, ...args],message,guildData,client);

    console.log(member.id)
    console.log(reason)
    try{
        messageSender([command, ...args],message,guildData,client,member,reason);
        if(command.toLowerCase() == "kick") await member.kick(reason[0]);
        if(command.toLowerCase() == "ban") await member.ban(reason[0]);
    }catch(e){
        logger.error(`error! \n${e}`)
    };
};


//function
async function reasonSelecter([command, ...args],message,guildData,client){
    if(command.toLowerCase() == "kick" && args[1] < guildData.KickReason.length) return guildData.KickReason[args[1]];
    if(command.toLowerCase() == "ban" && args[1] < guildData.BanReason.length) return guildData.BanReason[args[1]];
    
    return await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
        embed: {
            title: "正しい理由選択番号を入力してください。",
            color: guildData.Color.failed,
            footer: {
                  "text": client.user.username,
                  "icon_url": client.user.avatarURL()},
            timestamp: new Date()
        }
      });
}

async function messageSender([command, ...args],message,guildData,client,member,reason){
    let title;
    let fotter;
    
    if(command.toLowerCase() == "kick"){
        title = "kick"
        fotter = guildData.Message.Kick
    };
    if(command.toLowerCase() == "ban"){
        title = "ban"
        fotter = guildData.Message.Ban  
    };

    await member.send({
        embed: {
            title: `${title}されました。`,
            description: "闇鍋サーバーにご参加いただきありがとうございます。\n\n" +
                         reason[1] + "\n\n" + fotter,
            color: guildData.Color.info,
            footer: {
                text: client.user.username,
                icon_url: client.user.avatarURL()},
            timestamp: new Date(),
            thumbnail: {
                url: message.guild.iconURL()
            }
        }
    });

    await message.guild.channels.cache.get(guildData.Channels.Log).send({
        embed: {
            author: {
                name: member.user.username,
                icon_url: member.user.defaultAvatarURL()
            },
            title: `${title}ed User`,
            description: `<@${member.user.id}>を${title}しました\nreason : ${reason[0]}"\n執行者 : <@${message.member.user.id}>`,
            color: command.toLowerCase() == kick ? guildData.Color.kick : guildData.Color.ban,
            footer: {
                text: client.user.username,
                icon_url: client.user.avatarURL()},
            timestamp: new Date()
        }
    });
};

async function memberSet([command, ...args],message,guildData,BOT_DATA,client){

    let result;
    const member = args[0].toString().slice(2,(args[0].toString().length-1))
    try{
        result = await message.guild.members.fetch(member);
    }catch(e){
        logger.error(`member error!`)
        result = null;
    }
    console.log(result)
    return result;
}



exports.punish = punish