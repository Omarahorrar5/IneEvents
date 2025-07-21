import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import likesRoutes from './routes/likes.js'
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Accept JSON requests

app.use('/api', authRoutes); // Use /api/register, /api/login, /api/users...
app.use('/api', eventsRoutes); // Use /api/events
app.use('/api', likesRoutes); // Use likes api

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
