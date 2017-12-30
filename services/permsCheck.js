'use strict'

const isRoles = function (member) {
    console.log(`${member.roles} are the roles belonging to ${member.username}.`);
}

module.exports = {
    // isBotOwner: isBotOwner,
    // isOwner: isOwner,
    // isAdmin: isAdmin,
    // isMod: isMod,
    // isStaff: isStaff,
    // isGuide: isGuide,
    isRoles : isRoles
}

// 1. Change isRoles to isRoles.js file
// 2. Check needed roles against owned roles (isRoles.js) for each possible function (isMod, isAdmin, isOwner, isBotOwner, isMuted, isStaff(isMod+isAdmin), etc.)
// 3. Output all results as a boolean