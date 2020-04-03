const express = require('express')
const {
  getScore,
  getScores,
  getScoreByCategory,
  createScore,
  deleteScore
} = require('../controllers/scores')

const Score = require('../models/Score')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)
// router.use()

router
  .route('/')
  .get(
    advancedResults(Score, [{ path: 'category' }, { path: 'user' }]),
    getScores
  )
  .post(createScore)

router
  .route('/:id')
  .get(getScore)
  .delete(authorize('admin'), deleteScore)

router.route('/:id/category').get(getScoreByCategory)

module.exports = router
