import express from 'express'
import { checkToken } from '../middlewares/CheckToken.js';
import { createCategory } from '../controllers/CreateCategoryController.js';
import { checkFileImage } from '../middlewares/CheckFileImage.js';
import { getCategories } from '../controllers/GetCategoriesController.js';
import { getCategoryById } from '../controllers/GetCategoryController.js';
import { updateCategory } from '../controllers/PatchCategoryController.js';

const router = express.Router();

router.post(
    '/admin/create/category',
    checkToken,
    checkFileImage,
    createCategory
)
router.get(
    '/admin/categories',
    checkToken,
    getCategories
)
router.get(
    '/admin/categories/:id',
    checkToken,
    getCategoryById
)
// router.delete(
//     '/admin/categories/:id',
//     checkToken
//     //deleteCategory
// )

router.patch(
    '/admin/edit/categories/:id',
    checkToken,
    checkFileImage,
    updateCategory
)

export default router;