const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const cors = require('cors');
const app = express();
dotenv.config();
connectDB();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
app.set('trust proxy', 1);
app.use(cors({
  origin: 'http://localhost:5173', // <-- Your Vite frontend
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(express.json({ limit: '10kb' }));
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api', submissionRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.BASE_URL || 5000}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the ServerLessForm API');
});

