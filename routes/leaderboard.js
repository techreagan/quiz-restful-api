const express = require('express')
const { getLeaderBoard } = require('../controllers/leaderboard')

const LeaderBoard = require('../models/LeaderBoard')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)
// router.use()

router
  .route('/')
  .get(advancedResults(LeaderBoard, [{ path: 'user' }]), getLeaderBoard)

module.exports = router
