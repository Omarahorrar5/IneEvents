import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import likesRoutes from './routes/likes.js'
import registrationsRoutes from './routes/registrations.js'
import schoolsRoutes from './routes/schools.js'
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS properly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:80'],
  credentials: true
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', likesRoutes);
app.use('/api', registrationsRoutes);
app.use('/api', eventsRoutes);
app.use('/api', schoolsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});