import express from 'express'
// import refineIdea from './getIdea.js'
import { askGroq } from './groq.js'
import  { Idea } from './dataModel.js'
import verifyToken from './firebase.js'

const router = express.Router()

router.post('/ideas', verifyToken, async (req, res) => {
    const { query } = req.body

    if (!query) {
        return res.status(400).json({error: 'Missing query'})
    }

    try {
        const aiResponse = await askGroq(query)
        if (!aiResponse) {
            return res.status(500).json({error: 'Failed to get a reponse from Groq'})
        }
        
        const newChat = new Idea({
            idea: query, 
            aiResponse, 
            createdAt: Date.now(), 
            userId: req.user.uid || null
        })
        await newChat.save()

        return res.status(201).json(newChat)

    } catch (err) {
        console.error("Server error:", err.message)
        return res.status(500).json({ error: 'Internal server error' })
    }
})



router.get('/ideas', verifyToken, async (req, res)  => {
    try {
        const ideas = await Idea.find({ userId: req.user.uid}).sort({ createdAt: -1 })
        res.status(200).json(ideas)
    } catch (err) {
        console.error('Error fetching ideas:', err.message)
        res.status(500).json({ error: 'Failed to retrieve ideas' })
    }
})

export default router


