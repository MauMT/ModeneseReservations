const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var productoSchema = new Schema({
    
    nombreProducto: {
        type: Date,
        required: true,
    },
    imagen: {
        type: String,
    },
    precio: {
        type: Number,
    }
},
    { timestamps: true },
    { collection: 'Productos' }
)

module.exports = model('Producto', productoSchema);