const path = require('path')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Score = require('../models/Score')
const Category = require('../models/Category')

// @desc    Get scores
// @route   GET /api/v1/scores
// @access  Private/Admin
exports.getScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single score
// @route   GET /api/v1/score/:id
// @access  Private/Admin
exports.getScore = asyncHandler(async (req, res, next) => {
  const score = await Score.findById(req.params.id)

  if (!score) {
    return next(new ErrorResponse(`No score with that id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: score })
})

// @desc    Create score
// @route   POST /api/v1/scores/
// @access  Private/Admin
exports.createScore = asyncHandler(async (req, res, next) => {
  // let score = await Score.findOne({ category: req.body.category, user: req.body.user })

  // let score = await Score.updateOne({category: req.body.category, user: req.body.user}, {score: })

  // if (score) {
  //   return next(new ErrorResponse('Title already exists', 400))
  // }

  // let score = await Score.findByIdAndUpdate(req.params.id, req.body, {
  //   runValidators: true,
  //   new: true
  // })

  if (!req.body.category) {
    return next(new ErrorResponse(`Category is required`, 404))
  }

  if (!req.body.score) {
    return next(new ErrorResponse(`Score is required`, 404))
  }

  const category = await Category.findById(req.body.category)

  if (!category) {
    return next(
      new ErrorResponse(`No category with that id of ${req.params.id}`)
    )
  }

  let score = await Score.findOneAndUpdate(
    { category, user: req.user.id },
    { score: req.body.score },
    { upsert: true, new: true, runValidators: true }
  )

  if (!score) {
    return next(new ErrorResponse(`Something went wrong`, 500))
  }

  res.status(200).json({ success: true, data: score })
})

// @desc    Delete score
// @route   DELETE /api/v1/scores/:id
// @access  Private/Admin
exports.deleteScore = asyncHandler(async (req, res, next) => {
  const score = await Score.findByIdAndDelete(req.params.id)

  if (!score) {
    return next(new ErrorResponse(`No score with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: score })
})
