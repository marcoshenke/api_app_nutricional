import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import foodRouter from './src/routes/FoodRoutes.js'

dotenv.config()

const app = express()

mongoose.set("strictQuery", false);
const mongoDB = process.env.CONNECTIONSTRING
main().catch((err) => console.log(err));
async function main() {
  console.log('connected to database')
  await mongoose.connect(mongoDB);
}

app.use('/food', foodRouter)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000, function() {
  console.log('server running on port 3000')
})

app.get('/', (req, res) => {
  res.send('Hello, world')
})

app.post('/create-food', (req, res) => {
  console.log(req.body)
})

