import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  password: String,
  email: String
})

userSchema.plugin(passportLocalMongoose)
const userModel = mongoose.model('User', userSchema)

export { userModel }
