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
router.use(authorize('admin'))

router
  .route('/')
  .get(advancedResults(Category), getCategories)
  .post(createCategory)

router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)

router.route('/:id/photo').put(categoryPhotoUpload)

module.exports = router
