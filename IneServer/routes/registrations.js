import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/events/:id/register', async (req, res) => {
    try {
        const { id } = req.params;

        const alreadyRegistered = await db.query(`select * from event_registrations where user_id=$1 and event_id=$2`, [23, id])

        if (alreadyRegistered.rows.length > 0) {
            //unregister 
            await db.query(`delete from event_registrations where user_id=$1 and event_id=$2`, [23, id])

            res.json({ registered: false, message: 'Event unregistered' });
        }

        else {
            //register
            await db.query(`insert into event_registrations (user_id, event_id) values ($1, $2)`, [23, id])

            res.json({ registered: true, message: 'Event registered' })
        }
    }

    catch (err) {
        res.status(500).json({ message: 'Could not register for event', error: err.message });
    }
})

router.get('/events/:id/registration-status', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(`select * from event_registrations where user_id=$1 and event_id=$2`, [23, id]);

        const registered = result.rows.length > 0;

        res.json({ registered });
    }

    catch(err) {
        res.status(500).json({ message: 'Could not find registration status', error: err.message });
    }
})

export default router