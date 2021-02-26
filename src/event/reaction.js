/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanel.js :module
 -announce_new_member :module
 -reaction.js :module  <= this
 
ran by node.js

2021-2-20

*/

const sign = ["0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"];
const logger =require('../util/logger');

async function reactionAdd(messageReaction,user,guildData){
	if(user.bot) return;
	if(messageReaction.message.guild.id != guildData.Server) return;

	const indexId = sign.indexOf(messageReaction.emoji.name);
	const member = messageReaction.message.guild.members.cache.get(user.id);
	let roleName;

	if(indexId == -1) return;
	if(!member) return;
	
	if(messageReaction.message.id == guildData.MessageId.CompassPanel && indexId < guildData.CompassRank.length){
		await member.roles.add(guildData.CompassRank[indexId][1]);
		roleName = guildData.CompassRank[indexId][0];
		reply(rolename,messageReaction,"付与");
	};

	if(messageReaction.message.id == guildData.MessageId.GamerolePanel && indexId < guildData.Gamerole.length){
		await member.roles.add(guildData.Gamerole[indexId][1]);
		roleName = guildData.Gamerole[indexId][0];
		reply(rolename,messageReaction,"付与");
	};
}

async function reactionRemove(messageReaction,user,guildData){
	if(user.bot) return;
	if(messageReaction.message.guild.id != guildData.Server) return;

	const indexId = sign.indexOf(messageReaction.emoji.name);
	const member = messageReaction.message.guild.members.cache.get(user.id);
	let roleName;

	if(indexId == -1) return;
	if(!member) return;
		
	if(messageReaction.message.id == guildData.MessageId.CompassPanel && indexId < guildData.CompassRank.length){
		await member.roles.remove(guildData.CompassRank[indexId][1]);
		roleName = guildData.CompassRank[indexId][0];
		reply(rolename,messageReaction,"削除");
	};

	if(messageReaction.message.id == guildData.MessageId.GamerolePanel && indexId < guildData.Gamerole.length){
		await member.roles.remove(guildData.Gamerole[indexId][1]);
		roleName = guildData.Gamerole[indexId][0];
		reply(rolename,messageReaction,"削除");
	};
};


async function reply(roleName,messageReaction,processName){
	const reply = await messageReaction.message.channel.send({
			embed: {
			  description: `${roleName}の${processName}に成功しました。`,
			  footer: {
					  text: messageReaction.message.client.user.username,
					  icon_url: messageReaction.message.client.user.avatarURL()
					},
			  color: guildData.Color.succeeded,
			}
		});
	reply.delete({ timeout: 5000 });
}


exports.reactionAdd = reactionAdd;
exports.reactionRemove = reactionRemove;