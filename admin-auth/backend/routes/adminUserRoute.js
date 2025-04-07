import express from 'express'
import { postAdmin } from '../controllers/AdminUserController.js';
import { loginAdmin } from '../controllers/AdminAuthController.js';
import { privateRoute } from '../controllers/PrivateRouteController.js';
import { checkToken } from '../controllers/CheckToken.js';

const router = express.Router();
//usado uma unica vez
router.post(
    '/admin/register',
    (req, res) => postAdmin(req, res)
)
router.get(
    '/admin/auth',
    (req, res) => loginAdmin(req, res)
)
router.use(
    '/admin/private',
    (req, res, next) => checkToken(req, res, next)
)
router.get(
    '/admin/private/:id',
    (req, res) => privateRoute(req, res)
)
// router.get('/admin/private/config', configAdmin)
// router.post('/admin/private/settings', settingsAdmin)
export default router