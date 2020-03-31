const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScoreSchema = new Schema(
  {
    score: {
      type: Number,
      default: 0
      // required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'User is required'],
      ref: 'User'
    },
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Score', ScoreSchema)
