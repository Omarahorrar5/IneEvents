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

router.post('/events/create', async (req, res) => {
    try {
        const {title, description, image_path, type, school, city, date, organizer} = req.body
        
        const result = await db.query(`insert into events (title, description, image_path, type, school, city, date, organizer) 
            values ($1,$2,$3,$4,$5,$6,$7,$8);`, [title, description, image_path, type, school, city, date, organizer])

        res.status(201).json({ message: 'Event created successfully', event: result.rows[0] })
    }

    catch(err) {
        res.status(500).json({ message: 'Could not create event'})
    }
})

router.post('/events/update/:id', async (req, res) => {
    try {
        const { id } = req.params

        const {title, description, image_path, type, school, city, date, organizer} = req.body

        const result = await db.query(`update events set title = $1, description = $2, image_path = $3, type = $4, school = $5,
            city = $6, date = $7, organizer = $8 where id = $9`, 
            [title, description, image_path, type, school, city, date, organizer, id])
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Event not found or not updated' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: result.rows[0] });
    }

    catch (err) {
        res.status(500).json({ message: 'Could not update event', error: err.message });
    }
})

router.post('/events/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(`DELETE FROM events WHERE id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Event not found or already deleted' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    }
    
    catch (err) {
        res.status(500).json({ message: 'Could not delete event', error: err.message });
    }
});


export default router