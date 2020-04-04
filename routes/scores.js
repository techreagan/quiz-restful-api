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
    authorize('admin'),
    advancedResults(Score, [{ path: 'category' }, { path: 'user' }]),
    getScores
  )
  .post(authorize('user'), createScore)

router
  .route('/:id')
  .get(authorize('admin'), getScore)
  .delete(authorize('admin'), deleteScore)

router.route('/:id/category').get(getScoreByCategory)

module.exports = router
