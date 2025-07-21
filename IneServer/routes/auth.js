import express from 'express'
import db from '../db.js'
import bcrypt from 'bcrypt'

const router = express.Router()

//Register  
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body // <-- this receives the object sent by axios

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const exists = await db.query('select * from users where email = $1', [email])

        if (exists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists'})
        }

        await db.query('insert into users(username, email, password) values ($1, $2, $3)', [username, email, hashedPassword])
        res.status(201).json({ message: '✅ User registered' })
    }

    catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message })
    }
})

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {

        const result = await db.query('select * from users where email = $1', [email])

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }

        const user = result.rows[0]

        //compare plain password to hashed password
        const match = await bcrypt.compare(password, user.password)

        if (match) {
            res.json({ message: `Welcome ${user.username}` })
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }

    }

    catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message })
    }
})

//resetpassword
router.post('/resetpassword', async (req, res) => {
    const { email, newpassword } = req.body

    try {
        const result = await db.query('select * from users where email = $1', [email])
    
        if (result.rows.length > 0) {
            //hash the new password
            const hashedPassword = await bcrypt.hash(newpassword, 10)

            await db.query('update users set password = $1 where email = $2', [hashedPassword, email])
            res.json({ message: '✅ Password Successfully Reset' })
        } 
        else {
            res.status(401).json({ message: 'Invalid Email' })
        }
    }

    catch (err) {
        res.status(500).json({ message: 'Reset Failed', error: err.message })
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