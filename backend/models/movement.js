const mongoose = require('mongoose')


const movementSchema = mongoose.Schema({
    type: String, //compra o venta
    quantity: Number,
    name: String,
    product: { type: mongoose.Schema.Types.ObjectId,ref:"Products" }, //id de mongodb
    deleted: { type: Boolean, default: false } //por defecto cuando se crea el Movemento sea falso
},
    { timestamps: true }
)

const Movement = mongoose.model("Movement", movementSchema)

module.exports = Movement