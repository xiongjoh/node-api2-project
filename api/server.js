const express = require('express');
const server = express();

const db = require('../data/db')

// import routers
const postsRouter = require('./posts-router')

// add adopters and uses
server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Comments Project</h2>
    `)
})

module.exports = server