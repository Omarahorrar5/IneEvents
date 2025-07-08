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

router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await db.query('select * from events where id = $1', [id])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' })
        }
        
        res.json(result.rows[0])
    }
    
    catch (err) {
        res.status(500).json({ message: 'Could not get event', error: err.message })
    }
})

export default router