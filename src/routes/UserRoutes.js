import express from 'express'
import * as UserController from '../controllers/UserController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', UserController.login)

router.post('/create', UserController.create)

router.put('/edit/:id', verifyToken, UserController.update)

router.get('/list', UserController.list)

router.get('/show/:id', UserController.show)

router.delete('/destroy/:id', verifyToken, UserController.destroy)

export default router
