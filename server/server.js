import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import connection from './configs/db.js'
import authRouter from './routes/auth.js'
import carRouter from './routes/cars.js'

const PORT = process.env.PORT || 7000

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(cors())
dotenv.config()
// Database Connetion
connection()
// Routes
app.use('/', authRouter)
app.use('/', carRouter)

app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))
