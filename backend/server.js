require('dotenv').config()

const connectDB = require('./config/db');
connectDB();

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Kidney Compass API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})