import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/events', async (req, res) => {
    try {
        const result = await db.query('select * from events')
        res.json(result.rows)
    }

    catch (err) {
        res.status(500).json({ message: 'Could not get events', error: err.message })
    }
})

export default router