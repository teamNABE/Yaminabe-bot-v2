/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanelReload.js :module
 -roleEdit.js  :module  <= this
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/
'use strict'

const fs = require("fs");
const logger = require("../../util/logger");

async function roleEditCommandHandler([command, ...args],message,guildData){
    if(message.member._roles.indexOf(guildData.Roles.Nabe) == -1){
        await message.channel.send({
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
        logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but user didn't have permission.`);
        return;
};

    const mode = args[0].toLowerCase()=="gamerole"? "Gamerole" : "CompassRank";
    switch(args[1].toLowerCase()){
        case "add" :
            roleAdd([command, ...args],message,mode,guildData);
            break;

        case "delete" : 
        case "del" :
            roleDelete([command, ...args],message,mode,guildData)
            break;

        default :
            message.channel.send(`不明なコマンドです。`)
            logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but unknown command.`);
            break;
    };
};


async function roleAdd([command, ...args],message,mode,guildData){
    const mentiodRole = message.mentions.roles.first();
    let role;
    
    if(!mentiodRole){
        role = message.guild.roles.cache.get(args[2]);
    }else{
        role = mentiodRole;
    };

    if(!role){
        message.channel.send("有効なロールを指定してください。");
        logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but this role can't read.`);
        return;
    };
    
    if(checkRole(role,mode,guildData)){
        message.channel.send(`そのロールは${mode}に追加済みです。`);
        logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but ${role.name} role already added.`);
        return;
    };

    guildData[mode].push([role.name,role.id]);
    fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8');
    message.channel.send(`${role.name}を${mode}に追加しました。`);
    logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}". suceeded to add ${role.name} role.`);
};

async function roleDelete([command, ...args],message,mode,guildData){
    const mentiodRole = message.mentions.roles.first();
    let role;
    
    if(!mentiodRole){
        role = message.guild.roles.cache.get(args[2]);
    }else{
        role = mentiodRole;
    };
    console.log(role);
    if(!role){
        message.channel.send("有効なロールを指定してください。");
        logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but this role can't read.`);
        return;
    };

    if(!checkRole(role,mode,guildData)){
        message.channel.send(`そのロールは${mode}に存在しません。`);
        logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}", but this role can't read.`);
        return;
    };

    delete guildData[mode][guildData[mode].map(key => key[1]).indexOf(role.id)];
    guildData[mode] = guildData[mode].filter(Boolean);

    fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8');
    message.channel.send(`${role.name}を${mode}から削除しました。`);
    logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}". suceeded to delete ${role.name} role.`);
}

function checkRole(role,mode,guildData){
    const roleArray = guildData[mode].map(key => key[1]);
    return roleArray.indexOf(role.id)>0? true : false;
}

exports.roleEditCommandHandler = roleEditCommandHandler;