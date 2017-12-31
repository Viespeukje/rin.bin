'use strict'

module.exports = (client, message, prefix) => {

    console.log(message.author.username +' has been sent the help dialogue.');

   message.author.send({embed: {
        color: 15844367,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Hello! I'm Rin.bin!",
        description: "Basically I'm Rin's attempt at a chat bot and a project to learn some NodeJS. My commands are as follows...\n",
        fields: [
        {
            name: prefix + "help",
            value: "I hope you know how this one works considering you opened this menu.\n"
        },
        {
            name: prefix + "gems",
            value: "This command will cause me to post a primer on how gems on the server work. \n*Guide permissions required.*\n"
        },
        {
            name: prefix + "warn",
            value: "This command is used to warn the first user mentioned after the command. If no users are mentioned, it will fail. If more than one user is mentioned, the link will be generated for the first one only.\n*Moderator permissions required.*\n"
        },
        {
            name: prefix + "say",
            value: "This command will cause me to delete your message and repeat it myself. The command *saycode* will put the text in a codebox.\n*Moderator permissions required.*\n"
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

// POSSIBLE COLORS IN DISCORD

// DEFAULT: 0,
// AQUA: 1752220,
// GREEN: 3066993,
// BLUE: 3447003,
// PURPLE: 10181046,
// GOLD: 15844367,
// ORANGE: 15105570,
// RED: 15158332,
// GREY: 9807270,
// DARKER_GREY: 8359053,
// NAVY: 3426654,
// DARK_AQUA: 1146986,
// DARK_GREEN: 2067276,
// DARK_BLUE: 2123412,
// DARK_PURPLE: 7419530,
// DARK_GOLD: 12745742,
// DARK_ORANGE: 11027200,
// DARK_RED: 10038562,
// DARK_GREY: 9936031,
// LIGHT_GREY: 12370112,
// DARK_NAVY: 2899536