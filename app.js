import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import foodRouter from './src/routes/FoodRoutes.js'
import UserRoutes from './src/routes/UserRoutes.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

const JWT_SECRET = process.env.JWT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)
const mongoDB = process.env.CONNECTIONSTRING
main().catch((err) => console.log(err))
async function main() {
  console.log('connected to database')
  await mongoose.connect(mongoDB)
}

app.use('/foods', foodRouter)
app.use('/users', UserRoutes)

app.listen(3001, function () {
  console.log('server running on port 3001')
})

app.get('/', (req, res) => {
  res.send('Api App Salute is working')
})
