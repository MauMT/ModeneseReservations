const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Producto = require('../models/producto');
const Orden = require('../models/orden');


const crearProducto = async(req, res, next) => {
    const {nombreProducto, imagen, precio, descripcion} = req.body;

    const createdProduct = new Producto({
        nombreProducto: nombreProducto,
        imagen: imagen,
        precio: precio,
        descripcion: descripcion
    })

    
    try {
        await createdProduct.save();
    } catch (error) {
        return next(
            new HttpError('Creating product failed!', 500)
        );
    }

    res.status(200).json({producto: createdProduct});
}

//verificarcomo obtener el id
const agregarProductoOrden = async(req, res, next) => {
    const {ordenId, productoId, cantidad} = req.body;

    let orden;
    try {
        orden = await Orden.findById(ordenId);
    } catch (error) {
        return next(
            new HttpError('No se encontró la orden', 500)
        );
    }

    let producto;
    try {
        producto = await Producto.findById(productoId);
    } catch (error) {
        return next(
            new HttpError('No se encontró el producto', 500)
        );
    }

    orden.productos.push({
        producto: productoId,
        cantidad: cantidad
    });

    try {
        await orden.save();
    } catch (error) {
        return next(
            new HttpError('No se pudo agregar el producto a la orden', 500)
        );
    }

    res.status(201).json({post: createdPost});
}


const getProductos = async(req, res, next) => {
    let productos;
    try {
        productos = await Producto.find();
    } catch (error) {
        return next(
            new HttpError('Error fetching productos', 500)
        );
    }
    return res.json({ productos });
}


module.exports = {
    agregarProductoOrden: agregarProductoOrden,
    crearProducto: crearProducto,
    getProductos: getProductos
}