require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const openaiRouter = require('./routes/openai')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/openai', openaiRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
