/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -punish.js :module
 -ownerGive.js :module
 -rolePanelReload.js :module  <= this
 -roleEdit.js  :module
 -announce_new_member :module
 -reaction.js :module
 
ran by node.js

2021-2-26

*/

const logger = require("../../util/logger");
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]];

async function reloadPanel([command, ...args],message,guildData){
    let runData;
    let messageData;
    switch (message.channel.id){
        case guildData.OperationChannel.Gamerole:
          	runData = ["GameRole", "ゲームロール", guildData.Gamerole];
          	messageData = [guildData.OperationChannel.Gamerole, guildData.loadMessage.GamerolePanel.messageId];
          	break;
        case guildData.OperationChannel.Compass:
          	runData = ["CompassRole", "コンパスランク", guildData.CompassRank];
          	messageData = [guildData.OperationChannel.Compass, guildData.loadMessage.CompassRankPanel.messageId];
        default:
            logger.info(`reserved "${command} ${args[0]}", but there isn't a rolePanel in the channel which send message.`);
          	return;
    };

    if((message.channel.id == messageData[0])){
        if(!message.member.roles.cache.get(guildData.Roles.Admin)){
            await message.channel.send({
                    embed: {
                        title: "実行する権限がありません。",
                        color: guildData.Color.failed,
                        footer: {
                            text: message.client.user.username,
                            icon_url: message.client.user.avatarURL()},
                    timestamp: new Date()
                   }
            });
            logger.info(`reserved "${command} ${args[0]}", but user didn't have permission.`);
            return;
 };

        console.log("messageData[0]" + messageData[0]);
        let msg = await message.client.channels.cache.get(messageData[0]).messages.fetch(messageData[1]);
        let text =(`**${runData[0]}**\nリアクションを押すことで役職が付きます。\n${letter[0][0]} : ${runData[2][0][0]}\n`);
        msg.react(letter[0][1]);
        for(let i=1; i<runData[2].length; i++){
            text = (text + letter[i][0] +" : " +runData[2][i][0]+"\n");
            msg.react(letter[i][1]);
        };
        msg.edit(text);
        message.delete();
        logger.info(`reserved "${command} ${args[0]}", suceeded to edit rolePanel content.`);
    };
};


exports.reloadPanel = reloadPanel;