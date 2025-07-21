import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/events/:id/like', async (req, res) => {
    try {
        const { id } = req.params;

        const alreadyLiked = await db.query(`select * from event_likes where user_id=$1 and event_id=$2`, [23, id])

        if (alreadyLiked.rows.length > 0) {
            //unlike 
            await db.query(`delete from event_likes where user_id=$1 and event_id=$2`, [23, id])

            res.json({ liked: false, message: 'Event unliked' });
        }

        else {
            //like
            await db.query(`insert into event_likes (user_id, event_id) values ($1, $2)`, [23, id])

            res.json({ liked: true, message: 'Event liked' })
        }
    }

    catch (err) {
        res.status(500).json({ message: 'Could not like event', error: err.message });
    }
})

export default router