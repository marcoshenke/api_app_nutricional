import mongoose from "mongoose";
const { Schema, model } = mongoose

const foodSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  grams: { type: Number, default: 100},
  kcal: { type: Number, required: true },
  kj: { type: Number, required: true },
  protein: { type: Number, required: true },
  lipids: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  dietary_fiber: { type: Number, required: true },
  sodium: { type: Number, required: true },
})

const Food = model('Food', foodSchema)

export default Food