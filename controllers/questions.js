const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Question = require('../models/Question')
const Category = require('../models/Category')

// @desc    Get questions
// @route   GET /api/v1/questions
// @access  Private/Admin
exports.getQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single question
// @route   GET /api/v1/questions/:id
// @access  Private/Admin
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id)

  if (!question) {
    return next(
      new ErrorResponse(`No question with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ success: true, data: question })
})

// @desc    Create question
// @route   POST /api/v1/questions/
// @access  Private/Admin
exports.createQuestion = asyncHandler(async (req, res, next) => {
  let question = await Question.findOne({ question: req.body.question })

  if (question) {
    return next(new ErrorResponse('Question already exists', 400))
  }

  const category = await Category.findById(req.body.category)

  if (!category) {
    return next(
      new ErrorResponse(`No category with id of ${req.body.category}`)
    )
  }

  if (req.body.type === 'tf') delete req.body.options

  question = await Question.create({
    ...req.body,
    user: req.user.id
  })

  res.status(200).json({ success: true, data: question })
})

// @desc    Update Question
// @route   PUT /api/v1/questions/:id
// @access  Private/Admin
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })

  if (!question) {
    return next(new ErrorResponse(`No question with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: question })
})

// @desc    Delete question
// @route   DELETE /api/v1/questions/:id
// @access  Private/Admin
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id)

  if (!question) {
    return next(new ErrorResponse(`No question with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: question })
})
