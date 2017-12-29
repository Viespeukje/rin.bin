'use strict'

// Dependencies
const
    express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    app = express(),
    router = express.Router()

/**
 * Creates various API Endpointsø
 */
module.exports = () => {

    // 1. Middleware
    // Collection of nine smaller middleware functions that set security-related HTTP headers
    app.use(helmet())
    console.log(`Webserver Check 1 Passed.`)

    // Parse JSON
    app.use(bodyParser.json())
    console.log(`Webserver Check 2 Passed.`)

    // Mount the router to the app
    app.use('/', router)
    console.log(`Webserver Check 3 Passed.`)


    // 2. Routing
    // Index
    router.get('/', function (req, res) {
        res.send(`The service is running.`)
    })
    console.log(`Webserver Check 4 Passed.`)


    // 3. Start listening
    const server = app.listen(process.env.PORT || 5000)
    console.log(`Webserver Check 5 Passed.`)

    
    // 4. Server shutdown
    process.on('SIGTERM', function () {
        console.log(`Shutting down...`)
        server.close(function () {
            process.exit(0)
        })
    })
}