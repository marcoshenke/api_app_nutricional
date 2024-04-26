import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
})

const User = model('User', userSchema)

export default User
