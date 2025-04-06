import express from 'express'
import { postUser, loginUser, privateRoute, checkToken } from '../controllers/userAuthController.js';

const router = express.Router();

//esse posta usuario
router.post(
    '/admin/auth',
    (req, res) => postUser(req, res)
)

//faz o login e autenticacao
router.post(
    '/admin/auth/login',
    (req, res) => loginUser(req, res)
)

//rota privada
router.get(
    '/admin/user/:id',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => privateRoute(req, res)
)

export default router;