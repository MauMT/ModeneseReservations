const {Router} = require('express');
const router = Router();
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const ObjectId = require('mongoose').Types.ObjectId; 
const { check } = require('express-validator');
const { render } = require('ejs');

const Horario = require('../models/horario');
const ReservacionController = require('../controllers/ReservacionController');
const ProductoController = require('../controllers/ProductoController');

router.get("/", function(req, res)
{
    res.render('home');
}
);

/* router.get("/home", function(req, res)
{
    res.send("homepage");
}
); */

router.post("/api/crearReservacion", ReservacionController.crearReservacion);

router.post("/api/actualizarEstadoReservacion", ReservacionController.actualizarEstadoReservacion);

// Ruta opcional para creación y/o modificación de horarios
router.post("/api/crearHorario",  async(req, res, next) => {

    const {diaSemana, horaInicio, horaCierre} = req.body;
    const nuevoHorario = new Horario({
        diaSemana: diaSemana,
        horaInicio: horaInicio,
        horaCierre: horaCierre
    });

    try {
        await nuevoHorario.save();
    } catch (error) {
        console.log(error);
        return next(
            new HttpError('Error al crear horario', 500)
        );
    }

    res.status(201).json({ horario: nuevoHorario});

});

router.post("/api/addProduct", ProductoController.agregarProductoOrden);

router.post("/api/crearProducto", ProductoController.crearProducto);

router.get("/api/getReservaciones", ReservacionController.getReservaciones);

router.get("/api/getProductos", ProductoController.getProductos);

module.exports = router; 