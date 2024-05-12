import User from '../models/User.js'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import lodash from 'lodash'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const bcrypt = bcryptjs
const JWT_SECRET = process.env.JWT

const ObjectId = mongoose.Types.ObjectId

const { isUndefined } = lodash

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' })
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}

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
    return res.status(500).json({ status: 'error', error: error })
  }
}

export const update = async (req, res) => {
  const id = req.params.id
  const newData = req.body

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
    res
      .status(500)
      .send({ error: 'An error occurred when trying to edit the user' })
  }
}

export const list = async (req, res) => {
  const users = await User.find(req.body)
  if (!users) return res.status(404).json({ error: 'No user found' })

  res.status(200).send(users)
}

export const show = async (req, res) => {
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
    res.status(500).json({ error: error })
  }
}
