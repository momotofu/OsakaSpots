const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || 9000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 9000}!`)
})
