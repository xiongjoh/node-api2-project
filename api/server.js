const express = require('express');
const server = express();

const db = require('../data/db')

// import adopters

// add adopters and uses
server.use(express.json())

server.post('/api/posts', async (req, res) => {
    const clientPost = req.body

    if(!clientPost.title || !clientPost.contents) {
        res.status(400).json({message:'Please include title and contents'})
        return
    }
    try {
        const newPost = await db.insert(clientPost)
        res.status(201).json(newPost)
    }
    catch(error) {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    }
    
})
server.post('/api/posts/:id/comments', (req, res) => {

})
server.get('/api/posts', (req, res) => {

})
server.get('/api/posts/:id', (req, res) => {

})
server.get('/api/posts/:id/comments', (req, res) => {

})
server.delete('/api/posts/:id', (req, res) => {

})
server.put('/api/posts/:id', (req, res) => {

})

server.get('/', (req, res) => {
    res.send(`
    <h2>Comments Project</h2>
    `)
})

module.exports = server