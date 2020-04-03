const asyncHandler = require('../middleware/async')

// @desc    Get learderboard
// @route   GET /api/v1/leardboard
// @access  Private
exports.getLeaderBoard = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})
