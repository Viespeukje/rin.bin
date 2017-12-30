'use strict'

module.exports = (client, message, prefix) => {

    //Rin's To-Do List
    console.log('TO DO: Make the help command only show commands the user can actually use.')
    //Maybe have a little bit of dialogue that says something like "as a ROLE you are able to use the following commands..."

    message.delete().catch(O_o=>{});

    console.log(message.author.username +' has been sent the help dialogue.');

    message.author.send({embed: {
        color: 3447003,
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
            value: "This command will cause me to delete your message and repeat it myself. \n*Moderator permissions required.*\n"
        },
        {
            name: prefix + "saycode",
            value: "This command will cause me to delete your message and repeat it myself inside a codebox. \n*Moderator permissions required.*\n"
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