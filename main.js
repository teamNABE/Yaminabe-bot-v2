/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'  <= this
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanel.js :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-18

*/

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

//config
let guildData = configChecker.getConfig();
const BOT_DATA = configChecker.getBotData();


//start the bot
client.on("ready", message => {
  	logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}\n`);
  	//client.user.setActivity('Yaminabe-bot v2 Ver 2.1.1', { type: 'PLAYING' })
  	//client.user.setActivity(process.env.ver, { type: 'PLAYING' })
  	client.channels.cache.get(guildData.OperationChannel.Gamerole).messages.fetch(guildData.MessageId.GamerolePanel);
	client.channels.cache.get(guildData.OperationChannel.Compass).messages.fetch(guildData.MessageId.CompassPanel);
});

//guild update event
client.on("guildUpdate", bot =>{
  	guildData.guild.GuildName = bot.members.guild.name;
  	fs.writeFileSync('./config/guild/guildData.json',JSON.stringify(guildData),'utf8');
  	console.log("guildUpdate catch");
})

//message event
client.on("message", async message => {

  	if(message.content.startsWith(BOT_DATA.PREFIX)){
    	const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');	
    	commandHandler.commandHandler([command, ...args],message,guildData,BOT_DATA,client);
  	}
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
	reaction.reactionAdd(messageReaction,user,guildData);
})


client.on("messageReactionRemove", async(messageReaction ,user) =>{
	reaction.reactionRemove(messageReaction,user,guildData);
})


client.on('guildMemberAdd', member => {
	anmEvent.announce_new_member(member,guildData);
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