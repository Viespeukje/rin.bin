'use strict'


const
    permissionConfig = require('../../permissionConfig') //Define roles are considered to match each permission level.


const isBotOwner = function (member) {
    if(member.id != permissionConfig.ownerID) return false;
    else return true;
}

const isOwner = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isOwner
        .includes(roles.name)
    );
}

const isAdmin = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isAdmin
        .includes(roles.name)
    );
}

const isMod = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isMod
        .includes(roles.name)
    );
}

const isStaff = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isStaff
        .includes(roles.name)
    );
}

const isGuide = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isGuide
        .includes(roles.name)
    );
}

const isOperator = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isOperator
        .includes(roles.name)
    );
}

const isKinkster = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isKinkster
        .includes(roles.name)
    );
}

const isKinkess = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isKinkess
        .includes(roles.name)
    );
}

const isLewdster = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isLewdster
        .includes(roles.name)
    );
}

const isInnocent = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isInnocent
        .includes(roles.name)
    );
}

const isUncharted = function (member) {
    return member.roles
    .some(roles=>permissionConfig.roles.isUncharted
        .includes(roles.name)
    );
}

const isUser = function (member) {
    //Check if the person being put in is a User. If they weren't, it never would have gotten here.
    return true;
}

module.exports = {
    isBotOwner: isBotOwner,
    isOwner: isOwner,
    isAdmin: isAdmin,
    isMod: isMod,
    isStaff: isStaff,
    isGuide: isGuide,
    isOperator: isOperator,
    isKinkster: isKinkster,
    isKinkess: isKinkess,
    isLewdster: isLewdster,
    isInnocent: isInnocent,
    isUncharted: isUncharted,
    isUser: isUser
}




// IGNORE -- Saving this in case I ever want to look back at it, but this stuff is handled more cleanly elsewhere now.


// //Function that outputs information to console about roles and if a user has those roles when fed either a role name or a role id.
// const isRole = function (message, checkname, checkid, dump) {
    
//     //Fetches ALL of the role properties identified by the id given. Dumps it if there is a third argument.
//     if (dump){
//         let myRole = message.guild.roles.get(checkid);
//         if (!myRole) return console.log(`${checkid} is likely not a valid role id. A valid role id is required.`);
//         console.log(myRole);
//     }
    
//     //Fetches ALL of the role that contains the 'name' field with checkname in it.
//     if (checkname){
//         let myRolename = message.guild.roles.find("name", checkname);
//         if(myRolename){
//             //Outputs just the name and id if the provided name is a valid role name.
//             console.log(`Data for role: ${myRolename.name} (${myRolename.id}) successfully fetched using the role name.`);

//             //Checks if the roles from the user that posted the message contain the specified role from the guild that the message was posted in, searched by name.
//             if(message.member.roles.has(myRolename.id)) console.log(`The author of that message had the ${myRolename.name} role. Checked by role name.`);
//             else console.log(`The author of that message did not have the ${myRolename.name} role. Checked by role name.`);
//         }
//         else console.log(`${checkname} is not a valid role in this guild.`);
//     }
    
//     //Fetches ALL of the role that contains the 'id' field with checkid in it.
//     if (checkid){
//         let myRoleid = message.guild.roles.find("id", checkid);
//         if(myRoleid){
//             //Outputs just the name and id if the provided name is a valid role id.
//             console.log(`Data for role: ${myRoleid.name} (${myRoleid.id}) successfully fetched using the role id.`);

//             //Checks if the roles from the user that posted the message contain the specified role from the guild that the message was posted in, searched by id.
//             if(message.member.roles.has(myRoleid.id)) console.log(`The author of that message had the ${myRoleid.name} role. Checked by role id.`);
//             else console.log(`The author of that message did not have the ${myRoleid.name} role. Checked by role id.`);
//         }
//         else console.log(`${checkid} is not a valid role in this guild.`);
//     }
// }
