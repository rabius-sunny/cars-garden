import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './routes/auth.js'
import connection from './configs/db.js'

const PORT = process.env.PORT || 7000

const app = express()

// Middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Database Connetion
connection()

// Routes
app.use('/', authRouter)

app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))
