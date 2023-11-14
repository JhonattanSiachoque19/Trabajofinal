const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    deleted: { type: Boolean, default: false } //por defecto cuando se crea el producto sea falso
},
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema, 'Products')

module.exports = Product