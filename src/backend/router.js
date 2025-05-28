import express from 'express'
import refineIdea from './getIdea.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { description } = req.body

    if (!description) {
        return res.status(400).json({error: 'Missing query description'})
    }

    try {
        const result = await refineIdea({ description})
        res.status(200).json({ result })
    } catch (err) {
        console.error("Server error:", err.message)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router


