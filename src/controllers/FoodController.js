import Food from '../models/Food.js'
import mongoose from 'mongoose'
import lodash from 'lodash'

const { isUndefined } = lodash

const ObjectId = mongoose.Types.ObjectId

export const create = (req, res) => {
  const name = req.body.name.toLowerCase()
  Food.find({ name: name })
    .exec()
    .then((food) => {
      if (food.length >= 1) {
        res.status(409).json({
          message: 'Food already exists',
        })
      } else {
        const food = new Food({
          _id: new ObjectId(),
          name: name,
          kcal: req.body.kcal,
          kj: req.body.kj,
          protein: req.body.protein,
          lipids: req.body.lipids,
          cholesterol: req.body.cholesterol,
          carbohydrate: req.body.carbohydrate,
          dietary_fiber: req.body.dietary_fiber,
          sodium: req.body.sodium,
          magnesium: req.body.magnesium,
          potassium: req.body.potassium,
          manganese: req.body.manganese,
          phosphor: req.body.phosphor,
          vitamin_c: req.body.vitamin_c,
          iron: req.body.iron,
          calcium: req.body.calcium,
          copper: req.body.copper,
          zinc: req.body.zinc,
          ashes: req.body.ashes,
          retinol: req.body.retinol,
          thiamine: req.body.thiamine,
          riboflavin: req.body.riboflavin,
          pyridoxine: req.body.pyridoxine,
          niacin: req.body.niacin,
          re: req.body.re,
          rae: req.body.rae,
          humidity: req.body.humidity,
        })
        food
          .save()
          .then((result) => {
            res.status(200).json({
              message: `Food ${result.name} register with sucess`,
            })
          })
          .catch((error) => {
            res.status(400).json({
              message: error.toString(),
            })
          })
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: 'An error occurred when trying to create food' })
    })
}

export const list = async (req, res) => {
  const foods = await Food.find(req.body)
  if (!foods) return res.send('No food found')

  res.send(foods)
}

export const show = async (req, res) => {
  const id = req.params.id

  if (!ObjectId.isValid(id) && !isUndefined(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const food = await Food.findOne({ _id: id })
  if (!food) return res.status(404).send({ message: 'No food found' })

  res.status(200).send(food)
}

export const update = async (req, res) => {
  const id = req.params.id
  const newData = req.body

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const food = await Food.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    })

    if (!!food) {
      res
        .status(200)
        .json({ message: 'Food edited successfully', object: food })
    } else {
      res.status(404).json({ message: 'Food not found' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred when trying to edit the food' })
  }
}

export const destroy = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) && !isUndefined(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const id = req.params.id

    const foodDeleted = await Food.findByIdAndDelete(id)

    if (!foodDeleted) {
      return res.status(404).json({ error: 'Food not found' })
    }

    res.json({ message: 'Food destroyed successfully' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
