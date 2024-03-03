import express from 'express'
import * as FoodController from '../controllers/FoodController.js'

const router = express.Router();

router.post('/create', FoodController.create)

export default router