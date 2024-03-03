import Food from 'models/Food'

const create = (req, res) => {
  Food.find({name: req.body.name})
      .exec()
      .then((food) => {
        if (food.length >= 1) {
          res.status(409).json({
            message: "Food already exists"
          })
        } else {
          const food = new Food({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            kcal: req.body.kcal,
            kj: req.body.kj,
            protein: req.body.protein,
            lipids: req.body.lipids,
            cholesterol: req.body.cholesterol,
            carbohydrate: req.body.carbohydrate,
          })
          food.save()
              .then((result) => {
                console.log(`Food ${result.name} register with sucess`)
              })
              .catch((error) => {
                console.log(`Error to register food: ${error}`)
                res.status(400).json({
                  message: error.toString()
                })
              })
        }
      }).catch((error) => {
        console.log(`Error when find for food ${req.body.name}`)
      })
}

export default {
  create
}