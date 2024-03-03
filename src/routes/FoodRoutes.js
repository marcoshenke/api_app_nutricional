import express from 'express'
import FoodController from 'controllers/FoodController'

const router = express.Router();

router.post('create-food', FoodController.create)

export default router