'use strict'

const
    checkRoles = require('./tools/checkRoles')

module.exports = (member, command) => {

    let permlevel = command;
    return checkRoles[permlevel](member);

}