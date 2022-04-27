const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Reservacion = require('../models/reservacion');


const crearReservacion = async(req, res, next) => {
    console.log(req);
    const {fecha, nombreCliente, estado, numPersonas, numMesa} = req.body;

    const createdReservation = new Reservacion({
        fecha: fecha,
        nombreCliente: nombreCliente,
        estado: estado,
        numPersonas: numPersonas,
        numMesa: numMesa
    });

    //validar fecha y hora para evitar overlap de reservaciones y mesa
    // buscar si hay alguna reservacion a esa misma mesa en esa misma fecha y rango de hora
    try {
        await createdReservation.save();
    } catch (error) {
        console.log(error);
        return next(
            new HttpError('Error al crear reservación', 500)
        );
    }

    res.status(201).json({ reservacion: createdReservation});
}
/* 
const getPostComments = async(req, res, next) => {
    const postId = req.body.postId;

    let postWithComments;
    try {
        postWithComments = await Post.findById(postId).populate('comments');
    } catch (error) {
        return next(
            new HttpError('Error fetching post', 500)
        );
    }

    if(!postWithComments || postWithComments.comments.length === 0){
        return next(
            new HttpError('No comments or bad id', 404)
        );
    }
    res.status(200).json({
        comments: postWithComments.comments.map(comment =>
          comment.toObject({ getters: true })
        )
      });

} */

module.exports = {
    crearReservacion: crearReservacion,
    /* getPostComments: getPostComments */
}