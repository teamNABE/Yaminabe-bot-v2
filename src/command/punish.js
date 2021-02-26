/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module  <= this
 -ownerGive.js :module
 -rolePanelReload.js :module
 -roleEdit.js  :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/

const logger = require('../util/logger')


async function punish([command, ...args], message, guildData) {
    if (!(message.channel.id === guildData.OperationChannel.BotPanel)) return message.delete();
    if (!havePrems([command, ...args], message, guildData)){
        await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "実行する権限がありません。",
                color: guildData.Color.failed,
                "footer": {
                    "text": message.client.user.username,
                    "icon_url": message.client.user.avatarURL()
                },
                timestamp: new Date()
            }
        });
        logger.info(`reserved "${command} ${args[0]} ${args[1]}", but user didn't have permission.`);
        return;
    };

    if (args.length != 2){
        await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "無効なコマンドです。",
                color: guildData.Color.failed,
                "footer": {
                    "text": message.client.user.username,
                    "icon_url": message.client.user.avatarURL()
                },
                timestamp: new Date()
            }
        });
        logger.info(`reserved "${command} ${args[0]} ${args[1]}", but unknown command`);
        return;
    };

    const member = await memberSet([command, ...args], message);
    if (member == undefined){
        await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "処罰するメンバーを1人指定してください",
                color: guildData.Color.failed,
                "footer": {
                    "text": message.client.user.username,
                    "icon_url": message.client.user.avatarURL()
                },
                timestamp: new Date()
            }
        });
        logger.info(`reserved "${command} ${args[0]} ${args[1]}", but member cord didn't use punish`);
        return;
    };

    const reason = await reasonSelecter([command, ...args],guildData);
    if (reason == undefined){
        await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
            embed: {
                title: "正しい理由選択番号を入力してください。",
                color: guildData.Color.failed,
                footer: {
                    "text": message.client.user.username,
                    "icon_url": message.client.user.avatarURL()
                },
                timestamp: new Date()
            }
        });
        logger.info(`reserved "${command} ${args[0]} ${args[1]}", but reason number isn't available.`);
        return;
    };

    try {
        await messageSender([command, ...args], message, guildData, member, reason);
        if (command.toLowerCase() == "kick") await member.kick(reason[0]);
        if (command.toLowerCase() == "ban") await member.ban(reason[0]);
        logger.info(`reserved "${command} ${args[0]} ${args[1]}". suceeded to punish ${member.user.tag}.`);
    } catch (e) {
        logger.error(`while send ban or kick message to DM, occurred error. \n${e}`);
    };
};


//function
async function reasonSelecter([command, ...args],guildData) {
    if (command.toLowerCase() == "kick" && args[1] <= guildData.KickReason.length) return guildData.KickReason[args[1]-1];
    if (command.toLowerCase() == "ban" && args[1] <= guildData.BanReason.length) return guildData.BanReason[args[1]-1];
    return undefined; 
}


async function messageSender([command, ...args], message, guildData, member, reason) {
    let title;
    let fotter;
    if (command.toLowerCase() == "kick") {
        title = "kick";
        fotter = guildData.Message.Kick;
    };
    if (command.toLowerCase() == "ban") {
        title = "ban";
        fotter = guildData.Message.Ban;
    };

    await member.send({
        embed: {
            title: `${title}されました。`,
            description: "闇鍋サーバーにご参加いただきありがとうございます。\n\n" +
                reason[1] + "\n\n" + fotter,
            color: guildData.Color.info,
            footer: {
                text: message.client.user.username,
                icon_url: message.client.user.avatarURL()
            },
            timestamp: new Date(),
            thumbnail: {
                url: message.guild.iconURL()
            }
        }
    });

    await message.guild.channels.cache.get(guildData.OperationChannel.Log).send({
        embed: {
            author: {
                name: member.user.username,
                icon_url: member.user.avatarURL() != null ? member.user.avatarURL() : member.user.defaultAvatarURL
            },
            title: `${title}ed User`,
            description: `<@${member.user.id}>を${title}しました\nreason : ${reason[0]}"\n執行者 : <@${message.member.user.id}>`,
            color: (command.toLowerCase() == "kick" ? guildData.Color.kick : guildData.Color.ban),
            footer: {
                text: message.client.user.username,
                icon_url: message.client.user.avatarURL()
            },
            timestamp: new Date()
        }
    });

    await message.guild.channels.cache.get(guildData.OperationChannel.BotPanel).send({
        embed: {
            author: {
                name: member.user.username,
                icon_url: member.user.avatarURL() != null ? member.user.avatarURL() : member.user.defaultAvatarURL
            },
            title: `${title}ed User`,
            description: `<@${member.user.id}>を${title}しました\nreason : ${reason[0]}"\n執行者 : <@${message.member.user.id}>`,
            color: (command.toLowerCase() == "kick" ? guildData.Color.kick : guildData.Color.ban),
            footer: {
                text: message.client.user.username,
                icon_url: message.client.user.avatarURL()
            },
            timestamp: new Date()
        }
    });
};


async function memberSet([command, ...args], message) {
    const member = args[0].toString().slice(3, (args[0].toString().length - 1));
    try {
        return await message.guild.members.fetch(member);
    } catch (e) {
        logger.error(`member error!`);
        return undefined;
    };
};


async function havePrems([command, ...args], message, guildData) {
    if (command.toLowerCase() == "kick") {
        let perm = message.member._roles.indexOf(guildData.Roles.Owner) == -1 ? false : true;
        perm = message.member._roles.indexOf(guildData.Roles.Nabe) == -1 ? false : true;
        return perm;
    };
    if (command.toLowerCase() == "ban") {
        let perm = message.member._roles.indexOf(guildData.Roles.Owner) == -1 ? false : true;
        return perm;
    };
};


exports.punish = punish;