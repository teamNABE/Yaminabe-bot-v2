/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'  <= this
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanelReload.js :module
 -roleEdit.js  :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/
'use strict'

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//module
const commandHandler = require('./src/command-handler.js');
const anmEvent = require('./src/event/announce_new_member');
const reaction = require("./src/event/reaction");

//other 
const option = {ws: {intents: discord.Intents.ALL}, restTimeOffset: 10};
const client = new discord.Client(option);
const logger = require('./src/util/logger');
const configChecker = require('./src/util/config');
const { cookie } = require('request');

//config
let guildData = configChecker.getConfig();
const BOT_DATA = configChecker.getBotData();


//start the bot
client.on("ready", message => {
  	logger.info(`{green}${BOT_DATA.NAME}{reset} is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}\n`);
  	client.user.setActivity(`Yaminabe-bot v2 Ver ${BOT_DATA.VERSION}`, { type: 'PLAYING' })

	for (const key in guildData.loadMessage) {
		if(guildData.loadMessage.length<1) break;
		const element = guildData.loadMessage[key];
		client.channels.cache.get(element.channelId).messages.fetch(element.messageId);		
	};

});

//message event
client.on("message", async message => {
  	if(message.content.startsWith(BOT_DATA.PREFIX)){
    	const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');	
    	commandHandler.commandHandler([command, ...args],message,guildData,BOT_DATA);
  	}
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
	reaction.reactionAdd(messageReaction,user,guildData);

	console.log(messageReaction.emoji.name);

	if(user.id == guildData.Members.Suzuki && messageReaction.emoji.name=="thx"){
		
	}


})


client.on("messageReactionRemove", async(messageReaction ,user) =>{
	reaction.reactionRemove(messageReaction,user,guildData);
})


client.on('guildMemberAdd', member => {
	anmEvent.announce_new_member(member,guildData);
});

client.on('voiceStateUpdate', async(oldState, newState)=>{
	
	const voiceChannel = newState.channel? newState.channel : null;

	if(!voiceChannel) return;
	let channel;

	for(const key in guildData.VoiceCHLink){
		if(guildData.VoiceCHLink.length<1) break;

		const element = guildData.VoiceCHLink[key];
		if(guildData.VoiceCHLink[key].voiceCH != voiceChannel.id) continue;
		channel = client.channels.cache.get(element.msgCH);
	};

	if(!channel) return;

	channel.channel//よくわからない
});


let token;
if(process.argv.length == 3){
  	switch(process.argv[2]){
  	  	case "main" :
  	    	token = BOT_DATA.MAIN_TOKEN;
  	    	break;
  	  	case "div" :
  	    	configChecker.divCheck(BOT_DATA);
  	    	token = BOT_DATA.DIV_TOKEN;
  	    	BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
  	    	break;
  	  	default :
  	    	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
  	    	process.exit(0);
  	};
}else if(process.argv.length == 2){
	token = BOT_DATA.MAIN_TOKEN;
}else{
	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
	process.exit(0);
}
client.login(token);