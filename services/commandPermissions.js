'use strict'

const 
    commandList = require('../commandList'),
    checkRoles = require('./tools/checkRoles')   

module.exports = (member, command) => {

    let permlevel = commandList[command].permissions;
    return checkRoles[permlevel](member);

}