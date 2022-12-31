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
  const user = {
    username: req.body.username,
    email: req.body.email
  }
  User.register(
    new User(user),
    req.body.password,
    (err: any, user: any) => {
      if (err instanceof Error) {
        res.json({
          error: err.message
        })
      }
      passport.authenticate('local')(req, res, () => {
        res.json({
          username: req.body.username,
          email: req.body.email,
          message: 'You have created a new account'
        })
      })
    }
  )
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
