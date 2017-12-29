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
    
    // Parse JSON
    app.use(bodyParser.json())

    // Mount the router to the app
    app.use('/', router)

    // 2. Routing
    // Index
    router.get('/', function (req, res) {
        res.send(`The service is running.`)
    })

    // 3. Start listening
    const server = app.listen(process.env.PORT || 5000)
    
    console.log('My webserver is running properly.\n---')

    // 4. Server shutdown
    process.on('SIGTERM', function () {
        console.log(`Shutting down...`)
        server.close(function () {
            process.exit(0)
        })
    })
}