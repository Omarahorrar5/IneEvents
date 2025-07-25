import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/schools', async (req, res) => {
    try {
        const result = await db.query('SELECT DISTINCT school, city FROM events ORDER BY school')
        res.json(result.rows)
    }
    catch (err) {
        res.status(500).json({ message: 'Could not get schools', error: err.message })
    }
})

export default router