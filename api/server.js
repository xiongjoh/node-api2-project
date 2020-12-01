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
        const newPostId = await db.insert(clientPost)
        const newPost = await db.findById(newPostId.id)
        res.status(201).json(newPost)
    }
    catch(error) {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    }
    
})
server.post('/api/posts/:id/comments', async (req, res) => {
    const { id } = req.params
    const { text } = req.body

    if (!text) {
        res.status(400).json({errorMessage:"Please provide text for the comment."})
        return
    }

    // needs fixing, not displaying comment by Id
    try {
        const test = await db.findCommentById(5)
        console.log(test)
        const myPost = await db.findById(id)
        if (myPost.length === 0) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
            return
        } 
        const addComment = await db.insertComment(req.body)
        if (addComment) {
            console.log(addComment.id)
            const myComment = db.findCommentById(addComment.id)
            console.log(myComment)
            res.status(201).json(myComment)
        }
    }
    catch {
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    }

})
server.get('/api/posts', async (req, res) => {

    try {
        const dbPosts = await db.find()
        res.json(dbPosts)
    }
    catch(error) {
        res.status(500).json({error:"The posts information could not be retrieved"})
    }
})
server.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params

    try {
        const post = await db.findById(id)
        
        if (post.length === 0) {
            res.status(404).json({error:`The post with the specified ID does not exist. ${id}`})
            return
        }
        else {
            res.status(200).json(post)
        }
    }
    catch {
        res.status(500).json({error:"The post information could not be retrieved."})
    }
})
server.get('/api/posts/:id/comments', async (req, res) => {
    const { id } = req.params


    try {
        const checkedPost = await db.findById(id)

        if(checkedPost.length > 0) {
            const postComments = await db.findPostComments(id)
            res.json(postComments)
        }
        else {
            res.status(404).json({message:"The post with the specified ID does not exist."})
        }
    }
    catch {
        res.status(500).json({error: "The comments information could not be retrieved."})
    }
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