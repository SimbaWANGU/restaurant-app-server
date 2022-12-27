import { Router, Request, Response } from 'express'
import passport from 'passport'
import { userModel as User } from '../models/User'

// initialize router
const authRouter = Router()

passport.use(User.createStrategy())

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id)
})

passport.deserializeUser((id: number, done: Function) => {
  try {
    const user = User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

authRouter.post('/auth/register', (req: Request, res: Response) => {
  try {
    User.register({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }, req.body.password
    )
    passport.authenticate('local')(req, res, () => {
      res.json({
        username: req.body.username,
        message: 'You have created a new account'
      })
    })
  } catch (err) {
    console.log(err)
    res.json({
      err
    })
  }
})

authRouter.post('/auth/login', (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  try {
    req.login(user, () => {
      passport.authenticate('local')(req, res, () => {
        res.json({
          username: req.body.username,
          message: 'You have access',
          status: 200
        })
      })
    })
  } catch (err) {
    res.json({
      lmao: 'You\'re not in'
    })
  }
})

export { authRouter }
