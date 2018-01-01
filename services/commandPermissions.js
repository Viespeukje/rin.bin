'use strict'

// --- PERMISSIONS MANAGEMENT --- //

//  A user's roles and the command sent to the bot is checked against corresponding documents. 

//  If the user has one or more roles that match the ones with corresponding permission levels in permissionConfig.json,
//  then that user will pass the corresponding checkRoles.isROLE(member) check.

//  The command input is then taken from the first argument when the message input is broken up. The command is referenced in
//  commandList.json and this determines which check must be passed for commandPermissions(member, command) to return true.

// ------------------------------ //

const 
    commandList = require('../commandList'),
    checkRoles = require('./tools/checkRoles')   

module.exports = (member, command) => {

    // console.log(commandList.commands.find((cmd)=>{
    //     if(cmd.name === command) return cmd; 
    // }).permissions);

    //If a command input is sent to this file that does not match any in 
    if(!commandList.commands.find((cmd)=>{
            if(cmd.name === command) return cmd; 
        })){
            console.log(`You fucked up... something passed this file a command '${command}', which does not match anything in commandList.json. `)
            return false;
        }
    
    //If the permissions the user has do not match the permissions assigned to that command in commandList, this will return false.
    if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isBotOwner" && !checkRoles.isBotOwner(member)) return false;

    else if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isOwner" && !checkRoles.isOwner(member)) return false;

    else if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isAdmin" && !checkRoles.isAdmin(member)) return false;

    else if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isMod" && !checkRoles.isMod(member)) return false;

    else if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isStaff" && !checkRoles.isStaff(member)) return false;

    else if(commandList.commands
        .find((cmd)=>{
            if(cmd.name === command) return cmd; 
        }).permissions == "isGuide" && !checkRoles.isGuide(member)) return false;

    else return true;

}