/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'
 
ran by node.js

2020-10-30

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//class
const msgEvent = require('./class/msgEvent.js');
const anmEvent = require('./class/announce_new_member.js');

//config
let guildData = require('./config/guild/guildData.json');
const BOT_DATA = require('./config/setting.json');

//other 
const option = {ws: {intents: discord.Intents.ALL}, restTimeOffset: 10};
var json = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));

const client = new discord.Client(option);
const logger = require('./src/util/logger');
const configChecker = require('./src/util/config');


//start the bot
client.on("ready", message => {
  logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}\n`);
  //client.user.setActivity('Yaminabe-bot v2 Ver 2.1.1', { type: 'PLAYING' })
  //client.user.setActivity(process.env.ver, { type: 'PLAYING' })
  client.channels.cache.get(guildData.guild.OperationChannel.Gamerole).messages.fetch(guildData.guild.MessageId[1][1]);
  client.channels.cache.get(guildData.guild.OperationChannel.Compass).messages.fetch(guildData.guild.MessageId[0][1]);
});

//guild update event
client.on("guildUpdate", bot =>{
  guildData.guild.GuildName = bot.members.guild.name;
  fs.writeFileSync('./config/guild/guildData.json',JSON.stringify(guildData),'utf8');
  console.log("guildUpdate catch");
})

//message event
client.on("message", async message => {

  if (message.content.startsWith(BOT_DATA.PREFIX)){
    const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');
    if(command.toLowerCase() === "stop" &&(message.author.id === message.guild.ownerID || guildData.guild.Admin.indexOf(message.author.id)>-1)){
        logger.info(`server was stoped by {cyan}${message.author.tag}`);
        await message.delete();
        client.destroy();
        process.exit(0)};

    const msge = new msgEvent(client,message,json)
    msge.msgEvent([command, ...args])
  }
})


client.on('guildMemberAdd', member => {
  const anme = new anmEvent(client,json)
  anme.anm(member);
});


/*

client.on("guildMemberUpdate", async (olduser,newuser) =>{
  //announce_new_member.js 'announce new member'
  const anme = new anmevent(olduser,newuser,json)
  anme.anm()
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  //detect-reaction-rule.js 'detect to react the message for our server's rule'
  const drre = new detectteactionruleevent(messageReaction ,user, client, json)
  drre.drr()
})    
*/


configChecker.check(BOT_DATA);
let token;
if(process.argv.length>=3){
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
}else token = BOT_DATA.MAIN_TOKEN;
client.login(token);