import express from 'express'
import refineIdea from './getIdea.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { query } = req.body

    if (!query) {
        return res.status(400).json({error: 'Missing query'})
    }

    try {
        const result = await refineIdea({ query })
        res.status(200).json({ result })
    } catch (err) {
        console.error("Server error:", err.message)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router


