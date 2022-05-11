const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');


//horarioDefinido: 1-> 13:00-15:00, 2-> 15:00-17:00, 3-> 17:00-19:00, 4-> 19:00-21:00, 5-> 21:00-23:00
// falta asignar el rango del número de mesas
var reservacionSchema = new Schema({
    
    fecha: {
        type: Date,
        required: true,
    },
    horarioDefinido: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
        enum: {values: [1, 2, 3, 4, 5], message: '{VALUE} no es un horario definido válido'},
    },
    nombreCliente: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: {values: ['Pendiente', 'Aceptada', 'Cerrada', 'Cancelada'], message: '{VALUE} no es un estado válido'},
        default: 'Pendiente',
    },
    numPersonas: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
        min: [1, 'Se requiere de al menos una persona'],
        max: [10, 'No pueden haber reservaciones de más de 10 personas'],
    },
    numMesa: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
    },
},
    { collection: 'Reservaciones' },
    { timestamps: true }
    
)

module.exports = model('Reservacion', reservacionSchema);