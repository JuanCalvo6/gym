const express = require('express');
const router = express.Router();

const { listarLineasDeRutinaRutina,
        obtenerLineaDeRutinaRutina,
        modificarLineaDeRutina,
        eliminarLineaDeRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);

router.get('/lineasDeRutina', validarRol("prof"), listarLineasDeRutinaRutina);
router.get('/lineasDeRutina/:id', validarRol("prof"), obtenerLineaDeRutinaRutina);

router.put('/lineasDeRutina/:id', validarRol("prof"), validarLineaDeRutina, modificarLineaDeRutina);

router.delete('/lineasDeRutina/:id', validarRol("prof"), eliminarLineaDeRutina);

module.exports =  router;