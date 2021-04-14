/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanelReload.js :module
 -roleEdit.js  :module
 -announce_new_member :module  <= this
 -reaction.js :module
 
ran by node.js

2021-2-26

*/
'use strict'

const logger = require("../util/logger");

async function announce_new_member(member,guildData){
    if(member.user.bot) return;
    let message = guildData.Message.Welcome;
    message = message.replace(/{NAME}/g, `<@${member.id}>`);
    message = message.replace(/{GUILDNAME}/g, `<@${member.guild.id}>`);
    message = message.replace(/{RULE_CH}/g, `<#${guildData.Channels.Rule}>`);
    message = message.replace(/{SERVERINTRO_CH}/g, `<#${guildData.Channels.ServerIntroduction}>`);
    message = message.replace(/{SELFINTRO_CH}/g, `<#${guildData.Channels.SelfIntroduction}>`);
    await member.guild.channels.cache.get(guildData.Channels.Welcome).send(message);
    logger.info(`reserved "guildMemberAdd" Event. suceeded to send new member notice memssage.`);
};

exports.announce_new_member = announce_new_member;