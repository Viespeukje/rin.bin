//BinRin.bin Version 1.0


// Load up the discord.js library
const Discord = require("discord.js");

// This is your client.This is what is referred to when you say 'client.something' or 'bot.something' but it could be anything.
const client = new Discord.Client();

// Loading the config.json file that contains our token and our prefix values. 
const config = require("./config.json");

// config.token contains the bot's token
// config.prefix contains the message prefix.

// This event will run if the bot starts, and logs in, successfully.
client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	client.user.setGame(`with her fluffy tail`);
});

// This event triggers when the bot joins a guild.
client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// this event triggers when the bot is removed from a guild.
client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on('messageReactionAdd', (reaction, user) => {
   // reaction.message.channel.send(`The emoji used is ${reaction.emoji}`);
});

client.on('messageReactionRemove', (reaction, user) => {
   // reaction.message.channel.send(`The emoji removed is ${reaction.emoji}`);
});





client.on("message", async message => {
	// This event will run on every single message received, from any channel or DM.
	
	// Ignore all messages sent by bots, including itself.
	if(message.author.bot) return;
	
	// Ignore anything that does not start with the config.prefix prefix.
	if(message.content.indexOf(config.prefix) !== 0) return;
	
	// This set of commands breaks up the message into a collection "args"
	// Slice takes the message content and cuts off the arguments corresponding to the length of the config.prefix
	// Trim cleans up any and all spaces
	// Split makes an array out of the string.
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g); 

	// shift removes the first element of an array and then toLowerCase changes it to lower case.
	const command = args.shift().toLowerCase();






	//Basic bot documentation comamnd
	if(command === "help") {

		//Report to the console that someone called the command.
		console.log(message.author.username +' has been sent the help dialogue.');

		message.delete().catch(O_o=>{});
		message.author.send({embed: {
		    color: 3447003,
		    author: {
		      name: client.user.username,
		      icon_url: client.user.avatarURL
		    },
		    title: "Hello! I'm BinRin.bin!",
		    description: "Basically I'm Rin's attempt at a chat bot and a project to learn some JavaScript. My commands are as follows...\n",
		    fields: [
		    {
		        name: config.prefix + "help",
		        value: "I hope you know how this one works considering you opened this menu.\n"
		    },
		    {
		    	name: config.prefix + "say",
		        value: "This command will cause me to delete your message and repeat it myself. \n*Moderator permissions required.*\n"
		    },
		    {
		        name: config.prefix + "warn",
		        value: "This command is used to warn the first user mentioned after the command. If no users are mentioned, it will fail. If more than one user is mentioned, the link will be generated for the first one only.\n*Moderator permissions required.*\n"
		    },
		    {
		        name: config.prefix + "warnings",
		        value: "This command will provide a link to a spreadsheet that displays all warnings recorded using Rin's recording system.\n*Moderator permissions required.*\n"
		    },
		    {
		        name: config.prefix + "playing",
		        value: "This command is used to change my current 'now playing' message.\n*Bot owner only.*\n"
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



	//Simple command to allow users with the appropriate permissions to speak using the bot.
	if(command === "say") {

		message.delete().catch(O_o=>{}); 
		const sayMessage = args.join(" ");  	// To get the "message" itself we join the `args` back into a string with spaces: 
		
		//Block of code to delete and then ignore the command if someone without the appropriate roles tries to use it.
		if(!message.member.roles.some(r=>["Admin", "Moderator", "Bot Testing"].includes(r.name)) ){ 
			console.log(message.author.username +' attempted to make me say \"'+sayMessage+'\". Failed due to lack of permissions.');
			return; 
		}

		message.channel.send(sayMessage);
	}

	if(command === "playing") {
		
		if(message.author.id !== config.ownerid){  //Rin's user id 129052371702513664
			message.delete().catch(O_o=>{});
			console.log(message.author.username +' attempted to change my now playing message. Failed due to lack of permissions.');
			message.author.send("You aren't Rin... 😡");
			return; 
		}

		else{
			const playingmessage = args.join(" ");
			message.delete().catch(O_o=>{});
			client.user.setGame(playingmessage);
			message.author.send("I changed my now playing message to \"Playing "+playingmessage+".\"");
		}

	}

	//Command to warn the first user mentioned in the message and send it to a prefilled google forms form.
	if(command === "warn") {

		//Delete the message
		message.delete().catch(O_o=>{}); 

		//Establishes mentioned user
		var member = message.mentions.users.first();

		//If the user lacks the appropriate role, fail.
		if(!message.member.roles.some(r=>["Admin", "Moderator", "Bot Testing"].includes(r.name)) ){
			console.log(message.author.username +' attempted to generate a warning link for a user. Failed due to lack of permissions.');
			message.author.send("YOU DON'T HAVE ENOUGH ~~BADGES~~ ROLES TO TRAIN ME!");
			return;
		}

		//If var member is "falsy" and no users are mentioned, fail immediately.
		if(!member){
			message.delete().catch(O_o=>{}); 
			console.log(message.author.username +' attempted to generate a warning link for a null user.');
			message.author.send("Please mention a valid member of this server.");
			return;
		}

		//Establishes the author of the message and the id of the member
		var staffmember = message.author;
		var memberID = member.id;

		//Establishes Date Variables
		var d = new Date();
		let dayvar = d.getDate();
		let monthvar = d.getMonth()+1; //Had to add a +1 because getMonth() returns 0-11
		let yearvar = d.getFullYear();

		//Getting usernames that aren't IDs to put in the table
		var staffstring = staffmember.username +'%23'+ staffmember.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.
		var memberstring = member.username +'%23'+ member.discriminator; //"%23" is replaced in the URL by a # for the purposes of the form.

		//Otherwise, send the appropriate link.
		if(member){
			//message.channel.send(' Staff Member: ' + staffstring + ' Target: ' + memberstring + ' TargetID: ' + memberID + ' Day: ' + yearvar+'-'+monthvar+'-'+dayvar);
			console.log(message.author.username +' generated a warning link for user '+ member.username +'#'+ member.discriminator + '.');
			message.author.send('Prefilled Link for User: ' + member.username + '\n\nhttps://docs.google.com/forms/d/e/1FAIpQLSc3ceOm39F1fdJq8VkmWEsJJW3rHXawaHoejP9G34xgX9GP4w/viewform?usp=pp_url&entry.640187248=' + memberstring + '&entry.867163136=' + memberID + '&entry.687949428=' + staffstring + '&entry.692760464=' + yearvar + '-' + monthvar + '-' + dayvar + '&entry.1364186442');
		}
	}

	if(command === "warnings") {

		//Delete the message
		message.delete().catch(O_o=>{}); 

		//If the user lacks the appropriate role, fail.
		if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) ){
			console.log(message.author.username +' tried to access the warning list. Failed due to insufficient permissions.');
			message.author.send("You aren't allowed to see that!");
			return;
		}
		else{
			console.log(message.author.username +' accessed the warning list.');
			message.author.send("https://docs.google.com/spreadsheets/d/1PBd2cgpxZE9LdWqeEi39VY_2FOxGHPaGNy0l0bxs1i8/edit?usp=sharing");
		}
	}




//WIP voting system based on emoji reactions.

	// if(command === "vote") {
	// 		message.channel.send("THIS IS A TEST!")
 //         	.then(function (message) {
 //            	message.react("👍")
 //             	message.react("👎")
	// 		})
 //         	.catch(function() {
	// 			message.delete(); 
 //            });
	// }
	


//Stuff I don't really care about this bot being able to do right now.

// if(command === "ping") {
	// 	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
	// 	// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
	// 	const m = await message.channel.send("Ping?");
	// 	m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	// }

	// if(command === "kick") {
	// 	// This command must be limited to mods and admins. In this example we just hardcode the role names.
	// 	// Please read on Array.some() to understand this bit: 
	// 	// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
	// 	if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) )
	// 		return message.reply("Sorry, you don't have permissions to use this!");
		
	// 	// Let's first check if we have a member and if we can kick them!
	// 	// message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
	// 	let member = message.mentions.members.first();
	// 	if(!member)
	// 		return message.reply("Please mention a valid member of this server");
	// 	if(!member.kickable) 
	// 		return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
		
	// 	// slice(1) removes the first part, which here should be the user mention!
	// 	let reason = args.slice(1).join(' ');
	// 	if(!reason)
	// 		return message.reply("Please indicate a reason for the kick!");
		
	// 	// Now, time for a swift kick in the nuts!
	// 	await member.kick(reason)
	// 		.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
	// 	message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

	// }
	
	// if(command === "ban") {
	// 	// Most of this command is identical to kick, except that here we'll only let admins do it.
	// 	// In the real world mods could ban too, but this is just an example, right? ;)
	// 	if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
	// 		return message.reply("Sorry, you don't have permissions to use this!");
		
	// 	let member = message.mentions.members.first();
	// 	if(!member)
	// 		return message.reply("Please mention a valid member of this server");
	// 	if(!member.bannable) 
	// 		return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

	// 	let reason = args.slice(1).join(' ');
	// 	if(!reason)
	// 		return message.reply("Please indicate a reason for the ban!");
		
	// 	await member.ban(reason)
	// 		.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
	// 	message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	// }
	
	// if(command === "purge") {
	// 	// This command removes all messages from all users in the channel, up to 100.
		
	// 	// get the delete count, as an actual number.
	// 	const deleteCount = parseInt(args[0], 10);
		
	// 	// Ooooh nice, combined conditions. <3
	// 	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
	// 		return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
		
	// 	// So we get our messages, and delete them. Simple enough, right?
	// 	const fetched = await message.channel.fetchMessages({count: deleteCount});
	// 	message.channel.bulkDelete(fetched)
	// 		.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	// }
});

client.login(config.token);