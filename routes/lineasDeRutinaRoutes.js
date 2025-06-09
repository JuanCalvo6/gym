const express = require('express');
const router = express.Router();

const { listarLineas,
        obtenerLinea,
        modificarLineaDeRutina,
        eliminarLineasDeRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
router.use(validarRol("prof"));

router.get('/lineasDeRutina', listarLineas);
router.get('/lineasDeRutina/:id', obtenerLinea);

router.put('/lineasDeRutina/:id',validarLineaDeRutina, modificarLineaDeRutina);

router.delete('/lineasDeRutina/:id', eliminarLineasDeRutina);

module.exports =  router;