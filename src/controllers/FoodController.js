import Food from '../models/Food.js'
import mongoose from 'mongoose'
import lodash from 'lodash'

const {isUndefined} = lodash

const ObjectId = mongoose.Types.ObjectId

export const create = (req, res) => {
  const name = req.body.name.toLowerCase()
  Food.find({name: name})
      .exec()
      .then((food) => {
        if (food.length >= 1) {
          res.status(409).json({
            message: "Food already exists"
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
          })
          food.save()
              .then((result) => {
                console.log(`Food ${result.name} register with sucess`)
                res.status(200).json({
                  message: `Food ${result.name} register with sucess`
                })
              })
              .catch((error) => {
                console.log(`Error to register food: ${error}`)
                res.status(400).json({
                  message: error.toString()
                })
              })
        }
      }).catch((error) => {
        console.log(`Error when find for food ${req.body.name}: ${error}`)
      })
}

export const list = async (req, res) => {
  const foods = await Food.find(req.body.params)
  if (!foods) return res.send("No food found")

  res.send(foods)
}

export const find_one = async (req, res) => {
  if (!ObjectId.isValid(req.body.id) && !isUndefined(req.body.id)) {
    return res.send('Invalid ID')
  }

  const food = await Food.findOne(req.body.params)
  if (!food) return res.send("No food found")

  res.send(food)
}

export const update = async (req, res) => {
  const id = req.body.id
  const newData = req.body.params

  if (!ObjectId.isValid(id)) {
    return res.send('Invalid ID')
  }

  console.log(id, newData)

  try {
    const result = await Food.updateOne({ _id: id }, newData);

    console.log(result)

    if (result.matchedCount === 1) {
      res.send('Food edited successfully');
    } else {
      res.send('Food not found');
    }
  } catch (error) {
    res.send('Error: ', error);
  }
  
}

