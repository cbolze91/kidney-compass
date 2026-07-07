require('dotenv').config()

const connectDB = require('./config/db');
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const educationTopicRoutes = require('./routes/educationTopicRoutes');
const patientQuestionRoutes = require('./routes/patientQuestionRoutes');

const app = express()

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://6a4c684b942815137385a89b--kidney-compass-frontend.netlify.app',
    'https://kidney-compass-frontend.netlify.app'
  ],
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/topics', educationTopicRoutes);
app.use('/api/questions', patientQuestionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Kidney Compass API is running' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})