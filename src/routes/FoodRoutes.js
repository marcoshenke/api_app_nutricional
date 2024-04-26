import express from 'express'
import * as FoodController from '../controllers/FoodController.js'

const router = express.Router()

router.post('/create', FoodController.create)

router.get('/list', FoodController.list)

router.get('/find', FoodController.find_one)

router.put('/edit/:id', FoodController.update)

router.delete('/delete/:id', FoodController.destroy)

export default router
