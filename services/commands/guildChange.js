'use strict'

const joined = function (guild) {
    console.log(`I have joined: ${guild.name} (id: ${guild.id}).\n---`);
}

const removed = function (guild) {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id}).\n---`);
}

module.exports = {
    joined: joined,
    removed: removed
}