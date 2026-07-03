require('dotenv').config()

const connectDB = require('./config/db');
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');

const app = express()

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Kidney Compass API is running' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})