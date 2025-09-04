const express = require('express');
const router = express.Router();

const { obtenerInscripcion,
        listarInscripciones,
        darAltaInscripcion,
        darBajaInscripcion,
        eliminarInscripcion,
        modificarInscripcion} = require('../controllers/inscripcionesController.js');
const validarInscripcion =  require('../middlewares/validarInscripcion.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);

router.get('/inscripciones', validarRol("prof"), listarInscripciones);
router.get('/inscripciones/:id', validarRol("prof"), obtenerInscripcion);

router.put('/inscripciones/:id', validarRol("prof"), validarInscripcion, modificarInscripcion);

router.patch('/inscripciones/:id/alta', validarRol("prof"), darAltaInscripcion);
router.patch('/inscripciones/:id/baja', validarRol("prof"), darBajaInscripcion);

router.delete('/inscripciones/:id', validarRol("prof"), eliminarInscripcion);

module.exports = router;