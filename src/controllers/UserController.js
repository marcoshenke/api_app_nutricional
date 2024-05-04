import User from '../models/User.js'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const bcrypt = bcryptjs

const ObjectId = mongoose.Types.ObjectId

export const create = async (req, res) => {
  const {
    fullName,
    email,
    password: plainTextPassword,
    weight,
    height,
  } = req.body
  // encrypting our password to store in database
  const password = await bcrypt.hash(plainTextPassword, 10)
  try {
    // storing our user data into database
    const userAlreadyExists = await User.findOne({ email: email })
    if (userAlreadyExists) {
      throw 'E-mail already exists'
    }

    const response = await User.create({
      _id: new ObjectId(),
      fullName,
      email,
      password,
      weight,
      height,
    })
    return res
      .status(201)
      .json({ message: 'User created with success', object: response })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: 'error', error: error })
  }
}

export const update = async (req, res) => {
  const id = req.params.id
  const newData = req.body.params

  if (!ObjectId.isValid(id)) {
    return res.send('Invalid ID')
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    })

    if (!!user) {
      res
        .status(200)
        .json({ message: 'User edited successfully', object: user })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.log(error.stack)
    res
      .status(500)
      .send({ error: 'An error occurred when trying to edit the user' })
  }
}
