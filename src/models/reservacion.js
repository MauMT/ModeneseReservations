const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

var reservacionSchema = new Schema({
    
    fecha: {
        type: Date,
        required: true,
    },
    nombreCliente: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Aceptada', 'Cerrada', 'Cancelada'],
        default: 'Pendiente',
    },
    numPersonas: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
    },
    numMesa: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
    },
},
    { timestamps: true },
    { collection: 'Reservaciones' }
)

module.exports = model('Reservacion', reservacionSchema);