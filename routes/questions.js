const express = require('express')
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questions')

const Question = require('../models/Question')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)
// router.use()

router
  .route('/')
  .get(advancedResults(Question), getQuestions)
  .post(authorize('admin'), createQuestion)

router
  .route('/:id')
  .get(getQuestion)
  .put(authorize('admin'), updateQuestion)
  .delete(authorize('admin'), deleteQuestion)

module.exports = router
