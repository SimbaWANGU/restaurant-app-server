/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
})

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema)

export { FeedbackModel }
