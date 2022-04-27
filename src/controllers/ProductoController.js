const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Producto = require('../models/producto');
const Orden = require('../models/orden');


const crearProducto = async(req, res, next) => {
    const {nombreProducto, imagen, precio} = req.body;

    const createdProduct = new Producto({
        nombreProducto: nombreProducto,
        imagen: imagen,
        precio: precio
    })

    
    try {
        await createdProduct.save();
    } catch (error) {
        return next(
            new HttpError('Creating product failed!', 500)
        );
    }

    res.status(201).json({post: createdPost});
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

/* const getPostsByUserId = async (req, res, next) => {
    const userEmail = req.body.email;
    
    //deberia de haber validaciones de que existe correo, etc...
    let postsFound;
    try {
        postsFound = await Post.find({correo: req.body.email})
    } catch (error) {
        return next(
            new HttpError('Fetching posts failed!', 500)
        );
    }

    if(!postsFound){
        return next(
            new HttpError('Could not find posts for the provided email.', 404)
          );
    }

    res.status(200).json({
        posts: postsFound
    });
} */

module.exports = {
    agregarProductoOrden: agregarProductoOrden,
    crearProducto: crearProducto
}