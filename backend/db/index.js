const mongoose = require('mongoose')
const Product = require('../models/product')
const dbConnect = (app) => {
    mongoose
        .connect(`mongodb+srv://mitjhons:${process.env.MONGO_DB_PASS}@development.bvl7byj.mongodb.net/stock-app?retryWrites=true&w=majority`
        ).then((result) => {
            const PORT = process.env.PORT || 4000

            app.listen(PORT, () => {
                console.log(`escuchando en el puerto ${PORT}`)
            })
            console.log('conexion exitosa la DDBB')
            // Product.updateMany({ $set: { deleted: false } }).then(res =>console.log(res)) // actualizar masivamente un campo de la db

        })
        .catch((err) => console.log(err))
}

module.exports = dbConnect