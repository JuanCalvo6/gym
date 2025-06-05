const express = require('express');
const router = express.Router();

const { obtenerInscripcion,
        listarInscripciones,
        darAltaInscripcion,
        darBajaInscripcion,
        eliminarInscripcion,
        modificarInscripcion} = require('../controllers/inscripcionesController.js');
const validarInscripcion =  require('../middlewares/validarInscripcion.js');

router.get('/inscripciones', listarInscripciones);
router.get('/inscripciones/:id', obtenerInscripcion);

router.put('/inscripciones/:id',validarInscripcion, modificarInscripcion);

router.patch('/inscripciones/:id/alta', darAltaInscripcion);
router.patch('/inscripciones/:id/baja', darBajaInscripcion);

router.delete('/inscripciones/:id', eliminarInscripcion);

module.exports = router;