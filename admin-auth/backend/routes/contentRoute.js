import express from 'express';
import { checkToken } from '../middlewares/CheckToken.js';
import { checkFileImages } from '../middlewares/CheckFileImages.js'
import { createContent } from '../controllers/CreateContentController.js';
import { getContents } from '../controllers/GetContentsController.js';
import { getContentById } from '../controllers/GetContentController.js';
import { updateContent } from '../controllers/PatchContentController.js';

const router = express.Router();

router.post(
    '/admin/categories/:id/create/content',
    checkToken,
    checkFileImages,
    createContent
)
router.get(
    '/admin/category/contents',
    checkToken,
    getContents
)
router.get(
    '/admin/category/contents/:id',
    checkToken,
    getContentById
)
// router.delete(
//     '/admin/category/contents/:id',
//     checkToken
//     //deleteCategory
// )

router.patch(
    '/admin/edit/categories/:categoryId/contents/:contentId',
    checkToken,
    checkFileImages,
    updateContent
)

export default router;