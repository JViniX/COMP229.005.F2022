const express = require('express')
const app = express()
const port = 3000

// Route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})