'use strict'

const joined = function (guild) {
    console.log('\x1b[34m%s\x1b[0m', `I have joined: ${guild.name} (id: ${guild.id}).\n---`);
}

const removed = function (guild) {
    console.log('\x1b[34m%s\x1b[0m', `I have been removed from: ${guild.name} (id: ${guild.id}).\n---`);
}

module.exports = {
    joined: joined,
    removed: removed
}