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
        res.status(500).json({
          error: 'An error occurred'
        })
      }
      passport.authenticate('local')(req, res, () => {
        res.status(200).json({
          username: req.body.username,
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
        res.status(200).json({
          username: req.body.username,
          message: 'You have access'
        })
      })
    })
  } catch (err) {
    res.status(500).json({
      lmao: 'An error occurred'
    })
  }
})

export { authRouter }
