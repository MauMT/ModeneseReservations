const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var ordenSchema = new Schema({
    
    fecha: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        enum: ['En preparación', 'Lista', 'Cancelada', 'Entregada'],
        default: 'En preparación',
    },
    total: {
        type: Number,
        min: [0, 'El total no puede ser negativo'],
    },
    nombreCliente: {
        type: String,
    },
    telefono: {
        type: String,
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
    }],
},
    { timestamps: true }
)

module.exports = model('Orden', ordenSchema);