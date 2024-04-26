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
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error', error: error })
  }
}
