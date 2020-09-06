/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'  <= this
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -announce_new_member.js :CLASS  'announce new member'
 -ownerGive.js :CLASS  'give the owner role'
 
ran by node.js

2020-9-6

*/

const kickEvent = require('./kick.js');
const banEvent = require('./ban.js');
const ownerGive = require('./ownerGive.js');


class msgEvent {
    constructor(client,message,json) {
        this.client = client;
        this.message = message;
        this.json = json;
    }

    async msgEvent ([command, ...args]){
        const client = this.client;
        const message = this.message;
        const json = this.json;

        const kicke = new kickEvent(client,message,json);
        const bane = new banEvent(client,message,json);
        const ownerGivee = new ownerGive(client,message,json);


        switch(command){
            case "kick" :
                kicke.kick([command, ...args]);
                break;

            case "ban" :
                bane.ban([command, ...args]);
                break;

            case "owner" :
                ownerGivee.ownerGive([command, ...args]);
                break;

            case "reloadpanel" :
                break;
          }
    }
}

module.exports = msgEvent