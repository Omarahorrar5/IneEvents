import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import likesRoutes from './routes/likes.js';
import registrationsRoutes from './routes/registrations.js';
import schoolsRoutes from './routes/schools.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',  // Allow all origins
  credentials: true
}));

app.use(express.json());

// Health check endpoints
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'IneEvents Backend' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', authRoutes);
app.use('/api', likesRoutes);
app.use('/api', registrationsRoutes);
app.use('/api', eventsRoutes);
app.use('/api', schoolsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});