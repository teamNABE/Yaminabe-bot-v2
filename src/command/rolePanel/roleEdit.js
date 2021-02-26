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

async function roleEditCommandHandler([command, ...args],message,guildData,BOT_DATA){

    if(!message.member._roles.indexOf(guildData.Roles.Nabe)>-1)
        return await message.channel.send({
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

    const mode = args[0].toLowerCase()=="gamerole"? "Gamerole" : "CompassRank";
    switch(args[1].toLowerCase()){
        case "add" :
            roleAdd([command, ...args],message,mode,guildData,BOT_DATA);
            break;

        case "delete" : 
        case "del" :
            roleDelete([command, ...args],message,mode,guildData,BOT_DATA)
            break;

        default :
            
        break;
    }
}


async function roleAdd([command, ...args],message,mode,guildData,BOT_DATA){
    const mentiodRole = message.mentions.roles.first();
    let role;
    
    if(!mentiodRole){
        role = message.guild.roles.cache.get(args[2]);
    }else{
        role = mentiodRole;
    }

    if(!role){
        message.channel.send("有効なロールを指定してください。");
        return;
    }
    
    if(checkRole(role,mode,guildData)){
        message.channel.send(`そのロールは${mode}に追加済みです。`);
        return;
    }
    guildData[mode].push([role.name,role.id]);
    fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8')
    message.channel.send(`${role.name}を${mode}に追加しました。`);
}

async function roleDelete([command, ...args],message,mode,guildData,BOT_DATA){
    const mentiodRole = message.mentions.roles.first();
    let role;
    
    if(!mentiodRole){
        role = message.guild.roles.cache.get(args[2]);
    }else{
        role = mentiodRole;
    }
    console.log(role)
    if(!role){
        message.channel.send("有効なロールを指定してください。");
        return;
    }

    if(!checkRole(role,mode,guildData)){
        message.channel.send(`そのロールは${mode}に存在しません。`)
        return;
    }

    delete guildData[mode][guildData[mode].map(key => key[1]).indexOf(role.id)];
    guildData[mode] = guildData[mode].filter(Boolean);

    fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8');
    message.channel.send(`${role.name}を${mode}から削除しました。`);

}

function checkRole(role,mode,guildData){
    const roleArray = guildData[mode].map(key => key[1]);
    return roleArray.indexOf(role.id)>0? true : false;
}

exports.roleEditCommandHandler = roleEditCommandHandler;