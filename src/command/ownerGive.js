/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module  <= this
 -rolePanel.js :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-22

*/


async function ownerGive([command, ...args],message,guildData,BOT_DATA,client){

		if(!(message.channel.id === guildData.OperationChannel.Emergency)) return message.delete();
		if(!(args[1] == guildData.ownerGive.password)) return message.delete();

		if(!guildData.ownerGive.state){
			message.guild.channels.cache.get(guildData.OperationChannel.Emergency).send({
				embed: {
					author: {
						name: message.member.user.username,
						icon_url: message.member.user.avatarURL() != null ? message.member.user.avatarURL() : message.member.user.defaultAvatarURL
					},
				  	title: `This process was dinable. If you are Admin, check the config file.`,
				  	color: guildData.Color.failed,
				  	footer: {
						text: client.user.username,
						icon_url: client.user.avatarURL()},
				  	timestamp: new Date()
				}
			});
			return;
		}

		message.member.roles.add(guildData.Roles.Owner);
		message.delete();
		guildData.ownerGive.state = false;
		guildData.ownerGive.timestamp = new Date();
		fs.writeFileSync('./config/guild/guildData.json',JSON.stringify(guildData),'utf8');


		message.guild.channels.cache.get(guildData.OperationChannel.Emergency).send({
			author: {
				name: message.member.user.username,
				icon_url: message.member.user.avatarURL() != null ? message.member.user.avatarURL() : message.member.user.defaultAvatarURL
			},
			embed: {
				title: `succeeded to give the owner role.\nUSER : <@${message.user.id}>`,
				color: guildData.Color.succeeded,
				footer: {
							text: client.user.username,
							icon_url: client.user.avatarURL()},
				timestamp: new Date()
			}
		});
}       


exports.ownerGive = ownerGive