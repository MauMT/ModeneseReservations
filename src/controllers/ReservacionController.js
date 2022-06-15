const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Reservacion = require('../models/reservacion');
const moment = require('moment')

const crearReservacion = async(req, res, next) => {
    console.log("mauuuu",req);
    const {fecha, horarioDefinido, nombreCliente, estado, numPersonas, numMesa} = req.body;

    const createdReservation = new Reservacion({
        fecha: fecha,
        horarioDefinido: horarioDefinido,
        nombreCliente: nombreCliente,
        estado: estado,
        numPersonas: numPersonas,
        numMesa: numMesa
    });
    console.log('Q')

    // valida fecha y hora para evitar overlap de reservaciones y mesa
    // busca si hay alguna reservacion a esa misma mesa en esa misma fecha y rango de hora
    let existingReservation;
    try{
        existingReservation = await Reservacion.findOne({fecha: fecha, numMesa: numMesa, horarioDefinido: horarioDefinido});
    }catch(error){
        console.log("Error en la busqueda de reservaciones", error);
        return next(
            new HttpError('Error en la búsqueda de reservaciones', 500)
        );
    }

    if(existingReservation){
        console.log("Ya existe una reservacion en esa misma fecha y hora");
        return next(
            new HttpError('Ya existe reservación a esa mesa en esa hora', 422)
        );
    }

    // Funcion para no permitir reservaciones en fecha anterior a la actual
    var today = new Date().toISOString().split('T')[0]
    console.log('Fecha Today: ', today);
     
    if(fecha < today){
        console.log("No se puede reservar en fechas anteriores a la actual");
        return next(
            new HttpError('No se puede reservar en fechas anteriores a la actual', 422)
        );
    }

    try {
        await createdReservation.save();
    } catch (error) {
        console.log("Error al guardar la reservación", error);
        return next(
            new HttpError('Error al crear reservación', 500)
        );
    }

    res.status(200).json({ reservacion: createdReservation});
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

const actualizarEstadoReservacion = async(req, res, next) => {
    //es posible hacer esto usando la fecha, hora y mesa
    const reservacionId = req.body.reservacionId;
    const nuevoEstado = req.body.estado;
    
    const reservacion = await Reservacion.findById(reservacionId);
    

    //update reservacion state
    reservacion.estado = nuevoEstado;
    try{
        await reservacion.save();
    }
    catch(error){
        return next(
            new HttpError('No se pudo actualizar el estado de la reservación', 500)
        );
    }
    res.status(200).json({ reservacion: reservacion});
}

const getReservaciones = async(req, res, next) => {
    let reservaciones;
    try {
        reservaciones = await Reservacion.find().sort({fecha : -1, horarioDefinido: -1});
    } catch (error) {
        return next(
            new HttpError('Error fetching reservaciones', 500)
        );
    }
    return res.json({ reservaciones });
}

const eliminarReservacion = async(req, res, next) => {
    const reservacionId = req.body.reservacionId;
    try{
        await Reservacion.findByIdAndRemove(reservacionId);
    }
    catch(error){
        return next(
            new HttpError('No se pudo eliminar la reservación', 500)
        );
    }
    res.status(200).json({ message: 'Reservación eliminada'});
}

const getReservacionesActuales = async(req, res, next) => {
    const today = moment().startOf('day') 
    let reservaciones;
    try {
        reservaciones = await Reservacion.find({fecha: {$gte: today.toDate()}}).sort({fecha : -1, horarioDefinido: -1});
    }catch (error) {
        return next(
            new HttpError('Error fetching reservaciones', 500)
        );
    }
    return res.json({ reservaciones });
}


module.exports = {
    crearReservacion: crearReservacion,
    actualizarEstadoReservacion: actualizarEstadoReservacion,
    getReservaciones: getReservaciones,
    eliminarReservacion: eliminarReservacion,
    getReservacionesActuales: getReservacionesActuales
    
}