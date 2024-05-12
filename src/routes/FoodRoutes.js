import express from 'express'
import * as FoodController from '../controllers/FoodController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', verifyToken, FoodController.create)

router.get('/list', FoodController.list)

router.get('/show/:id', FoodController.show)

router.put('/edit/:id', verifyToken, FoodController.update)

router.delete('/destroy/:id', verifyToken, FoodController.destroy)

export default router
