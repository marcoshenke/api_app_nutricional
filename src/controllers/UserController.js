import User from '../models/User.js'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import lodash from 'lodash'

const bcrypt = bcryptjs

const ObjectId = mongoose.Types.ObjectId

const { isUndefined } = lodash

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

export const list = async (req, res) => {
  const users = await User.find(req.body.params)
  if (!users) return res.status(404).json({ error: 'No user found' })

  res.status(200).send(users)
}

export const find = async (req, res) => {
  const id = req.params.id

  if (!ObjectId.isValid(id) && !isUndefined(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const user = await User.findOne({ _id: id })
  if (!user) return res.status(404).send({ message: 'No user found' })

  res.status(200).send(user)
}

export const destroy = async (req, res) => {
  const id = req.params.id
  if (!ObjectId.isValid(id) && !isUndefined(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const userDeleted = await User.findByIdAndDelete(id)

    if (!userDeleted) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'User destroyed successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
