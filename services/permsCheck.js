'use strict'

const isBot = function (message) {
    //Fetches ALL of the role properties identified by the id given.
    let myRole = message.guild.roles.get("395713855260590083");
    console.log(myRole); //Dumps all of it.
    
    //Fetches ALL of the role that contains the 'name' field with 'Bot' in it.
    let myRolename = message.guild.roles.find("name", "Bot");
    console.log(`Data for role: ${myRolename.name} (${myRolename.id}) successfully fetched using the role name.`); //Dumps just the name and id.

    //Fetches ALL of the role that contains the 'id' field with '395713855260590083' in it.
    let myRoleid = message.guild.roles.find("id", '395713855260590083');
    console.log(`Data for role: ${myRoleid.name} (${myRoleid.id}) successfully fetched using the role id.`); //Dumps just the name and id.

    //Checks if the roles from the user that posted the message contain the specified role from the guild that the message was posted in, searched by name.
    if(message.member.roles.has(myRolename.id)) console.log(`The author of that message had the Bot role. Checked by name.`);
    else console.log(`The author of that message did not have the Bot role. Checked by name`);
    
    //Checks if the roles from the user that posted the message contain the specified role from the guild that the message was posted in, searched by id.
    if(message.member.roles.has(myRoleid.id)) console.log(`The author of that message had the Bot role. Checked by id.`);
    else console.log('The author of that message did not have the Bot role. Checked by id.');
}


module.exports = {
    // isBotOwner: isBotOwner,
    // isOwner: isOwner,
    // isAdmin: isAdmin,
    // isMod: isMod
    // isStaff: isStaff,
    // isGuide: isGuide,
    isBot : isBot
}

//TO DO
// 1. Change isRoles to isRoles.js file
// 2. Check needed roles against owned roles (isRoles.js) for each possible function (isMod, isAdmin, isOwner, isBotOwner, isMuted, isStaff(isMod+isAdmin), etc.)
// 3. Output all results as a boolean e.g. permsCheck.isAdmin(non admin user) = false