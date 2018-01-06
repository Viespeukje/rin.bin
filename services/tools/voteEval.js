'use strict'

const guideMute = function (reaction, voteInfo) {
    if(reaction.emoji.name == "👍" && reaction.count >= voteInfo.toPass) return "pass";
    else if(reaction.emoji.name == "👎" && reaction.count >= voteInfo.toFail) return "fail";
    else return "pending";
}

module.exports = {
    guideMute: guideMute
}