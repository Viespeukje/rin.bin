'use strict'

module.exports = (client, message, prefix) => {

    //Report to the console that someone called the command.
    console.log(`${message.author.username} has posted the gem dialogue.`);

    message.channel.send({embed: {
        color: 15844367,
        author: {
            icon_url: "https://images.emojiterra.com/mozilla/512px/1f48e.png",
             name: " A primer on Gems!\n\n"
        },
        fields: [
        {
            name: "\n\nWhat exactly are gems anyway?",
            value: "Gems are a currency that can be exchanged with other users on the server or traded in to get vanity ranks.\n"
        },
        {
            name: "How do I get gems?",
            value: "Gems can be earned by roleplaying, chatting, or posting images in the image boards. Different channels have different gem gains, however.\n\nMain Chat: 0.01 gems per post.\nGeneral RP Channels: 0.02 gems per word.\nCasual RP Channels: 0.02 gems per post.\nLongform RP Channels: 0.02 gems per word.\nPrivate RP Channels: 0.02 gems per word.\nPorn Image Channels: 0.05 gems per image. Max 20 per channel per hour.\n"
        },
        // {
        // 	name: "How do I get gems?",
        //     value: "Gems can be earned by roleplaying, chatting, or posting images in the image boards. Different channels have different gem gains, however.\n\n**Main Chat**: 0.01 gems per post.\n**General RP Channels**: 0.02 gems per word.\n**Casual RP Channels**: 0.02 gems per post.\n**Longform RP Channels**: 0.02 gems per word.\n**Private RP Channels**: 0.02 gems per word.\n**Porn Image Channels**: 0.05 gems per image. Max 20 per channel per hour.\n"
        // },
        {
            name: "What do vanity ranks do?",
            value: "They look pretty, mostly. However any rank higher than Innocent gains access to the #selfies channel.\n"
        },
        {
            name: "How do I upgrade my vanity rank?",
            value: "Go to the #bot_commands channel and type: ``/upgrade``\n"
        },
        {
            name: "How much do the ranks cost?",
            value: "An exact amount can be found posted in the #bot_commands channel.\n"
        },
        {
            name: "How do I give someone gems?",
            value: "Go to the #bot_commands channel and type: ``/give @username GemNumber``\n"
        },
        {
            name: "Why can I not trade gems?",
            value: "Both parties in an exchange must be at least Tempted rank.\n"
        }
        ],
        //timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "I've been a good girl, right..?"
        }
      }
    });
}