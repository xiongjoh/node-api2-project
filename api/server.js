const express = require('express');
const server = express();

// import adopters

// add adopters and uses
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
    <h2>Comments Project</h2>
    `)
})

module.exports = server