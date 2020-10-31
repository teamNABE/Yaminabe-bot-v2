/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -announce_new_member :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'
 -rolePanel.js :CLASS  'reload a role panel and give some some roles'  <= this
 
ran by node.js

2020-9-6

*/

const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


class rolePanel {
    constructor(client,json) {
        this.client = client;
        this.json = json
    }

    async reloadPanel (message){
        const client = this.client;
        const json = this.json;


        var runData
        var messageData

        switch (message.channel.id) {
            case json.guild.OperationChannel.Gamerole:
              runData = ["GameRole", "ゲームロール", json.guild.Gamerole]
              messageData = [json.guild.OperationChannel.Gamerole, json.guild.MessageId[1][1]]
              break;

            case json.guild.OperationChannel.Compass:
              runData = ["CompassRole", "コンパスランク", json.guild.CompassRank]
              messageData = [json.guild.OperationChannel.Compass, json.guild.MessageId[0][1]]

            default:
              return;
        }


        if((message.channel.id === messageData[0])){
            if(!message.member.roles.cache.get(json.guild.Roles.Admin))
                return message.channel.send({
                          embed: {
                            title: "実行する権限がありません。",
                            color: json.guild.Color.failed,
                            footer: {
                                  text: client.user.username,
                                  icon_url: client.user.avatarURL()},
                            timestamp: new Date()
                          }
                        });
            console.log("messageData[0]" + messageData[0])       
            var msg = await client.channels.cache.get(messageData[0]).messages.fetch(messageData[1])
            var text =(`**${runData[0]}**\nリアクションを押すことで役職が付きます。\n${letter[0][0]} : ${runData[2][0][0]}\n`);
            msg.react(letter[0][1]);
            for(var i=1; i<runData[2].length; i++){
                text = (text + letter[i][0] +" : " +runData[2][i][0]+"\n");
                msg.react(letter[i][1]);
            };
            msg.edit(text);
            message.delete(); 
        };
    }       
}

module.exports = rolePanel