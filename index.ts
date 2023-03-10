/* eslint-disable @typescript-eslint/no-var-requires */
import { authRouter } from './src/routes/auth'
import { feedbackRouter } from './src/routes/feedback'
import { reservationRouter } from './src/routes/reservation'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

// initialize app
const app = express()
const port = 3000

// middleware
const mongoUrl = process.env.MONGODB_URL as string
const secret = process.env.SECRET as string
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

try {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('MongoDB connected')
} catch (err) {
  console.log(err)
}

// routes
app.use('/', authRouter)
app.use('/reserve', reservationRouter)
app.use('/feedback', feedbackRouter)

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
