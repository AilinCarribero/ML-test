const express = require('express')
const app = express()
const cors = require('cors')

app.disabled('x-powered-by')

app.use(express.json())
app.use(cors())
require("dotenv").config()

app.use('/api/items', require('./src/routers/ItemsRoute'))

const PORT = process.env.PORT ?? 1200

app.listen(PORT, () => {
    console.log(`El server se encuentra en el puerto ${PORT}`)
})