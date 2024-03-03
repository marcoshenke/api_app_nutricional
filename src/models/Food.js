import mongoose from "mongoose";

const foodSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  grams: { type: Number, default: 100},
  kcal: Number,
  kj: Number,
  protein: Number,
  lipids: Number,
  cholesterol: Number,
  carbohydrate: Number,
})

const Food = model('Food', foodSchema)

export default Food