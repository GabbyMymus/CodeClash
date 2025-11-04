require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('CodeClash backend running')
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})
