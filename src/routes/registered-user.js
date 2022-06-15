const router = require('express').Router();
const ProductoController = require('../controllers/ProductoController');
const ReservacionController = require('../controllers/ReservacionController');

// agregar header para verificar token
// agregar rutas de acceso restringido
router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: "you are authorized!",
            user: req.user
        }
    })
})

router.post("/eliminarReservacion", ReservacionController.eliminarReservacion);
router.post("/eliminarProducto", ProductoController.eliminarProducto);

module.exports = router
