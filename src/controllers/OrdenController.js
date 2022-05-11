//const { validationResult } = require('express-validator');

//const jwt = require('jsonwebtoken');

const Orden = require('../models/Orden');
const HttpError = require('../models/http-error');

//hace falta calcular el total de la orden
const crearOrden = async(req, res, next) => {
    console.log(req);
    const {fecha, nombreCliente, telefono, productos} = req.body;

    /* total = { $reduce: {
        input: '$items', initialValue: 0,
        in: { $sum : ["$$value",
          { $multiply: ["$$this.price",
            "$$this.quantity"] }
        ] } } } */

    const createdOrder = new Orden({
        fecha: fecha,
        nombreCliente: nombreCliente,
        telefono: telefono,
        productos: productos
    });

    try {
        await createdOrder.save();
    } catch (error) {
        console.log(error);
        return next(
            new HttpError('Error al crear orden', 500)
        );
    }

    res.status(200).json({ createdOrder: createdOrder});
}
/* 
const getOrderProducts = async(req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Orden.findById(orderId);
    if (!order) {
        return next(new HttpError('No se encontró la orden', 404));
    }
    res.json({ order: order });
} */

module.exports = {
    crearOrden: crearOrden
}