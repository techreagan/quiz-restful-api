const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      minlength: [3, 'Question must three characters long'],
      required: [true, 'Question is required'],
      unique: true
    },
    answer: {
      type: String,
      required: [true, 'Answer is required']
    },
    type: {
      type: String,
      enum: ['tf', 'mc', 'image'],
      required: [true, 'Type is required']
    },
    options: {
      type: Array,
      validate: {
        validator: function(v) {
          return this.type != 'tf' ? v && v.length > 0 : true
        },
        message: 'Options is required and must be a string of array'
      }
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Question', QuestionSchema)
