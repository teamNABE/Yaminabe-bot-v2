/*

created by huda0209
Yaminabe-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -kick.js :CLASS  'kick the member'  <= this
 -ban.js :CLASS  'ban the member'
 
ran by node.js

2020-9-6

*/

const kickEvent = require('./kick.js')
const banEvent = require('./ban.js')


class msgEvent {
    constructor(client,message,json) {
        this.client = client;
        this.message = message;
        this.json = json
    }

    async msgEvent ([command, ...args]){
        const client = this.client;
        const message = this.message;
        const json = this.json;

        const kicke = new kickEvent(client,message,json)
        const bane = new banEvent(client,message,json)


        switch(command){
            case "kick" :
                kicke.kick([command, ...args])
                break;

            case "ban" :
                bane.ban([command, ...args])
                break;

            case "owner" :
                break;

            case "reloadpanel" :
                break;
          }
    }
}

module.exports = msgEvent