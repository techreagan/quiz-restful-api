const express = require('express')
const { getCounts } = require('../controllers/counts')

const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.use(protect)
router.use(authorize('admin'))

router.route('/:model').get(getCounts)

module.exports = router
