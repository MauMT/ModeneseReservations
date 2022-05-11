const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

// con la nueva implementación de horarios, este schema puede ser obsoleto
var horarioSchema = new Schema({
    
    diaSemana: {
        type: String,
        required: true,
        enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    },
    horaInicio: {
        type: Date,
        required: true
    },
    horaCierre: {
        type: Date,
        required: true,
    },
},
    { collection: 'Horarios' }
)

module.exports = model('Horario', horarioSchema);