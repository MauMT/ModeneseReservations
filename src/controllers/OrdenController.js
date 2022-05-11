//const { validationResult } = require('express-validator');

//const jwt = require('jsonwebtoken');

const Orden = require('../models/orden');
const HttpError = require('../models/http-error');
const ProductoController = require('./ProductoController');
const Producto = require('../models/producto');

//hace falta calcular el total de la orden
const crearOrden = async(req, res, next) => {
    console.log(req);
    const {fecha, nombreCliente, telefono, productos} = req.body;

    const createdOrder = new Orden({
        fecha: fecha,
        nombreCliente: nombreCliente,
        telefono: telefono,
        productos: productos
    });

    aux = getFrequency(createdOrder.productos);
    
    acum = []
    for(key in aux){
        //key guarda el id
        //aux[key] guarda la cantidad
        let producto;
        try {
            producto = await Producto.findById(key);
        } catch (error) {
            return next(
                new HttpError('No se encontró la orden', 500)
            );
        }
        acum.push(producto.precio * aux[key]);
    }
    
    //sum all elements of the array
    createdOrder.total = acum.reduce((a, b) => a + b, 0);

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

const getOrdenes = async(req, res, next) => {
    let ordenes;
    try {
        ordenes = await Orden.find();
    } catch (error) {
        return next(
            new HttpError('No se encontraron ordenes', 500)
        );
    }
    res.status(200).json({ ordenes: ordenes });
}


const getOrderProducts = async(req, res, next) => {
    //const orderId = req.params.orderId;
    const orderId = req.body.orderId;
    let order;
    try{
    order = await Orden.findById(orderId);
    } catch (error) {
        return next(
            new HttpError('No se encontró la orden', 500)
        );
    }
    
    res.status(200).json({ productos: order.productos });
} 

// get the frequency of each element,  OBJECT NESTING NOT SUPPORTED
function getFrequency(arr) {
    var freq = {};
    for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        freq[num] = (freq[num] || 0) + 1;
    }
    return freq;
}

module.exports = {
    crearOrden: crearOrden,
    getOrderProducts: getOrderProducts,
    getOrdenes: getOrdenes
}