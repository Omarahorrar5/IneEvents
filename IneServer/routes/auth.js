import express from 'express'
import db from 'db.js'

const router = express.Router()

//Register  
router.post('/register', async (res, req) => {
    const { username, email, password } = req.body 

    try {
        const exists = await db.query('select * from users where email = $1', [email])

        if (exists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists'})
        }

        await db.query('insert into users(username, email, password) values ($1, $2, $3)', [username, email, password])
        res.status(201).json({ message: 'User registered' })
    }

    catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message })
    }
})


//login
router.post('/login', async (res, req) => {
    const { email, password } = req.body

    try {
        const result = await db.query('select * from users where email = $1 and password = $2', [email, password])
    
        if (result.rows.length > 0) {
            res.json({ message: `Welcome, ${result.rows[0].username}` })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    }

    catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message })
    }
})


//users list
router.get('/users', async (req, res) => {
    try {
        const result = await db.query('select username, email from users')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ message: 'Could not get users', error: err.message })
    }
})

export default router