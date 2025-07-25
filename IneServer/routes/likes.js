import express from 'express'
import db from '../db.js'
const router = express.Router()

router.get('/events/liked', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT e.*, el.created_at as liked_at
            FROM events e
            INNER JOIN event_likes el ON e.id = el.event_id
            WHERE el.user_id = $1
            ORDER BY el.created_at DESC
        `, [23]);
        
        res.json({
            likedEvents: result.rows,
            count: result.rows.length
        });
    }
    catch(err) {
        res.status(500).json({ message: 'Could not fetch liked events', error: err.message });
    }
})

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

router.get('/events/:id/like-status', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(`select * from event_likes where user_id=$1 and event_id=$2`, [23, id]);
        const liked = result.rows.length > 0;
        res.json({ liked });
    }
    catch(err) {
        res.status(500).json({ message: 'Could not find like status', error: err.message });
    }
})

export default router