'use strict'

const general = function (prefix, env, token) {
    return console.log('---\n' + prefix + ' (' + env + ' enviroment is active!)' + '\nToken: ' + token + '\n---');
}

const discord = function () {
    return console.log('Rin.bin is now online!');
}

module.exports = {
    general: general,
    discord: discord
}