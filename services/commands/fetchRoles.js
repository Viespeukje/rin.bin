'use strict'

//None of this should really be needed any time soon, but all the same you can use these commands to get an array that contains the roles.



//Output paired rolename:roleid entries
//fetchRoles.paired(message.guild)
const paired = function (guild) {
    const rolePairs = [];
    guild.roles
        .forEach(function(key){
            rolePairs.push({
                name: key.name, 
                id:  key.id
            });
        });
    rolePairs.shift(); //Shift is used to remove @everyone
    return rolePairs;
}

//Output all role names on this server into an array
//fetchRoles.names(message.guild)
const names = function (guild) {
    const roleNames = [];
    guild.roles
        .forEach(function(key){
            roleNames.push(key.name);
        }); 
    roleNames.shift(); //Shift is used to remove @everyone
    return roleNames;
}

//Output all role ids on this server into an array.
//fetchRoles.ids(message.guild)
const ids = function (guild) {
    const roleIDs = [];
    guild.roles
        .forEach(function(key){
            roleIDs.push(key.id);
        }); 
    roleIDs.shift(); //Shift is used to remove @everyone
    return roleIDs;
}

module.exports = {
    paired: paired,
    names: names,
    ids: ids
}