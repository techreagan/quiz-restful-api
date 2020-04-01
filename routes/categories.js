const express = require('express')
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  categoryPhotoUpload
} = require('../controllers/categories')

const Category = require('../models/Category')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router.use(protect)
// router.use()

router
  .route('/')
  .get(advancedResults(Category, [{ path: 'questions' }]), getCategories)
  .post(createCategory)

router
  .route('/:id')
  .get(getCategory)
  .put(authorize('admin'), updateCategory)
  .delete(authorize('admin'), deleteCategory)

router.route('/:id/photo').put(authorize('admin'), categoryPhotoUpload)

module.exports = router
