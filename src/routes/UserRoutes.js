import express from 'express'
import * as UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/create', UserController.create)

export default router
