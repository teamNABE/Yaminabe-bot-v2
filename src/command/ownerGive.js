/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module  <= this
 -rolePanelReload.js :module
 -roleEdit.js  :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/
'use strict'

const fs = require("fs");
const logger = require("../util/logger");

async function ownerGive([command, ...args],message,guildData){

		if(!(message.channel.id === guildData.OperationChannel.Emergency)){
			await message.delete();
			logger.info(`reserved "${command} ${args[0]} ${args[1]}", but this channel different.`);
		};
		if(!(args[1] == guildData.OwnerGive.password)){
			await message.delete();
			logger.info(`reserved "${command} ${args[0]} ${args[1]}", but wrong password.`);
		};

		if(!guildData.OwnerGive.state){
			await message.guild.channels.cache.get(guildData.OperationChannel.Emergency).send({
				embed: {
					author: {
						name: message.member.user.username,
						icon_url: message.member.user.avatarURL() != null ? message.member.user.avatarURL() : message.member.user.defaultAvatarURL
					},
				  	title: `This process was dinable. If you are Admin, check the config file.`,
				  	color: guildData.Color.failed,
				  	footer: {
						text: message.client.user.username,
						icon_url: message.client.user.avatarURL()},
				  	timestamp: new Date()
				}
			});
			logger.info(`reserved "${command} ${args[0]} ${args[1]}", but this function was disnable.`);
			return;
		};

		await message.member.roles.add(guildData.Roles.Owner);
		await message.delete();
		guildData.OwnerGive.state = false;
		guildData.OwnerGive.timestamp = new Date();
		fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8');


		message.guild.channels.cache.get(guildData.OperationChannel.Emergency).send({
			author: {
				name: message.member.user.username,
				icon_url: message.member.user.avatarURL() != null ? message.member.user.avatarURL() : message.member.user.defaultAvatarURL
			},
			embed: {
				title: `succeeded to give the owner role.\nUSER : <@!${message.member.user.id}>`,
				color: guildData.Color.succeeded,
				footer: {
							text: message.client.user.username,
							icon_url: message.client.user.avatarURL()},
				timestamp: new Date()
			}
		});
		logger.info(`reserved "${command} ${args[0]} ${args[1]} ${args[2]}". suceeded to give ${message.member.user.tag} owner role.`);
};   


exports.ownerGive = ownerGive;