require("dotenv").config();
import express, { Request, Response} from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

//initialize app
const app = express();
const port = 3000;

//middleware
const mongo_url = process.env.MONGODB_URL as string
const secret = process.env.SECRET as string
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

try {
  mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('MongoDB connected')
} catch (err) {
  console.log(err)
}


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
