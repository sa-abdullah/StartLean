import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { askGroq } from '../src/pages/getIdea.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/ask', async (req, res) => {
    const { query } = req.body

    if (!query) {
        return res.status(400).json({error: 'Missing query'})
    }

    try {
        const result = await askGroq(query)
        res.json({ result })
    } catch (err) {
        console.error("Server error:", err.message)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})