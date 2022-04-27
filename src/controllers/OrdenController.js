const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Orden = require('../models/orden');
const HttpError = require('../models/http-error');

const crearOrden = async(req, res, next) => {
    console.log(req);
    const {fecha, estado, nombreCliente, telefono, productos} = req.body;

    /* total = { $reduce: {
        input: '$items', initialValue: 0,
        in: { $sum : ["$$value",
          { $multiply: ["$$this.price",
            "$$this.quantity"] }
        ] } } } */

    const createdOrder = new Orden({
        fecha: fecha,
        estado: estado,
        /* total: total, */
        nombreCliente: nombreCliente,
        telefono: telefono,
        productos: productos
    });

    try {
        await createdOrder.save();
    } catch (error) {
        console.log(error);
        return next(
            new HttpError('Error al crear reservación', 500)
        );
    }

    res.status(201).json({ reservacion: createdReservation});
}

module.exports = {
    crearOrden: crearOrden
}