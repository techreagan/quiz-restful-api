const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc    Get counts
// @route   GET /api/v1/counts/:model
// @access  Private/Admin
exports.getCounts = asyncHandler(async (req, res, next) => {
  const models = ['Category', 'LearderBoard', 'Question', 'Score', 'User']

  if (!models.includes(req.params.model)) {
    return next(new ErrorResponse(`Something went wrong, check params`))
  }
  const Model = require(`../models/${req.params.model}`)

  const counts = await Model.countDocuments()

  res.status(200).json({ success: true, data: { counts } })
})
