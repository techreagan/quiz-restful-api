const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LeaderBoardSchema = new Schema(
  {
    totalScore: {
      type: Number,
      default: 0
      // required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'User is required'],
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('LeaderBoard', LeaderBoardSchema)
