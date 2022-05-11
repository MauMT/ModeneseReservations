const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var productoSchema = new Schema({
    
    nombreProducto: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
    },
    precio: {
        type: Number,
        min: [0, 'El precio no puede ser negativo'],
    },
    descripcion: {
        type: String
    }
},
    { collection: 'Productos' },
    { timestamps: true }
)

module.exports = model('Producto', productoSchema);