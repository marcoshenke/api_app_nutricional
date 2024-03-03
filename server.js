import express from 'express'
const app = express()

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

