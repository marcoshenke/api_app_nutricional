import express from 'express'
import * as FoodController from '../controllers/FoodController.js'

const router = express.Router()

router.post('/create', FoodController.create)

router.get('/list', FoodController.list)

router.get('/find', FoodController.find)

router.put('/edit/:id', FoodController.update)

router.delete('/destroy/:id', FoodController.destroy)

export default router
