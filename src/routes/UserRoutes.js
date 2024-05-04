import express from 'express'
import * as UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/create', UserController.create)

router.put('/edit/:id', UserController.update)

router.get('/list', UserController.list)

router.get('/find/:id', UserController.find)

router.delete('/destroy/:id', UserController.destroy)

export default router
