'use strict'

//Require other files that hold functions/function managing files
const addNumber = require('./commands/addNumber')
const addOne = require('./commands/addOne')

//Define functions to be executed as constants within this file
const finalOutput = function (input, input1, input2) {
    return addNumber(input, input1) + addOne(input2)
}

//Determine what would be allowed as possible output. Below would allow for more than one possible function.
module.exports = {
    finalOutput: finalOutput //This would be referenced with commandManager.finalOutput(input, input1, input2)
}

//Determine what would be allowed as possible output. Below would have this function called by name in app.js
//module.exports = finalOutput //This would be referenced with finalOutput(input, input1, input2)
