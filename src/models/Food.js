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
  magnesium: { type: Number, required: true },
  potassium: { type: Number, required: true },
  manganese: { type: Number, required: true },
  phosphor: { type: Number, required: true },
  vitamin_c: { type: Number, required: true },
  iron: { type: Number, required: true },
  calcium: { type: Number, required: true },
  copper: { type: Number, required: true },
  zinc: { type: Number, required: true },
  ashes: { type: Number, required: true },
  retinol: { type: Number, required: true },
  thiamine: { type: Number, required: true },
  riboflavin: { type: Number, required: true },
  pyridoxine: { type: Number, required: true },
  niacin: { type: Number, required: true },
  re: { type: Number, required: true },
  rae: { type: Number, required: true },
  humidity:{
    type: Number,
    min: 0,
    max: 100,
    required: true
}
})

const Food = model('Food', foodSchema)

export default Food